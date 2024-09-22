import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "../dashboard/api.service";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [ApiService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent{
  searchForm: FormGroup = new FormGroup({
    name: new FormControl(null),
    lastName: new FormControl(null),
    clientKey: new FormControl(null),
  });

  @Output() onClientSearch = new EventEmitter<any>();

  constructor(private apiService: ApiService) {}

  onSubmit(): void {
    this.apiService.getClients(this.searchForm.value).subscribe((res: any) => {
       this.onClientSearch.emit(res);
    });
  }
}
