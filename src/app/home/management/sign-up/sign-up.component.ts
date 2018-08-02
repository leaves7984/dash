import { Component, OnInit } from '@angular/core';
import { User} from '../../../provider/provider-user/user.model';
import { NgForm} from '@angular/forms';
import { UserService} from '../../../provider/provider-user/user.service';
import {Router} from '@angular/router';
import {FilterPipe} from '../../filter.pipe';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    show: Boolean;
    user: User;
    users: Object;
    valid: Boolean = true;
    page: number;
    pmax: number;
    setNum: number;
    len: number;
    index1: number;
    index2: number;
    userRep = [];
    pages = [];
    searchText: string;
    currentUser: string;
    filter: FilterPipe = new FilterPipe();

  constructor(private userService: UserService, private router: Router) {
    this.resetForm();
    this.show = false;
    this.setNum = 10;
    this.page = 0;
    this.searchText = '';
  }

  ngOnInit() {
      this.fetchData();
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
      this.userService.registerUser(form.value).subscribe(data => {
          form.onReset();
          this.fetchData();
          alert('Registered!');
      }, err => {
          console.log(err);
          alert('please input valid username and password');
          form.onReset();
      });
  }

    changePassword(form: NgForm, username) {
        console.log(form);
        if (form.value.password !== form.value.repeatpwd) {
            this.valid = false;
        } else {
            this.userService.changePassword(username, form.value.password).subscribe(data => {
                form.onReset();
            }, err => {
                console.log(err);
                alert('please input valid username and password');
                form.onReset();
            });
        }
    }

    enableUser(item) {
        this.userService.enableUser(item.username, !item.enabled).subscribe(data => {
            item.enabled = !item.enabled;
        }, err => {
            console.log(err);
        });
    }

    fetchData() {
        this.userService.getUsers('clinic').subscribe(data => {
            this.userRep = [];
            const tmp = [];
            Array.prototype.push.apply(tmp, data);
            tmp.forEach(e => {
                const body = {
                    username: e[0],
                    enabled: e[1]
                };
                this.userRep.push(body);
            });
            this.userRep.sort();
            this._initPage(this.userRep);
        }, error => {
        });
    }

    getUsername(item) {
        console.log(item);
        this.currentUser = item.username;
    }

    numChange(value) {
        this.setNum = value;
        this._initPage(this.userRep);
    }

    _initPage(data) {
        const keys = Object.keys(data);
        this.len = keys.length;
        this.index1 = 1;
        if (this.len < this.setNum) {
            this.index2 = this.len;
        } else {
            this.index2 = this.setNum;
        }
        // console.log(Math.ceil(this.len / this.setNum));
        // this.pages = new Array(Math.ceil(this.len / this.setNum));
        this.pmax = Math.ceil(this.len / this.setNum);
        for (let i = this.page; i < this.pmax && i < 5; i++) {
            this.pages.push(i);
        }
        if (this.len < this.setNum) {
            this.users = data;
        } else {
            this.users = data.slice(0, this.setNum);
        }
    }

    previous() {
        if (this.page > 0)
            this.setPage(this.page - 1);
    }

    next() {
        if (this.page < this.pmax - 1)
            this.setPage(this.page + 1);
    }

    isActive(page) {
        return this.page === page;
    }
    setPage(i) {
        this.page = i;
        this.index1 = i * this.setNum + 1;
        this.index2 = (i + 1) * this.setNum;
        this.pages = [];
        const distance = this.pmax - this.page - 5;
        let j;
        if (distance < 0) {
            for (j = this.page + distance; j < this.pmax; j++) {
                this.pages.push(j);
            }
        } else if (distance > 0) {
            for (j = this.page; j < this.page + 5; j++) {
                this.pages.push(j);
            }
        } else {
            for (j = this.page; j < this.pmax; j++) {
                this.pages.push(j);
            }
        }
        if (this.index2 > this.len) {
            this.index2 = this.len;
        }
        const setNum = this.setNum;
        this.users = this.userRep.slice(i * setNum, i * setNum + setNum);
    }

    search() {
        this._initPage(this.filter.transform(this.userRep, this.searchText));
    }

}
