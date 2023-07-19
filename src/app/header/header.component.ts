import { Component } from '@angular/core';
import { RecipeService } from '../recipes/recipe-service.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dsService: DataStorageService) { }

  onSave() {
    this.dsService.storeData();
  }

  onFetch() {
    this.dsService.fetchData()
  }
}
