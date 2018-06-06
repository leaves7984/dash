import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../provider/provider-user/user.service';
import {Log} from '../../../provider/provider-user/user.model';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.css']
})
export class UserLogComponent implements OnInit {

    loggers: Log[];
    userId: String;
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
        this.userService.getLog(this.userId).subscribe(data => {
            console.log(data);
            this.loggers = data;
        }, error => {});
    }
}
