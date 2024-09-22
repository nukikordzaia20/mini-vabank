import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountsComponent } from '../accounts/accounts.component';
import { OperationsComponent } from '../../operations/operations.component';
import { CreateAccountComponent } from '../accounts/create-account/create-account.component';
import { TransferComponent } from '../../operations/transfer/transfer.component';


type TabMode = "main" | "accounts" | "operations" | "addAccount" | "transfer";

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [
    CommonModule,
    AccountsComponent,
    OperationsComponent,
    CreateAccountComponent,
    TransferComponent,

  ],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent {

  @Input() client: any;
  @Output() onExitDetail = new EventEmitter<any>();
  @Output() activateDetailSub = new EventEmitter<any>();

  tabMode: TabMode = "main";

  handleNewAccount(account: any){
    if (!this.client.accounts) {
      this.client.accounts = [];
    }

    this.client.accounts.push(account);
    this.tabMode = "accounts";
  }
  handleTransfer(data: any){
    console.log(data);
    this.client.accounts = data.accounts;
    this.tabMode = "accounts";

  }


  exitDetail() {
    this.onExitDetail.emit();
  }

  setTabMode(mode: TabMode){
    this.tabMode = mode;
  }

}
