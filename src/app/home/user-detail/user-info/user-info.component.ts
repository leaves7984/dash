import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../provider/provider-user/user.service';
import {ActivatedRoute} from '@angular/router';
import {Info} from '../../../provider/provider-user/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  info: Info;
  userId: String;
  usages = [];
  constructor(private route: ActivatedRoute,
              private userService: UserService) {
      this.route.params.subscribe(res => {
          console.log(res.userId + ' Detail');
          this.userId = res.userId;
      });
  }

  ngOnInit() {
      this.fetchData();
  }
  fetchData() {
      this.userService.getUserInfo(this.userId).subscribe(data => {
          console.log(data);
          this.info = data;
          // this.usages = data.wheelchairUsage;
          if (data.wheelchairUsage != null) {
              this.usages = JSON.parse(JSON.parse(data.wheelchairUsage.toString()));
          }
      }, error => {});
  }
}
