import { Component, OnInit } from '@angular/core';
import {UserService} from '../../provider/provider-user/user.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError = false;
  constructor(private userService: UserService, private router: Router ) { }

  ngOnInit() {
  }

  OnSubmit(username, password) {
    this.userService
      .userAuthentication(username, password)
      .subscribe((res) => {
        console.log(res);
        localStorage.setItem('userToken',  res.headers.get('X-Auth-Token'));
        this.router.navigate(['/home']);
      },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      });
  }

}
