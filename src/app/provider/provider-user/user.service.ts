import { Injectable } from '@angular/core';
import {GPS, Info, Repair, Tracking, User, Vendor, Wheelchair} from './user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rootUrl = 'http://localhost:8787';
  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    const body: User = {
      username: user.username,
      password: user.password
    };
    const reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return this.http.post(this.rootUrl + '/dash/auth/sign-up', body, {headers: reqHeader});
  }

  userAuthentication(username, password) {
    const body: User = {
      username: username,
      password: password
    };
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True'});
    return this.http.post(this.rootUrl + '/dash/auth/login', body, { headers: reqHeader , observe: 'response'});

  }
  getUserClaims() {
    return this.http.get(this.rootUrl + '/rest/user');
  }
  getAdminClaims() {
    return this.http.get(this.rootUrl + '/rest/admin');
  }

  postFile(fileToUpload: File) {

    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.http
      .post(this.rootUrl + '/rest/upload', formData);
  }

  getUsers() {
    return this.http.get(this.rootUrl + '/rest/users');
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
}



