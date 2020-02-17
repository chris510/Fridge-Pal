import { 
  Component, 
  OnInit, 
  ComponentFactoryResolver, 
  ViewChild, OnDestroy 
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = false;
  isLoading = false;
  error: string = '';
  private closeAlertSub: Subscription;
  @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if (!form.valid) return;

    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.AuthService.login(email, password)
    } else {
      authObs = this.AuthService.signup(email, password)
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        // this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    )

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    // if (this.closeAlertSub) this.closeAlertSub.unsubscribe();

    this.closeAlertSub ? this.closeAlertSub.unsubscribe : null;

    // if (this.closeAlertSub) {
    //   this.closeAlertSub.unsubscribe();
    // }
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent(); // valid type script but not valid angular class
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeAlertSub = componentRef.instance.close.subscribe(() => {
      this.closeAlertSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}
