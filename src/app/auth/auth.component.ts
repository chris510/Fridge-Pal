import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  isLoginMode = false;
  signUpSubscription: Subscription;

  constructor(
    private AuthService: AuthService
  ) { }

  ngOnInit(): void {

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    console.log(this.isLoginMode);
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    form.reset();
  }

}
