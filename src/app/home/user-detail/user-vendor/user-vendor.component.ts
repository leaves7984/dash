import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../provider/provider-user/user.service';
import {Vendor} from '../../../provider/provider-user/user.model';
import * as alasql from "alasql";
import {FilterPipe} from '../../filter.pipe';

@Component({
  selector: 'app-user-vendor',
  templateUrl: './user-vendor.component.html',
  styleUrls: ['./user-vendor.component.css']
})
export class UserVendorComponent implements OnInit {

    vendors: Vendor[];
    vendorsRep: Vendor[];
    vendor: Vendor;
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
        console.log(data);
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
            this.vendors = data ;
        } else {
            this.vendors = data.slice(0, this.setNum);
        }
    }
    search() {
        // console.log('search content');
        // console.log(this.searchText);
        this._initPage(this.filter.transform(this.vendorsRep, this.searchText));
    }
    fetchData() {
        this.userService.getVendor(this.userId).subscribe(data => {
            this.vendorsRep = data;
            this.vendorsRep.sort( function (a, b) {
                if (a.createdAt < b.createdAt) {
                    return 1;
                } else {
                    return -1;
                }
            });
            this._initPage(this.vendorsRep);
            this.isShow = false;
        }, error => {
            this.isShow = true;
        });
    }
    getVendor(item) {
        this.vendor = item;
    }

    setPage(i) {
        this.page = i;
        this.index1 = i * this.setNum + 1;
        this.index2 = (i + 1) * this.setNum;
        if (this.index2 > this.len) {
            this.index2 = this.len;
        }
        const setNum = this.setNum;
        this.vendors = this.vendorsRep.slice(i * setNum, i * setNum + setNum);
    }

    _downloadAll() {
        const end = [{value: 'null'}];
        // Array.prototype.push.apply(this.items, end);
        if (this.items.length > 0) {
            const opts = [
                {sheetid: 'VendorData', header: true},
            ];
            const report = alasql('SELECT INTO XLSX("' + this.userId + '_vendors.xlsx",?) FROM ?',
                [opts, [this.items]]);
        }
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
        this._initPage(this.vendorsRep);
    }
    selectAllboxes() {
        let i;
        this.selectAll = !this.selectAll;
        this.items = [];
        if (this.selectAll) {
            for (i = 0; i < this.vendors.length; i ++) {
                this.updateSelection(this.vendors[i]);
            }
        }
    }
}
