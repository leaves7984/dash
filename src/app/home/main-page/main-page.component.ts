import { Component, OnInit } from '@angular/core';
import { UserService} from '../../provider/provider-user/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  users: Object;
  constructor(private userService: UserService) { }

  ngOnInit() {
      this.fetchData();
  }

  fetchData() {
      this.userService.getUsers().subscribe(data => {
          console.log(data);
          this.users = data;
      }, error => {});
  }
}
