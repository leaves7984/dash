import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Repair, Vendor} from '../../../provider/provider-user/user.model';
import {UserService} from '../../../provider/provider-user/user.service';

@Component({
  selector: 'app-user-repair',
  templateUrl: './user-repair.component.html',
  styleUrls: ['./user-repair.component.css']
})
export class UserRepairComponent implements OnInit {

    repairs: Repair[];
    userId: String;
    createdAt: Date;
    modifiedAt: Date;
    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private router: Router) {
        this.route.queryParams.subscribe(res => {
            console.log(res.userId + ' Detail');
            this.userId = res.userId;
        });
    }

    ngOnInit() {
        this.fetchData();
    }
    fetchData() {
        this.userService.getRepair(this.userId).subscribe(data => {
            console.log(data);
            this.repairs = data;
            for (let i = 0; i < data.length ; i++ ) {
                this.userService.getTracking(this.repairs[i].id).subscribe(data => {
                    this.repairs[i].hasTracking = true;
                }, error => {
                    console.log(true);
                    this.repairs[i].hasTracking = false;
                });
            }
        }, error => {});
    }
}
