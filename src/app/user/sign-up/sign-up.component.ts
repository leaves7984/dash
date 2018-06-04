import { Component, OnInit } from '@angular/core';
import { User} from '../../provider/provider-user/user.model';
import { NgForm} from '@angular/forms';
import { UserService} from '../../provider/provider-user/user.service';
import {Router} from '@angular/router';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  show: Boolean;
  user: User;
  constructor(private userService: UserService, private router: Router) {
    this.resetForm();
    this.show = false;
  }

  ngOnInit() {
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      username: '',
      password: ''
    };
  }

  OnSubmit(form: NgForm) {
    this.userService
      .registerUser(form.value)
      .subscribe((data: any) => {
        if (data.Auth === 'true') {
          this.resetForm(form);
          this.router.navigateByUrl('/login');
        } else {
          this.show = true;
        }
      });
  }

}
