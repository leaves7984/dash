import { Component, OnInit } from '@angular/core';
import { UserService} from '../../provider/provider-user/user.service';
import { Angular5Csv} from 'angular5-csv/Angular5-csv';
import * as alasql from 'alasql';
import {Info, Repair, Tracking} from '../../provider/provider-user/user.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  users: Object;
  data: Object;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
      this.fetchData();
  }

  fetchData() {
      this.userService.getUsers().subscribe(data => {
          console.log(data);
          this.users = data;
      }, error => {});
  }
  downloadOne(userId) {
      this.userService.getAll(userId).subscribe(res => {
          console.log(res);
          let info = [{value: 'null'}];
          let trackings = [{value: 'null'}];
          let repairs = [{value: 'null'}];
          let logger = [{value: 'null'}];
          let repairTrackings = [{value: 'null'}];
          let vendors = [{value: 'null'}];
          let wheelchairs = [{value: 'null'}];
          if (res.gpsTracking != null) {
              trackings = res.gpsTracking;
          }
          if (res.repairData != null) {
              repairs = res.repairData;
          }
          if (res.infoData != null) {
              info = [res.infoData];
          }
          if (res.logData != null) {
              logger = res.logData;
          }
          if (res.repairTrackings != null) {
              repairTrackings = res.repairTrackings;
          }
          if (res.vendorAndContact != null) {
              vendors = res.vendorAndContact;
          }
          if (res.wheelchairData != null) {
              wheelchairs = res.wheelchairData;
          }
          const opts = [
                            {sheetid: 'InfoData', header: true},
                            {sheetid: 'LogData', header: false},
                            {sheetid: 'WheelchairData', header: false},
                            {sheetid: 'VendorAndContact', header: false},
                            {sheetid: 'RepairTrackings', header: false},
                            {sheetid: 'GPSTracking', header: false},
                            {sheetid: 'RepairData', header: false}
                        ];
          const report = alasql('SELECT INTO XLSX("user_' + userId + '.xlsx",?) FROM ?',
              [opts, [info, logger, wheelchairs, vendors, repairTrackings, trackings, repairs]]);
      });
  }
}
