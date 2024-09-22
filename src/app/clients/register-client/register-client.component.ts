import { Component, EventEmitter, Output } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { ApiService } from '../../dashboard/api.service';

@Component({
  selector: 'app-register-client',
  standalone: true,
  imports: [
      ReactiveFormsModule,
      RouterLink
  ],

  providers: [ApiService],
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.css'
})
export class RegisterClientComponent {

  @Output() clientRegistered = new EventEmitter();

  constructor(private apiService: ApiService) {}

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    plusScore: new FormControl(''),
  });


  registerClient() {
    this.apiService.registerClient(this.registrationForm.value).subscribe(
      (res: any) => {
        this.clientRegistered.emit(res);
      }
    );
  }
}
