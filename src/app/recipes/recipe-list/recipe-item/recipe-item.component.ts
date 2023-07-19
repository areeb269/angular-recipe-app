import { Component, Input, OnInit } from '@angular/core';
import { Recipes } from '../../recipes.model';
import { RecipeService } from '../../recipe-service.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipes;
  @Input() index!: number;

  constructor() { }

  ngOnInit() { }
}
