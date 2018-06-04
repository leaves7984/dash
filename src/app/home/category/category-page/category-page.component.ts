import {Component, OnInit, TemplateRef} from '@angular/core';
import {CreateService} from "../../../provider/provider-create/create.service";
import {Category} from "../../../provider/provider-create/category.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  categorys: Category[];
  fileToUpload: File = null;
  constructor(private createService: CreateService,
              private router: Router) { }

  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.createService.getCategory().subscribe(data => {
      let i;
      this.categorys = data;
      for (i = 0; i < data.length ; i++ ) {
        // file = new Blob([ data[i].picture_url ], {
        //   type : 'image/jpeg'
        // });
        // this.categorys[i].picture_url = URL.createObjectURL([ data[i].picture_url ]);
        this.categorys[i].picture_url = 'https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_1280.jpg';
      }
      console.log(this.categorys);
    }, error => {

    });
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  DelCategory(id) {
    this.createService.deleteCategory(id)
      .subscribe(data => {
        this.fetchData();
      }, error => {});
  }
  update(id, title, description){
    this.createService.updateSleep(id, title, description, this.fileToUpload).subscribe(data => {
      console.log(data);
      this.fetchData();
    }, error => {});
  }

}
