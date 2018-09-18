import { Component, OnInit } from '@angular/core';
import { UserService} from '../../provider/provider-user/user.service';
import { Angular5Csv} from 'angular5-csv/Angular5-csv';
import * as alasql from 'alasql';
import {Info, Repair, Tracking} from '../../provider/provider-user/user.model';
import {FilterPipe} from '../filter.pipe';
import * as moment from 'moment';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
    page: number;
    pmax: number;
    setNum: number;
    len: number;
    index1: number;
    index2: number;
    searchText: string;
    selectAll: Boolean = false;
    filter: FilterPipe = new FilterPipe();

    // data: Object;
    users = [];
    userRep = [];
    pages = [];

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
      this.pages = [];
      this.pmax = Math.ceil(this.len / this.setNum);
      for (let i = this.page; i < this.pmax && i < 5; i++) {
          this.pages.push(i);
      }
      // this.pages = new Array(Math.ceil(this.len / this.setNum));
      if ( this.len < this.setNum) {
          this.users = data;
      } else {
          this.users = data.slice(0, this.setNum);
      }
  }
    search() {
        this._initPage(this.filter.transform(this.userRep, this.searchText));
    }
  fetchData() {
      this.userService.getUsers('user').subscribe(data => {
          console.log(data);
          const tmp = [];
          Array.prototype.push.apply(tmp, data);
          tmp.forEach(e => {
              this.userRep.push(e[0]);
          });
          this.userRep.sort();
          this._initPage(this.userRep);
      }, error => {});
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
  setPage(i) {
      this.page = i;
      const distance = this.pmax - this.page - 5;
      let j;
      this.pages = [];
      if (distance < 0) {
          for (j = this.page + distance; j < this.pmax; j++) {
              this.pages.push(j);
          }
      } else if (distance > 0) {
          for (j = this.page; j < this.page + 5; j++) {
              this.pages.push(j);
          }
      } else {
          for (j = this.page; j < this.pmax; j++) {
              this.pages.push(j);
          }
      }
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
              if (res['isExist'] === false && len === 1) {
                  alert('no data exist');
                  return;
              }
              if (res['gpsTracking'] != null) {
                  res['gpsTracking'].forEach(e => {
                      e.date = moment(e.date).format('MM-DD-YYYY');
                      e.createdAt = moment(e.createdAt).format('MM-DD-YYYY');
                      e.modifiedAt = moment(e.modifiedAt).format('MM-DD-YYYY');
                  });
                  Array.prototype.push.apply(this.trackings, res['gpsTracking']);
              }
              if (res['repairData'] != null) {
                  res['repairData'].forEach(e => {
                      e.date = moment(e.date).format('MM-DD-YYYY');
                      e.createdAt = moment(e.createdAt).format('MM-DD-YYYY');
                      e.modifiedAt = moment(e.modifiedAt).format('MM-DD-YYYY');
                      e.dateRepairNeeded = moment(e.dateRepairNeeded).format('MM-DD-YYYY');
                      e.dateRepairCompleted = moment(e.dateRepairCompleted).format('MM-DD-YYYY');
                      e.consequences = JSON.parse(e.consequences);
                  });
                  Array.prototype.push.apply(this.repairs, res['repairData']);
              }
              if (res['infoData'] != null) {
                  const e = res['infoData'];
                  e.createdAt = moment(e.createdAt).format('MM-DD-YYYY');
                  e.modifiedAt = moment(e.modifiedAt).format('MM-DD-YYYY');
                  e.wheelchairUsage = JSON.parse(JSON.parse(e.wheelchairUsage));
                  Array.prototype.push.apply(this.info, [e]);
              }
              if (res['logData'] != null) {
                  res['logData'].forEach(e => {
                      e.createdAt = moment(e.createdAt).format('MM-DD-YYYY');
                      e.modifiedAt = moment(e.modifiedAt).format('MM-DD-YYYY');
                  });
                  Array.prototype.push.apply(this.logger, res['logData'] );
              }
              if (res['repairTracking'] != null) {
                  res['repairTracking'].forEach(e => {
                      e.createdAt = moment(e.createdAt).format('MM-DD-YYYY');
                      e.modifiedAt = moment(e.modifiedAt).format('MM-DD-YYYY');
                  });
                  Array.prototype.push.apply(this.repairTrackings, res['repairTrackings']);
              }
              if (res['vendorAndContact'] != null) {
                  res['vendorAndContact'].forEach(e => {
                      e.createdAt = moment(e.createdAt).format('MM-DD-YYYY');
                      e.modifiedAt = moment(e.modifiedAt).format('MM-DD-YYYY');
                  });
                  Array.prototype.push.apply(this.vendors, res['vendorAndContact']);
              }
              if (res['wheelchairData'] != null) {
                  res['wheelchairData'].forEach(e => {
                      e.createdAt = moment(e.createdAt).format('MM-DD-YYYY');
                      e.modifiedAt = moment(e.modifiedAt).format('MM-DD-YYYY');
                  });
                  Array.prototype.push.apply(this.wheelchairs, res['wheelchairData']);
              }
              i++;
              if (i >= len) {
                  this._downloadAll();
              } else {
                  this._getData(this.items[i], i, len);
              }
          }, err => {
              i++;
              if (i > len || len === 1) {
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

    numChange(value) {
        console.log(value);
        this.setNum = value;
        this._initPage(this.userRep);
    }
    selectAllboxes() {
      let i;
      this.selectAll = !this.selectAll;
      this.items = [];
      if (this.selectAll) {
          for (i = 0; i < this.users.length; i ++) {
              this.updateSelection(this.users[i]);
          }
      }
    }
}
