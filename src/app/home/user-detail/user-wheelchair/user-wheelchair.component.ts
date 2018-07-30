import { Component, OnInit } from '@angular/core';
import { Wheelchair} from '../../../provider/provider-user/user.model';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../provider/provider-user/user.service';
import * as alasql from 'alasql';
import { FilterPipe} from '../../filter.pipe';
import {v} from '@angular/core/src/render3';

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

    searchText: string;
    filter: FilterPipe = new FilterPipe();
    selectAll: Boolean = false;

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
        this.len = data.length;
        this.index1 = 1;
        if (this.len < this.setNum) {
            this.index2 = this.len;
        } else {
            this.index2 = this.setNum;
        }
        console.log(Math.ceil(this.len / this.setNum));
        this.pages = new Array(Math.ceil(this.len / this.setNum));
        if ( this.len < this.setNum) {
            this.wheelchairs = data;
        } else {
            this.wheelchairs = data.slice(0, this.setNum);
        }
    }
    search() {
        // console.log('search content');
        // console.log(this.searchText);
        this._initPage(this.filter.transform(this.wheelchairsRep, this.searchText));
    }
    fetchData() {
        this.userService.getWheelchair(this.userId).subscribe(data => {
            console.log(data);
            this.wheelchairsRep = data;
            this.wheelchairsRep.sort( function (a, b) {
                if (a.createdAt < b.createdAt) {
                    return 1;
                } else {
                    return -1;
                }
            });
            this._initPage(this.wheelchairsRep);
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
        if (this.items.length > 0) {
            const opts = [
                {sheetid: 'WheelchairData', header: true},
            ];
            const report = alasql('SELECT INTO XLSX("' + this.userId + '_wheelchair.xlsx",?) FROM ?',
                [opts, [this.items]]);
        }
        // Array.prototype.push.apply(this.items, end);
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
    numChange(value) {
        console.log(value);
        this.setNum = value;
        this._initPage(this.wheelchairsRep);
    }
    selectAllboxes() {
        let i;
        this.selectAll = !this.selectAll;
        this.items = [];
        if (this.selectAll) {
            for (i = 0; i < this.wheelchairs.length; i ++) {
                this.updateSelection(this.wheelchairs[i]);
            }
        }
    }
}
