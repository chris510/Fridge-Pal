import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipesSubscription: Subscription;
  recipes: Recipe[] = [];

  constructor(
    private RecipeService: RecipeService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipesSubscription = this.RecipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
      }
    );
    this.recipes = this.RecipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route })
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }

}
