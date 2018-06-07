import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../provider/provider-user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  userId: String;
  state: String;
  constructor(private route: ActivatedRoute) {
      this.route.queryParams.subscribe(res => {
          console.log(res);
          this.state = res.state;
          this.userId = res.userId;
      });
  }

  ngOnInit() {
  }


}
