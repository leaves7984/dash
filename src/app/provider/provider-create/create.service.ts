import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Category, Sleep, TipDetail, Tips} from './category.model';
import {User} from "../provider-user/user.model";



@Injectable({
  providedIn: 'root'
})
export class CreateService {

  rootUrl = 'http://localhost:8787';
  constructor(private http: HttpClient) { }
  // Category
  createCategory(title, description, image: File) {
    const formData: FormData = new FormData();
    formData.append('title', title);
    formData.append('des', description);
    formData.append('file', image);
    return this.http.post(this.rootUrl + '/rest/category/create', formData);
  }

  getCategory() {
    return this.http.get<Category[]>(this.rootUrl + '/rest/category');
  }

  deleteCategory(id) {
    return this.http.delete(this.rootUrl + '/rest/category/' + id + '/delete');
  }
  // Article
  getSleep() {
    return this.http.get<Category[]>(this.rootUrl + '/rest/safeSleep');
  }

  createSleep(category_id, title, description, article, image: File) {
    const formData: FormData = new FormData();
    formData.append('id', category_id);
    formData.append('title', title);
    formData.append('des', description);
    formData.append('article', article);
    formData.append('file', image);

    return this.http.post( this.rootUrl + '/rest/safeSleep/create', formData);
  }
  deleteSleep(category_id, sleep_id) {
    return this.http.delete(this.rootUrl + '/rest/category/' + category_id + '/safeSleep/' + sleep_id);
  }

  updateSleep(sleep_id, title, description, image: File){
    const formData: FormData = new FormData();
    formData.append('title', title);
    formData.append('des', description);
    formData.append('file', image);
    return this.http.put(this.rootUrl + '/rest/safeSleep/' + sleep_id, formData);
  }

  // Tip
  createTip(category_id, title_id, topic, content) {
    const body: TipDetail = {
      topic: topic,
      content: content
    };
    return this.http.post(this.rootUrl + '/rest/category/' + category_id + '/safeSleep/' + title_id, body);
  }
  deleteTip(sleep_id, tip_id) {
    return this.http.delete( this.rootUrl + '/rest/safeSleep/' + sleep_id + '/tip/' + tip_id);
  }
}

