import { Component, OnInit } from '@angular/core';
import {CreateService} from "../../../provider/provider-create/create.service";
import {Category} from "../../../provider/provider-create/category.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {

  categories: Category[];
  private isCollapsed: Boolean = false;

  constructor(private createService: CreateService,
              private router: Router) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    let i, j;
    this.createService.getSleep().subscribe(data => {
      console.log(data);
      this.categories = data;
      for (i = 0; i < data.length ; i++ ) {
        for (j = 0; j < data[i].articles.length; j++) {
          this.categories[i].articles[j].picture_url = 'https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_1280.jpg';
        }
        // file = new Blob([ data[i].picture_url ], {
        //   type : 'image/jpeg'
        // });
        // this.categorys[i].picture_url = URL.createObjectURL([ data[i].picture_url ]);
      }
    }, error => {});
  }
  DeleteSleep(category_id, sleep_id) {
    this.createService.deleteSleep(category_id, sleep_id).subscribe( data => {
      console.log(data);
      this.fetchData();
    }, error => {});
  }
  addTip(category_id, sleep_id, topic, content) {
    this.createService.createTip(category_id, sleep_id, topic, content)
      .subscribe(data => {
        console.log(data);
        this.fetchData();
      },  error => {});
  }
  delTip(sleep_id, tip_id) {
    this.createService.deleteTip(sleep_id, tip_id).subscribe(data => {
      console.log(data);
      this.fetchData();
    });
  }

}
