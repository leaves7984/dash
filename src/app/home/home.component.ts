import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../provider/provider-user/user.service';
// import {HttpErrorResponse} from "@angular/common/http";
// import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isShow: Boolean;
  constructor(private router: Router,
              private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getAdminClaims().subscribe((data: any) => {
      console.log(data);
      this.isShow = true;
    }, (err) => {
      console.log(err);
      if (err.error.status === 403) {
        console.log('Unauthorized user');
        this.isShow = false;
      }
    });
  }


  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/auth/signin']);
  }
}
