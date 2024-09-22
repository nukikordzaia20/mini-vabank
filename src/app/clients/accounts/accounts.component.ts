import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'client-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  @Input() accounts: any[] = [];
  @Input() owner: any;
  @Output() onAccountAdd = new EventEmitter<any>();

  addAccount() {
    this.onAccountAdd.emit(true);
  }


}
