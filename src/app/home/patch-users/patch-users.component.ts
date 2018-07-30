import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../provider/provider-user/user.service';
import {User} from '../../provider/provider-user/user.model';
import {NgForm} from '@angular/forms';
import {FilterPipe} from '../filter.pipe';

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
  pages: Array<Number>;
  page: Number = 0;
  setNum: number;
  len: number;
  index1: number;
  index2: number;
  userRep = [];
  searchText: string;
  filter: FilterPipe = new FilterPipe();

  constructor(private userService: UserService) {
      this.setNum = 10;
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
    console.log(form.value);
    if (form.value.password !== form.value.repeatpwd) {
      this.valid = false;
    } else {
        this.userService.uploadOne(form.value.username, form.value.password).subscribe(data => {
            console.log(data);
            form.onReset();
            this.fetchData();
        }, err => {
            console.log(err);
            alert('please input valid username and password');
            form.onReset();
        });
    }
  }
  fetchData() {
    this.userService.getUsers().subscribe(data => {
        Array.prototype.push.apply(this.userRep, data);
        this.userRep.sort();
        this._initPage(this.userRep);
    }, error => {});
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
        this.pages = new Array(Math.ceil(this.len / this.setNum));
        if ( this.len < this.setNum) {
            this.users = data;
        } else {
            this.users = data.slice(0, this.setNum);
        }
    }
    setPage(i) {
        this.page = i;
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
