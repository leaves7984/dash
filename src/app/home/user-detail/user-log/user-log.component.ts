import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../provider/provider-user/user.service';
import {Log} from '../../../provider/provider-user/user.model';
import * as alasql from "alasql";

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.css']
})
export class UserLogComponent implements OnInit {

    loggers: Log[];
    loggersRep: Log[];
    userId: String;
    isShow: Boolean;

    items = [];
    pages: Array<Number>;
    page: Number = 0;
    len: number;
    index1: number;
    index2: number;
    setNum: number;

    searchText: string;
    constructor(private route: ActivatedRoute,
                private userService: UserService) {
        this.route.params.subscribe(res => {
            console.log(res.userId + ' Detail');
            this.userId = res.userId;
        });
        this.setNum = 10;
        this.searchText = '';
    }

    ngOnInit() {
        this.fetchData();
    }
    _initPage(data) {
        console.log(data);
        this.loggersRep = data;
        this.len = this.loggersRep.length;
        this.index1 = 1;
        if (this.len < this.setNum) {
            this.index2 = this.len;
        }
        console.log(Math.ceil(this.len / this.setNum));
        this.pages = new Array(Math.ceil(this.len / this.setNum));
        if ( this.len < this.setNum) {
            this.loggers = this.loggersRep ;
        } else {
            this.loggers = this.loggersRep .slice(0, this.setNum);
        }
    }
    fetchData() {
        this.userService.getLog(this.userId).subscribe(data => {
            this._initPage(data);
            this.isShow = false;
        }, error => {
            this.isShow = true;
        });
    }

    setPage(i) {
        this.page = i;
        this.index1 = i * this.setNum + 1;
        this.index2 = (i + 1) * this.setNum;
        if (this.index2 > this.len) {
            this.index2 = this.len;
        }
        const setNum = this.setNum;
        this.loggers = this.loggersRep.slice(i * setNum, i * setNum + setNum);
    }
    _downloadAll() {
        const end = [{value: 'null'}];
        if (this.items.length > 0) {
            const opts = [
                {sheetid: 'VendorData', header: true},
            ];
            const report = alasql('SELECT INTO XLSX("' + this.userId + '_loggers.xlsx",?) FROM ?',
                [opts, [this.items]]);
        }
        // Array.prototype.push.apply(this.items, end);
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
