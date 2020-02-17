# Fridge-Pal

[Live Demo](https://fridge-recipe-782a6.firebaseapp.com/)

Fridge-Pal was built using the Angular framework and firebase for data storage and deployment. This application allows user to store recipe data as well as items for a shopping list for their grocery needs.

## Technologies

- Frontend: Angular
- Backend & Deployment: Firebase

## Features

- Users are able to create recipes create and delete a recipe. As well as edit the contents of existing recipes.
- Users are able to add, edit, and delete items in a shopping list.
- User authentication, able to sign up and must login in order to access the application contents

### Recipes

State management is used in services to allow users to read and write recipes to a backend databases. Angular observables are then used as subscriptions for the application to listen for any changes being made on the recipe data to be changed throughout the whole application.

```javascript
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()
  private recipes: Recipe[] = [];
  constructor(private shoppingList: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(idx: number) {
    return this.recipes[idx];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingList.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())
  }
}
```

### Lazy Loading

Application uses built-in Angular methods to not only lazy load routes, but preloads them as soon as the first page is opened in order to provide a super smooth user experience. This method could use to expand on other future features in the application as it grows.

```javascript
 const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { 
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  },
  { 
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, 
    {
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
```

### Module-Feature Separation

Every module and routing is separated by features to insure better maintainability for application scaling and increased complexity.

```javascript
@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailsComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule
  ],
})
export class RecipesModule {}
````
