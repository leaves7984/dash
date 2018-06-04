import { Component, OnInit } from '@angular/core';
import {CreateService} from '../../provider/provider-create/create.service';
import {Category} from "../../provider/provider-create/category.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  categories: Category[];
  fileToUpload: File = null;

  constructor(private createService: CreateService,
              private router: Router) {
    this.createService.getCategory().subscribe( data => {
      this.categories = data;
    }, error => {});
  }

  ngOnInit() {
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  OnSubmit(category_id, title, description, article) {
    this.createService.createSleep(category_id, title, description, article, this.fileToUpload)
      .subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('/article-page');
      }, error => {});
  }
}
