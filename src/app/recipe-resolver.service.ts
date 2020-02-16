import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipes/recipe.model';
import { DataStorageService } from './services/data-storage.service';
import { RecipeService } from './services/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();
    if (!recipes.length) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
    //not subscribing here because resolvers subscribes for you
  }
}