import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  
  constructor(private RecipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onSelected() {
    this.RecipeService.recipeSelected.emit(this.recipe);
  }

}
