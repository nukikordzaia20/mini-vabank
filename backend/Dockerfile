from python:3.12-slim

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "-m" , "flask", "--app", "vabank", "run", "--debug", "--host=0.0.0.0"]
