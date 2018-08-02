import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../provider/provider-user/user.service';
import {Log} from '../../../provider/provider-user/user.model';
import * as alasql from 'alasql';
import {FilterPipe} from '../../filter.pipe';
import * as moment from 'moment';

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
    pages = [];
    page: number;
    pmax: number;
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
        this.page = 0;
    }

    ngOnInit() {
        this.fetchData();
    }
    _initPage(data) {
        console.log(data);
        this.len = data.length;
        this.index1 = 1;
        if (this.len < this.setNum) {
            this.index2 = this.len;
        } else {
            this.index2 = this.setNum;
        }
        // console.log(Math.ceil(this.len / this.setNum));
        // this.pages = new Array(Math.ceil(this.len / this.setNum));
        this.pmax = Math.ceil(this.len / this.setNum);
        for (let i = this.page; i < this.pmax; i++) {
            this.pages.push(i);
        }
        if ( this.len < this.setNum) {
            this.loggers = data ;
        } else {
            this.loggers = data.slice(0, this.setNum);
        }
    }
    search() {
        // console.log('search content');
        // console.log(this.searchText);
        this._initPage(this.filter.transform(this.loggersRep, this.searchText));
    }
    fetchData() {
        this.userService.getLog(this.userId).subscribe(data => {
            this.loggersRep = data;
            this.loggersRep.sort( function (a, b) {
                if (a.createdAt < b.createdAt) {
                    return 1;
                } else {
                    return -1;
                }
            });
            this._initPage(this.loggersRep);
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
        this.items.forEach(e => {
            e.createdAt = moment(e.createdAt).format('MM-DD-YYYY');
            e.modifiedAt = moment(e.modifiedAt).format('MM-DD-YYYY');
        });
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

    numChange(value) {
        console.log(value);
        this.setNum = value;
        this._initPage(this.loggersRep);
    }
    selectAllboxes() {
        let i;
        this.selectAll = !this.selectAll;
        this.items = [];
        if (this.selectAll) {
            for (i = 0; i < this.loggers.length; i ++) {
                this.updateSelection(this.loggers[i]);
            }
        }
    }

    previous() {
        if (this.page > 0)
            this.setPage(this.page - 1);
    }

    next() {
        if (this.page < this.pmax - 1)
            this.setPage(this.page + 1);
    }

    isActive(page) {
        return this.page === page;
    }
}
