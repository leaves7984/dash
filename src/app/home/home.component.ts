import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../provider/provider-user/user.service';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  admin: any;
  fileToUpload: File = null;

  constructor(private router: Router,
              private userService: UserService) {

  }

  ngOnInit() {
   this.userService.getUserClaims().subscribe((data: any) => {
     this.user = data;
     console.log(data);
   });
    // this.userService.getAdminClaims().subscribe((data: any) => {
    //   this.admin = data;
    //   console.log(data);
    // }, (err: HttpErrorResponse) => {
    // });
  }


  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
