import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  loadedChoice = 'recipe';

  onNavigate(navChoice: string) {
    this.loadedChoice = navChoice;
  }
}
