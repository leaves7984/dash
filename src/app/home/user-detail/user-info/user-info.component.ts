import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../provider/provider-user/user.service';
import {ActivatedRoute} from '@angular/router';
import {Info, Wheelchair} from '../../../provider/provider-user/user.model';
import {FilterPipe} from '../../filter.pipe';
import * as alasql from 'alasql';
import * as moment from 'moment';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  infos: Info[];
  infosRep: Info[];
  info: Info;
  userId: String;
  usages = [];
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
  fetchData() {
        this.userService.getUserInfo(this.userId).subscribe(data => {
            console.log(data);
            // data.wheelchairUsage = JSON.parse(data.wheelchairUsage.toString());
            data.forEach(function(info) {
                try {
                    info.wheelchairUsage = JSON.parse(info.wheelchairUsage.toString());
                } catch (e) {
                    console.log(e.toString());
                }
            });
            this.infosRep = data;
            this.infosRep.sort( function (a, b) {
                if (a.createdAt < b.createdAt) {
                    return 1;
                } else {
                    return -1;
                }
            });
            this._initPage(this.infosRep);
            this.isShow = false;
        }, error => {
            this.isShow = true;
        });
      // this.userService.getUserInfo(this.userId).subscribe(data => {
      //     console.log(data);
      //     this.info = data;
      //     // this.usages = data.wheelchairUsage;
      //     if (data.wheelchairUsage != null) {
      //         this.usages = JSON.parse(data.wheelchairUsage.toString());
      //     }
      // }, error => {});
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
            this.infos = data;
        } else {
            this.infos = data.slice(0, this.setNum);
        }
    }
    search() {
        this._initPage(this.filter.transform(this.infosRep, this.searchText));
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
    getInfo(item) {
        this.info = item;
    }
    _downloadAll() {
        const end = [{value: 'null'}];
        this.items.forEach(e => {
            e.createdAt = moment(e.createdAt).format('MM-DD-YYYY');
            e.modifiedAt = moment(e.modifiedAt).format('MM-DD-YYYY');
        });
        if (this.items.length > 0) {
            const opts = [
                {sheetid: 'InfoData', header: true},
            ];
            const report = alasql('SELECT INTO XLSX("' + this.userId + '_info.xlsx",?) FROM ?',
                [opts, [this.items]]);
        }
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
        this.infos = this.infosRep.slice(i * setNum, i * setNum + setNum);
    }
    numChange(value) {
        console.log(value);
        this.setNum = value;
        this._initPage(this.infosRep);
    }
    selectAllboxes() {
        let i;
        this.selectAll = !this.selectAll;
        this.items = [];
        if (this.selectAll) {
            for (i = 0; i < this.infos.length; i ++) {
                this.updateSelection(this.infos[i]);
            }
        }
    }

    previous() {
        if (this.page > 0) {
            this.setPage(this.page - 1);
        }
    }

    next() {
        if (this.page < this.pmax - 1) {
            this.setPage(this.page + 1);
        }
    }

    isActive(page) {
        return this.page === page;
    }
}
