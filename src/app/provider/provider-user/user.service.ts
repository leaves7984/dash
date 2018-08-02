import { Injectable } from '@angular/core';
import {GPS, Info, Log, Repair, Tracking, User, Vendor, Wheelchair} from './user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rootUrl = 'https://shrsft6029himb.shrs.pitt.edu/keepmvn/api';
  // rootUrl = 'http://localhost:8787';
  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    const body: User = {
      username: user.username,
      password: user.password
    };
    const reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return this.http.post(this.rootUrl + '/auth/clinic/sign-up', body, {headers: reqHeader});
  }

  userAuthentication(username, password) {
    const body: User = {
      username: username,
      password: password
    };
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True'});
    return this.http.post(this.rootUrl + '/auth/manager/login', body, { headers: reqHeader , observe: 'response'});

  }
  getAdminClaims() {
    return this.http.get(this.rootUrl + '/rest/isadmin');
  }
  getUsers(role) {
    return this.http.get(this.rootUrl + '/rest/' + role);
  }

  getUserInfo(userId) {
      return this.http.get<Info>(this.rootUrl + '/rest/infoData/' + userId);
  }
  getWheelchair(userId) {
      return this.http.get<Wheelchair[]>(this.rootUrl + '/rest/wheelchair/' + userId);
  }
  getVendor(userId) {
      return this.http.get<Vendor[]>(this.rootUrl + '/rest/vendorAndContact/' + userId);
  }
  getRepair(userId) {
    return this.http.get<Repair[]>(this.rootUrl + '/rest/repairData/' + userId);
  }
  getRepairById(Id) {
    return this.http.get<Repair>(this.rootUrl + '/rest/repairById/' + Id);
  }
  getTracking(Id) {
      return this.http.get<Tracking[]>(this.rootUrl + '/rest/repairDataTracking/' + Id);
  }
  getGPS(userId) {
      return this.http.get<GPS[]>(this.rootUrl + '/rest/gpsTrackingData/' + userId);
  }
  getLog(userId) {
    return this.http.get<Log[]>(this.rootUrl + '/rest/logger/' + userId);
  }

  getAll(userId) {
    return this.http.get(this.rootUrl + '/rest/getData/' + userId);
  }

  // upload multiple users
    postFile(fileToUpload: File) {

        const formData: FormData = new FormData();
        formData.append('file', fileToUpload);
        return this.http
            .post(this.rootUrl + '/rest/upload', formData);
    }
//    add one user
    uploadOne(username, password) {
        const body = {
            username: username,
            password: password
        };
        return this.http.post(this.rootUrl + '/rest/sign-up', body);
    }

    changePassword(username, password) {
        const body = {
            username: username,
            password: password
        };
        return this.http.post(this.rootUrl + '/rest/changepwd', body);
    }

    enableUser(username, status) {
        return this.http.post(this.rootUrl + '/rest/enableUser/' + username + '/' + status, null);
    }
}





