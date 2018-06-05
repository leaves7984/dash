import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../provider/provider-user/user.service';
import {Repair, Tracking} from '../../../provider/provider-user/user.model';

@Component({
  selector: 'app-user-tracking',
  templateUrl: './user-tracking.component.html',
  styleUrls: ['./user-tracking.component.css']
})
export class UserTrackingComponent implements OnInit {

  trackingId: String;
  repair: Repair;
  trackings: Tracking[];
  constructor(private route: ActivatedRoute,
              private userService: UserService) {
      this.route.params.subscribe(res => {
          console.log(res.id + ' Tracking ID');
          this.trackingId = res.id;
      });
  }

  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
      this.userService.getRepairById(this.trackingId).subscribe(data => {
          console.log(data);
          this.repair = data;
      }, error => {});
      this.userService.getTracking(this.trackingId).subscribe(data => {
          console.log(data);
          this.trackings = data;
      }, error => {});
  }
}
