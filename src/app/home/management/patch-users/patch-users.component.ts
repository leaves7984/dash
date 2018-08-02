import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../provider/provider-user/user.service';
import {User} from '../../../provider/provider-user/user.model';
import {NgForm} from '@angular/forms';
import {FilterPipe} from '../../filter.pipe';

@Component({
  selector: 'app-patch-users',
  templateUrl: './patch-users.component.html',
  styleUrls: ['./patch-users.component.css']
})
export class PatchUsersComponent implements OnInit {

  fileToUpload: File = null;
  users: Object;
  @ViewChild('myFile')
  myInputVariable: any;
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

  constructor(private userService: UserService) {
      this.setNum = 10;
      this.page = 0;
      this.searchText = '';
  }

  ngOnInit() {
    this.fetchData();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  reset() {
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = '';
    console.log(this.myInputVariable.nativeElement.files);
  }
  onSubmit(form: NgForm) {
    if (form.value.password !== form.value.repeatpwd) {
      this.valid = false;
    } else {
        this.userService.uploadOne(form.value.username, form.value.password).subscribe(data => {
            alert('Registered!');
            form.onReset();
            this.fetchData();
        }, err => {
            console.log(err);
            alert('please input valid username and password');
            form.onReset();
        });
    }
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
  fetchData() {
    this.userService.getUsers('user').subscribe(data => {
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
    }, error => {});
  }

  getUsername(item) {
      console.log(item);
      this.currentUser = item.username;
  }
  enableUser(item) {
      this.userService.enableUser(item.username, !item.enabled).subscribe(data => {
          item.enabled = !item.enabled;
      }, err => {
          console.log(err);
      });
  }

  uploadFile() {
    this.userService.postFile(this.fileToUpload).subscribe(data => {
      this.fileToUpload = null;
      this.reset();
      this.fetchData();
    }, err => {
      console.log(err);
      if (err.error.status === 403) {
        console.log('Unauthorized user');
      }
    });
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
        this.pmax = Math.ceil(this.len / this.setNum);
        for(let i = this.page; i < this.pmax && i < 5; i++) {
            this.pages.push(i);
        }
        // this.pages = new Array(this.pmax);
        if ( this.len < this.setNum) {
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
        this.index1 = i * this.setNum + 1;
        this.index2 = (i + 1) * this.setNum;
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
