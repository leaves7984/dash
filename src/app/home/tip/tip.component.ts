import { Component, OnInit } from '@angular/core';
import {CreateService} from "../../provider/provider-create/create.service";
import {Category, Sleep} from "../../provider/provider-create/category.model";

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.css']
})
export class TipComponent implements OnInit {

  categories: Category[];
  selectOne: Sleep[];
  constructor(private createService: CreateService) { }

  ngOnInit() {
    this.createService.getCategory().subscribe( data => {
      this.categories = data;
    }, error => {});
  }
  getCategory(index) {
    console.log(index);
    this.selectOne = this.categories[index].articles;
  }

  OnSubmit(index, sleep_id, topic, content) {
    const category_id = this.categories[index].id;
    this.createService.createTip(category_id, sleep_id, topic, content)
      .subscribe(data => {
        console.log(data);
      },  error => {});

  }
}
