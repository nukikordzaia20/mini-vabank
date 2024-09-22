import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../dashboard/api.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  providers: [
    ApiService
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  @Input() clientKey: any;
  @Output() AccountFinishedAdd = new EventEmitter<any>();

  constructor(private api: ApiService) {}

  accountForm = new FormGroup({
    name: new FormControl(''),
    balance: new FormControl(0),
  });


  createForm() {
    this.api.createAccount(this.clientKey, this.accountForm.value).subscribe( (res: any) => {
      this.AccountFinishedAdd.emit(res);
    })
  }

}
