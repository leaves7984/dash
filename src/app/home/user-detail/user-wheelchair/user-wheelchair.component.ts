import { Component, OnInit } from '@angular/core';
import {Info, Wheelchair} from '../../../provider/provider-user/user.model';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../provider/provider-user/user.service';

@Component({
  selector: 'app-user-wheelchair',
  templateUrl: './user-wheelchair.component.html',
  styleUrls: ['./user-wheelchair.component.css']
})
export class UserWheelchairComponent implements OnInit {

    wheelchairs: Wheelchair[];
    wheelchair: Wheelchair;
    userId: String;
    isShow: Boolean;
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
        this.userService.getWheelchair(this.userId).subscribe(data => {
            console.log(data);
            this.wheelchairs = data;
            this.isShow = false;
        }, error => {
            this.isShow = true;
        });
    }

}
