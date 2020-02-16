import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { RecipeService } from '../services/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  userSubscription: Subscription;
  isAuthenticated = false;
  user: User;

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
        // this.isAuthenticated = !user ? false : true;
        this.user = user;
        console.log(!user);
        console.log(!!user);
      }
    );
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
