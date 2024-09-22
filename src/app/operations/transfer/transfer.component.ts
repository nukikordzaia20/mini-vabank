import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../dashboard/api.service';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ApiService],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent {
  @Input() clientKey: any;
  @Input() accounts: any[] = [];
  @Output() TransferFinished = new EventEmitter<any>();

  constructor(private api: ApiService) {}

  transferForm = new FormGroup({
    sourceAccount: new FormControl(''),
    targetAccount: new FormControl(''),
    amount: new FormControl(0),
  });

  transfer(){

    this.api.transfer(this.clientKey, this.transferForm.value).subscribe( (res: any) => {
      this.TransferFinished.emit(res);
    })
  }

}
