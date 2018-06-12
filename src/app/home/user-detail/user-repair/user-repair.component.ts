import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Repair, Vendor} from '../../../provider/provider-user/user.model';
import {UserService} from '../../../provider/provider-user/user.service';
import * as alasql from "alasql";

@Component({
  selector: 'app-user-repair',
  templateUrl: './user-repair.component.html',
  styleUrls: ['./user-repair.component.css']
})
export class UserRepairComponent implements OnInit {

    repairs: Repair[];
    repairsRep: Repair[];
    repair: Repair;
    userId: String;
    isShow: Boolean;

    items = [];
    pages: Array<Number>;
    page: Number = 0;
    len: number;
    index1: number;
    index2: number;
    setNum: number;
    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private router: Router) {
        this.route.queryParams.subscribe(res => {
            console.log(res.userId + ' Detail');
            this.userId = res.userId;
        });
        this.setNum = 10;
    }

    ngOnInit() {
        this.fetchData();
    }
    _initPage(data) {
        console.log(data);
        this.repairsRep = data;
        this.len = this.repairsRep.length;
        this.index1 = 1;
        if (this.len < this.setNum) {
            this.index2 = this.len;
        }
        console.log(Math.ceil(this.len / this.setNum));
        this.pages = new Array(Math.ceil(this.len / this.setNum));
        if ( this.len < this.setNum) {
            this.repairs = this.repairsRep ;
        } else {
            this.repairs = this.repairsRep .slice(0, this.setNum);
        }
    }
    fetchData() {
        this.userService.getRepair(this.userId).subscribe(data => {
            this._initPage(data);
            for (let i = 0; i < data.length ; i++ ) {
                this.userService.getTracking(this.repairsRep[i].id).subscribe(res => {
                    this.repairsRep[i].hasTracking = true;
                }, error => {
                    console.log(true);
                    this.repairsRep[i].hasTracking = false;
                });
            }
            this.isShow = false;
        }, error => {
            this.isShow = true;
        });
    }
    getRepair(item) {
        this.repair = item;
    }
    setPage(i) {
        this.page = i;
        this.index1 = i * this.setNum + 1;
        this.index2 = (i + 1) * this.setNum;
        if (this.index2 > this.len) {
            this.index2 = this.len;
        }
        const setNum = this.setNum;
        this.repairs = this.repairsRep.slice(i * setNum, i * setNum + setNum);
    }
    _downloadAll() {
        const end = [{value: 'null'}];
        Array.prototype.push.apply(this.items, end);
        const opts = [
            {sheetid: 'VendorData', header: true},
        ];
        const report = alasql('SELECT INTO XLSX("' + this.userId + '_repairs.xlsx",?) FROM ?',
            [opts, [this.items]]);
    }

    getAlldata() {
        this._downloadAll();
    }

    updateSelection(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
            console.log('remove ' + item);
        } else {
            this.items.push(item);
            console.log('add ' + item);
        }
        console.log('items: ');
        console.log(this.items);
    }
}
