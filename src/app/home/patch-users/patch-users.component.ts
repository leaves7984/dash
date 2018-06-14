import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../provider/provider-user/user.service';

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

  constructor(private userService: UserService) { }

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

  fetchData() {
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.users = data;
    }, error => {});
  }

  uploadFile() {
    this.userService.postFile(this.fileToUpload).subscribe(data => {
      console.log(data);
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
}
