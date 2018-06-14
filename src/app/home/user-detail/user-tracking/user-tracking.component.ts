import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../provider/provider-user/user.service';
import {Repair, Tracking} from '../../../provider/provider-user/user.model';
import * as alasql from "alasql";

@Component({
  selector: 'app-user-tracking',
  templateUrl: './user-tracking.component.html',
  styleUrls: ['./user-tracking.component.css']
})
export class UserTrackingComponent implements OnInit {

  trackingId: String;
  repair: Repair;
  trackings: Tracking[];
  trackingsRep: Tracking[];
  userId: String;
  state: String;

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
          console.log(res.id + ' Tracking ID');
          this.trackingId = res.id;
      });
      this.route.queryParams.subscribe(res => {
          console.log(res);
          this.userId = res.userId;
          this.state = res.state;
      });

      this.setNum = 10;
      this.searchText = '';
  }

  ngOnInit() {
    this.fetchData();
  }

    _initPage(data) {
        console.log(data);
        this.len = this.trackingsRep.length;
        this.index1 = 1;
        if (this.len < this.setNum) {
            this.index2 = this.len;
        }
        console.log(Math.ceil(this.len / this.setNum));
        this.pages = new Array(Math.ceil(this.len / this.setNum));
        if ( this.len < this.setNum) {
            this.trackings = this.trackingsRep ;
        } else {
            this.trackings = this.trackingsRep .slice(0, this.setNum);
        }
    }
  fetchData() {
      this.userService.getRepairById(this.trackingId).subscribe(data => {
          console.log(data);
          this.repair = data;
      }, error => {});
      this.userService.getTracking(this.trackingId).subscribe(data => {
          this.trackingsRep = data;
          for (let i = 0; i < data.length ; i++ ) {
              this.trackingsRep[i].consequncesArray = JSON.parse(this.trackingsRep[i].consequences.toString());
              console.log(this.trackingsRep[i].consequncesArray);
          }
          this._initPage(data);
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
        this.trackings = this.trackingsRep.slice(i * setNum, i * setNum + setNum);
    }
    _downloadAll() {
        const end = [{value: 'null'}];
        // Array.prototype.push.apply(this.items, end);
        if (this.items.length > 0) {
            const opts = [
                {sheetid: 'RepairTracking Data', header: true},
            ];
            const report = alasql('SELECT INTO XLSX("' + this.userId + '_repairsTracking.xlsx",?) FROM ?',
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
}
