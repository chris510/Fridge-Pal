import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Recipe } from './recipes/recipe.model';
import { DataStorageService } from './services/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(
    private dataStorageService: DataStorageService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    
  }
}
