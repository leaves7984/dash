import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../provider/provider-user/user.service';
import {Vendor} from '../../../provider/provider-user/user.model';
import * as alasql from 'alasql';
import {FilterPipe} from '../../filter.pipe';
import {VendorFilterPipe} from './vendor.filter.pipe';
import * as moment from 'moment';

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
    type: string;

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
    vendorFilter: VendorFilterPipe = new VendorFilterPipe();
    selectAll: Boolean = false;

    constructor(private route: ActivatedRoute,
                private userService: UserService) {
        this.route.params.subscribe(res => {
            console.log(res.userId + ' Detail');
            this.userId = res.userId;
        });
        this.type = 'Vendor';
        this.setNum = 10;
        this.searchText = '';
        this.page = 0;
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
        // console.log(Math.ceil(this.len / this.setNum));
        // this.pages = new Array(Math.ceil(this.len / this.setNum));
        this.pages = [];
        this.pmax = Math.ceil(this.len / this.setNum);
        for (let i = this.page; i < this.pmax; i++) {
            this.pages.push(i);
        }
        if ( this.len < this.setNum) {
            this.vendors = data ;
        } else {
            this.vendors = data.slice(0, this.setNum);
        }
    }
    search() {
        this._initPage(this.filter.transform(this.vendorFilter.transform(this.vendorsRep, this.type), this.searchText));
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
            this._initPage(this.vendorFilter.transform(this.vendorsRep, this.type));
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
        this.items.forEach(e => {
            e.createdAt = moment(e.createdAt).format('MM-DD-YYYY');
            e.modifiedAt = moment(e.modifiedAt).format('MM-DD-YYYY');
        });
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
    typeChange(value) {
        this.type = value;
        this._initPage(this.vendorFilter.transform(this.vendorsRep, value));
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
