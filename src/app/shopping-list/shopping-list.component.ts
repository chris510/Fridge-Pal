import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';
// import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private igChangeSub: Subscription

  constructor(
    private shoppingList: ShoppingListService,
    // private loggingService: LoggingService
    ) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingList.getIngredients();
    this.igChangeSub = this.shoppingList.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
    // this.loggingService.printLog('Hello from ShoppingListComponent ngOnit')
  }

  onEditItem(index: number) {
    this.shoppingList.startingEditing.next(index);
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }
}
