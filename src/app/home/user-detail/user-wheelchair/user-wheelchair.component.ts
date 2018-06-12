import { Component, OnInit } from '@angular/core';
import { Wheelchair} from '../../../provider/provider-user/user.model';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../provider/provider-user/user.service';
import * as alasql from "alasql";

@Component({
  selector: 'app-user-wheelchair',
  templateUrl: './user-wheelchair.component.html',
  styleUrls: ['./user-wheelchair.component.css']
})
export class UserWheelchairComponent implements OnInit {

    wheelchairs: Wheelchair[];
    wheelchairsRep: Wheelchair[];
    wheelchair: Wheelchair;
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
                private userService: UserService) {
        this.route.params.subscribe(res => {
            console.log(res.userId + ' Detail');
            this.userId = res.userId;
        });
        this.setNum = 10;
    }

    ngOnInit() {
        this.fetchData();
    }
    _initPage(data) {
        this.wheelchairsRep = data;
        this.len = this.wheelchairsRep.length;
        this.index1 = 1;
        if (this.len < this.setNum) {
            this.index2 = this.len;
        }
        console.log(Math.ceil(this.len / this.setNum));
        this.pages = new Array(Math.ceil(this.len / this.setNum));
        if ( this.len < this.setNum) {
            this.wheelchairs = this.wheelchairsRep;
        } else {
            this.wheelchairs = this.wheelchairsRep.slice(0, this.setNum);
        }
    }
    fetchData() {
        this.userService.getWheelchair(this.userId).subscribe(data => {
            console.log(data);
            this._initPage(data);
            this.isShow = false;
        }, error => {
            this.isShow = true;
        });
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
    getWheelchair(item) {
        this.wheelchair = item;
    }
    _downloadAll() {
        const end = [{value: 'null'}];
        Array.prototype.push.apply(this.items, end);
        const opts = [
            {sheetid: 'WheelchairData', header: true},
        ];
        const report = alasql('SELECT INTO XLSX("' + this.userId + '_wheelchair.xlsx",?) FROM ?',
            [opts, [this.items]]);
    }

    getAlldata() {
       this._downloadAll();
    }

    setPage(i) {
        this.page = i;
        this.index1 = i * this.setNum + 1;
        this.index2 = (i + 1) * this.setNum;
        if (this.index2 > this.len) {
            this.index2 = this.len;
        }
        const setNum = this.setNum;
        this.wheelchairs = this.wheelchairsRep.slice(i * setNum, i * setNum + setNum);
    }

}
