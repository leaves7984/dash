import { Component, OnInit } from '@angular/core';
import { UserService} from '../../provider/provider-user/user.service';
import { Angular5Csv} from 'angular5-csv/Angular5-csv';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  users: Object;
  data: Object;
  constructor(private userService: UserService) { }

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

      let data = [
          {
              name: "Test 1",
              age: 13,
              average: 8.2,
              approved: true,
              description: "using 'Content here, content here' "
          },
          {
              name: 'Test 2',
              age: 11,
              average: 8.2,
              approved: true,
              description: "using 'Content here, content here' "
          },
          {
              name: 'Test 4',
              age: 10,
              average: 8.2,
              approved: true,
              description: "using 'Content here, content here' "
          },
      ];
      let options = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: true,
          showTitle: true,
          title: 'Your title',
          useBom: true,
          headers: ['Name', 'Age', 'Average', 'Approved', 'Description']};

      this.userService.getAll(userId).subscribe(res => {
          console.log(res);
          this.data = res;
          // new Angular5Csv(this.data, 'My Report', options);
      });
      // new Angular5Csv(res.gpsTracking, 'My Report', options);

      // new Angular5Csv(data, 'My Report', options);
  }
}
