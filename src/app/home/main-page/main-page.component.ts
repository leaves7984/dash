import { Component, OnInit } from '@angular/core';
import { UserService} from '../../provider/provider-user/user.service';
import { Angular5Csv} from 'angular5-csv/Angular5-csv';
import * as alasql from 'alasql';
import {Info, Repair, Tracking} from '../../provider/provider-user/user.model';
import {FilterPipe} from '../filter.pipe';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
    pages: Array<Number>;
    page: Number = 0;
    setNum: number;
    len: number;
    index1: number;
    index2: number;
    searchText: string;
    filter: FilterPipe = new FilterPipe();

    // data: Object;
    users = [];
    userRep = [];

    items = [];
    info = [];
    trackings = [];
    repairs = [];
    logger = [];
    repairTrackings = [];
    vendors = [];
    wheelchairs = [];

  constructor(private userService: UserService) {
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
      }
      console.log(Math.ceil(this.len / this.setNum));
      this.pages = new Array(Math.ceil(this.len / this.setNum));
      if ( this.len < this.setNum) {
          this.users = data;
      } else {
          this.users = data.slice(0, this.setNum);
      }
  }
    search() {
        // console.log('search content');
        // console.log(this.searchText);
        this._initPage(this.filter.transform(this.userRep, this.searchText));
    }
  fetchData() {
      this.userService.getUsers().subscribe(data => {
          console.log(data);
          Array.prototype.push.apply(this.userRep, data);
          this._initPage(this.userRep);
          // const setNum = this.setNum;
          // console.log(data);
          // Array.prototype.push.apply(this.userRep, data);
          // this.len = this.userRep.length;
          // this.index1 = 1;
          // if (this.len < this.setNum) {
          //     this.index2 = this.len;
          // }
          // const len = this.len;
          // console.log(Math.ceil(len / setNum));
          // this.pages = new Array(Math.ceil(len / setNum));
          // if ( len < setNum) {
          //     this.users = this.userRep;
          // } else {
          //     this.users = this.userRep.slice(0, setNum);
          // }
      }, error => {});
  }
  setPage(i) {
      this.page = i;
      this.index1 = i * this.setNum + 1;
      this.index2 = (i + 1) * this.setNum;
      if (this.index2 > this.len) {
          this.index2 = this.len;
      }
      const setNum = this.setNum;
      this.users = this.userRep.slice(i * setNum, i * setNum + setNum);
  }

  _getData(userId, i, len) {
      return this.userService.getAll(userId)
          .subscribe(res => {
              if (res['gpsTracking'] != null) {
                  // if (this.trackings.length === 1) {
                  //     this.trackings = res.gpsTracking;
                  // } else {
                  //     this.trackings.push(res.gpsTracking);
                  //     console.log(res.gpsTracking);
                  // }
                  Array.prototype.push.apply(this.trackings, res['gpsTracking']);
                  console.log(this.trackings);
              }
              if (res['repairData'] != null) {
                  // if (this.repairs.length === 1) {
                  //     this.repairs = res.repairData;
                  // } else {
                  //     this.repairs.push(res.repairData);
                  // }
                  Array.prototype.push.apply(this.repairs, res['repairData']);
              }
              if (res['infoData'] != null) {
                  // if (this.info.length === 1) {
                  //     this.info = [res.infoData];
                  // } else {
                  //     this.info.push([res.infoData]);
                  // }
                  Array.prototype.push.apply(this.info, [res['infoData']]);
              }
              if (res['logData'] != null) {
                  // if (this.logger.length === 1) {
                  //     this.logger = res.logData;
                  // } else {
                  //     this.logger.push(res.logData);
                  // }
                  Array.prototype.push.apply(this.logger, res['logData'] );
              }
              if (res['repairTrackings'] != null) {
                  // if (this.repairTrackings.length === 1) {
                  //     this.repairTrackings = res.repairTrackings;
                  // } else {
                  //     this.repairTrackings.push(res.repairTrackings);
                  // }
                  Array.prototype.push.apply(this.repairTrackings, res['repairTrackings']);
              }
              if (res['vendorAndContact'] != null) {
                  // if (this.vendors.length === 1) {
                  //     this.vendors = res.vendorAndContact;
                  // } else {
                  //     this.vendors.push(res.vendorAndContact);
                  // }
                  Array.prototype.push.apply(this.vendors, res['vendorAndContact']);
              }
              if (res['wheelchairData'] != null) {
                  // if (this.wheelchairs.length === 1) {
                  //     this.wheelchairs = res.wheelchairData;
                  // } else {
                  //     this.wheelchairs.push(res.wheelchairData);
                  // }
                  Array.prototype.push.apply(this.wheelchairs, res['wheelchairData']);
              }
              i++;
              if (i >= len || len === 1) {
                  this._downloadAll();
              } else {
                  this._getData(this.items[i], i, len);
              }
          }, err => {
              i++;
              if (i >= len || len === 1) {
                  this._downloadAll();
              } else {
                  this._getData(this.items[i], i, len);
              }
          });
  }
  getAlldata() {
      const len = this.items.length;
      const i = 0;
      if (i < len) {
          this._getData(this.items[i], i, len);
      }
  }
  initValue() {
      this.info = [];
      this.trackings = [];
      this.repairs = [];
      this.logger = [];
      this.repairTrackings = [];
      this.vendors = [];
      this.wheelchairs = [];
  }
  _downloadAll() {
      const end = [{value: 'null'}];
      Array.prototype.push.apply(this.info, end);
      Array.prototype.push.apply(this.trackings, end);
      Array.prototype.push.apply(this.repairs, end);
      Array.prototype.push.apply(this.logger, end);
      Array.prototype.push.apply(this.repairTrackings, end);
      Array.prototype.push.apply(this.vendors, end);
      Array.prototype.push.apply(this.wheelchairs, end);
      const opts = [
          {sheetid: 'InfoData', header: true},
          {sheetid: 'LogData', header: false},
          {sheetid: 'WheelchairData', header: false},
          {sheetid: 'VendorAndContact', header: false},
          {sheetid: 'RepairTrackings', header: false},
          {sheetid: 'GPSTracking', header: false},
          {sheetid: 'RepairData', header: false}
      ];
      const report = alasql('SELECT INTO XLSX("user_select' + '.xlsx",?) FROM ?',
          [opts, [this.info, this.logger, this.wheelchairs, this.vendors, this.repairTrackings, this.trackings, this.repairs]]);
      this.initValue();
  }
  updateSelection(userId) {
      const index = this.items.indexOf(userId);
      if (index !== -1) {
        this.items.splice(index, 1);
        console.log('remove ' + userId);
      } else {
          this.items.push(userId);
          console.log('add ' + userId);
      }
      console.log('items: ');
      console.log(this.items);
  }

  downloadOne(userId) {
      this._getData(userId, 0, 1);
  }
}
