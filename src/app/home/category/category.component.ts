import { Component, OnInit } from '@angular/core';
import {CreateService} from '../../provider/provider-create/create.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  fileToUpload: File = null;


  constructor(private createService: CreateService, private router: Router) { }

  ngOnInit() {
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }


  OnSubmit(title, description) {
    console.log(title + ' ' + description);
    this.createService.createCategory(title, description, this.fileToUpload)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/category-page']);
      }, error => {

      });
  }
}
