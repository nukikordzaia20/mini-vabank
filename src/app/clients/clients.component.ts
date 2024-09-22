import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {

  @Input() clients: any[] = [];
  @Output() onClientDetail = new EventEmitter<any>();
  @Output() onClientAdd = new EventEmitter<any>();

  goToClientDetail(client: any) {
    this.onClientDetail.emit(client);
  }

  addClient() {
    this.onClientAdd.emit();
  }

}
