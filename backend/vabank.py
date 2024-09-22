import os
import binascii
import json
import functools
from flask import Flask, request, jsonify
from flask_cors import cross_origin

app = Flask(__name__)

USER_DB = [{"username": "test", "password": "1", "name": "Jhon Doe"}]

CLIENT_DB = [
    {
        "name": "Jhon",
        "lastName": "Carmak",
        "clientKey": 1,
        "plusScore": 1000,
        "amount": 15000,
        "accounts": [
            {
                "name": "Student Card",
                "accountNumber": "GE123BG10005000",
                "balance": 5000,
            }
        ],
        "operations": [],
    },
    {
        "name": "Albert",
        "lastName": "Einstein",
        "clientKey": 2,
        "plusScore": 1000,
        "amount": 15000,
        "accounts": [
            {
                "name": "Student Card",
                "accountNumber": "GE123BG10005000",
                "balance": 5000,
            }
        ],
        "operations": [],
    },
    {
        "name": "Werner",
        "lastName": "Heisenber",
        "clientKey": 3,
        "plusScore": 1000,
        "amount": 15000,
        "accounts": [
            {
                "name": "Student Card",
                "accountNumber": "GE123BG10005000",
                "balance": 5000,
            }
        ],
        "operations": [],
    },
    {
        "name": "Michael",
        "lastName": "Scofield",
        "clientKey": 4,
        "plusScore": 1000,
        "amount": 15000,
        "accounts": [
            {
                "name": "Student Card",
                "accountNumber": "GE123BG10005000",
                "balance": 5000,
            }
        ],
        "operations": [],
    },
    {
        "name": "Kurt",
        "lastName": "Gödel",
        "clientKey": 5,
        "plusScore": 1000,
        "amount": 15000,
        "accounts": [
            {
                "name": "Student Card",
                "accountNumber": "GE123BG10005000",
                "balance": 5000,
            }
        ],
        "operations": [],
    },
]

Client_Key_Sequence = len(CLIENT_DB)

USER_SESSION = {}


def auth_required(f):
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")
        idx = USER_SESSION.get(token, None)
        if idx is None:
            return jsonify({"error": "Invalid token"}), 400

        return f(*args, **kwargs)

    return wrapper


@app.route("/api/register", methods=["POST", "OPTIONS"])
@cross_origin()
def register():
    data = json.loads(request.data)
    name = data["name"]
    username = data["username"]
    password = data["password"]
    password_repeated = data["repeatPassword"]

    if password != password_repeated:
        return jsonify({"error": "Passwords do not match"}), 400

    USER_DB.append({"name": name, "username": username, "password": password})

    return jsonify({"message": "User registered successfully"}), 201


@app.route("/api/login", methods=["POST", "OPTIONS"])
@cross_origin()
def login():
    if request.method == "POST":
        data = json.loads(request.data)
        username = data["username"]
        password = data["password"]

        for idx, user in enumerate(USER_DB, 0):
            if user["username"] == username and user["password"] == password:
                token = binascii.hexlify(os.urandom(24) + str(idx).encode()).decode()
                USER_SESSION[token] = idx
                return (
                    jsonify({"message": "User logged in successfully", "token": token}),
                    200,
                )

        return jsonify({"error": "Invalid credentials"}), 400

    return "", 204


@app.route("/api/user", methods=["GET", "OPTIONS"])
@cross_origin()
def get_user():
    token = request.headers.get("Authorization")

    idx = USER_SESSION.get(token, None)
    if idx is None:
        return jsonify({"error": "Invalid token"}), 400

    user = USER_DB[idx]
    return jsonify({"name": user["name"], "username": user["username"]}), 200


@app.route("/api/is_authenticated", methods=["POST", "OPTIONS"])
@cross_origin()
def is_authenticated():
    token = request.headers.get("Authorization")
    idx = USER_SESSION.get(token, None)
    if idx is None:
        return b"false", 400

    return b"true", 200


@app.route("/api/logout", methods=["POST", "OPTIONS"])
@cross_origin()
def logout():
    token = request.headers.get("Authorization")
    USER_SESSION.pop(token, None)
    return jsonify({"message": "User logged out successfully"}), 200


@app.route("/api/clients", methods=["GET", "POST", "OPTIONS"])
@cross_origin()
@auth_required
def clients():
    if request.method == "GET":
        query_params = request.args
        name = query_params.get("name", None)
        last_name = query_params.get("lastName", None)
        client_key = query_params.get("clientKey", None)

        # Filter clients by name, surname and pk if provided
        clients = CLIENT_DB

        if name is not None:
            clients = [
                client for client in clients if name.upper() in client["name"].upper()
            ]

        if last_name is not None:
            clients = [
                client
                for client in clients
                if last_name.upper() in client["lastName"].upper()
            ]

        if client_key is not None:
            clients = [
                client for client in clients if client["clientKey"] == int(client_key)
            ]

        return jsonify({"clients": clients}), 200

    if request.method == "POST":
        data = json.loads(request.data)
        name = data["name"]
        last_name = data["lastName"]
        plus_score = data.get("plusScore", None)

        if plus_score.isdigit():
            plus_score = int(plus_score)

        global Client_Key_Sequence
        Client_Key_Sequence += 1

        CLIENT_DB.append(
            {
                "name": name,
                "lastName": last_name,
                "clientKey": Client_Key_Sequence,
                "plusScore": plus_score,
            }
        )

        return jsonify({"message": "Client added successfully"}), 201

    return "", 204


@app.route("/api/accounts", methods=["POST", "OPTIONS"])
@cross_origin()
@auth_required
def accounts():
    if request.method == "POST":
        data = json.loads(request.data)
        client_key = data["clientKey"]
        account_name = data["name"]
        balance = data["balance"]

        for client in CLIENT_DB:
            if client["clientKey"] == client_key:
                client["accounts"].append(
                    {
                        "name": account_name,
                        "balance": balance,
                    }
                )
                return jsonify({"name": account_name, "balance": balance}), 201

        return jsonify({"error": "Client not found"}), 400

    return "", 204


@app.route("/api/transfer", methods=["POST", "OPTIONS"])
@cross_origin()
@auth_required
def transfer():
    if request.method == "POST":
        data = json.loads(request.data)
        client_key = data["clientKey"]
        source_account = data["sourceAccount"]
        target_account = data["targetAccount"]

        if source_account == target_account:
            return jsonify({"error": "Source and target accounts are the same"}), 400

        amount = data["amount"]

        for client in CLIENT_DB:
            if client["clientKey"] == client_key:
                for account in client["accounts"]:
                    if account["name"] == source_account:
                        if account["balance"] < amount:
                            return jsonify({"error": "Insufficient funds"}), 400

                        account["balance"] -= amount
                        break

                for account in client["accounts"]:
                    if account["name"] == target_account:
                        account["balance"] += amount
                        break

                client["operations"].append(
                    {
                        "sourceAccount": source_account,
                        "targetAccount": target_account,
                        "amount": amount,
                    }
                )

                return jsonify({"accounts": client["accounts"]}), 201

        return jsonify({"error": "Client not found"}), 400

    return "", 204
