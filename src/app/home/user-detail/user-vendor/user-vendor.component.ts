import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../provider/provider-user/user.service';
import {Vendor} from '../../../provider/provider-user/user.model';

@Component({
  selector: 'app-user-vendor',
  templateUrl: './user-vendor.component.html',
  styleUrls: ['./user-vendor.component.css']
})
export class UserVendorComponent implements OnInit {

    vendors: Vendor[];
    vendor: Vendor;
    userId: String;
    isClick: Boolean;
    createdAt: Date;
    modifiedAt: Date;
    constructor(private route: ActivatedRoute,
                private userService: UserService) {
        this.route.params.subscribe(res => {
            console.log(res.userId + ' Detail');
            this.userId = res.userId;
            this.isClick = false;
            this.createdAt = null;
            this.modifiedAt = null;
        });
    }

    ngOnInit() {
        this.fetchData();
    }
    fetchData() {
        this.userService.getVendor(this.userId).subscribe(data => {
            console.log(data);
            this.vendors = data;
        }, error => {});
    }
    isShow(item) {
        this.createdAt = new Date(parseInt(item.createdAt.toString(), 10));
        this.modifiedAt = new Date(parseInt(item.modifiedAt.toString(), 10));
        this.isClick = true;
        this.vendor = item;
    }


}
