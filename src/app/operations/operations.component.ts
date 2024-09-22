import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.css'
})
export class OperationsComponent {
  @Output() onTransfer = new EventEmitter<any>();

  handleTransfer() {
    this.onTransfer.emit(true);
  }

}
