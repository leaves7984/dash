import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../provider/provider-user/user.service';
import {GPS} from '../../../provider/provider-user/user.model';
import * as moment from 'moment';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-user-gps',
  templateUrl: './user-gps.component.html',
  styleUrls: ['./user-gps.component.css']
})
export class UserGpsComponent implements OnInit {
    userId: String;
    gps: GPS[];
    dayData: Object;
    dayLabel: Object;
    weekData = [];
    weekLabel = [];
    chart = [];
    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private elementRef: ElementRef) {
        this.route.params.subscribe(res => {
            console.log(res.userId + ' Detail');
            this.userId = res.userId;
        });
        this.dayData = [0, 0, 1, 2, 0, 0, 0, 0];
        this.dayLabel = ['12AM-3AM', '3AM-6AM', '6AM-9AM', '9AM-12PM', '12PM-3PM', '3PM-6PM', '6PM-9PM', '9PM-12AM'];
        this.weekData = [0, 0, 0, 0, 0, 0, 0];
        this.weekLabel = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }

    ngOnInit() {
        this.fetchData();

    }
    drawChart(ctx, data, label) {
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: label,
                datasets: [{
                    label: '# of Votes',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true
                    }],
                }
            }
        });
    }
    fetchData() {
        this.userService.getGPS(this.userId).subscribe(data => {
            console.log('--Log gps data--');
            console.log(data);
            this.dayData = this.getDayData(data, null);
            this.weekData = this.getWeekData(data);
            const ctx1 = this.elementRef.nativeElement.querySelector('#dayChart').getContext('2d');
            const ctx2 = this.elementRef.nativeElement.querySelector('#weekChart').getContext('2d');
            this.drawChart(ctx1, this.dayData, this.dayLabel);
            this.drawChart(ctx2, this.weekData, this.weekLabel);
            this.gps = data;
        }, error => {});
    }

    getWeekData(data) {
        const weekData = [0, 0, 0, 0, 0, 0, 0];
        const weekLabel = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayDate = moment();
        let d;
        for ( d = 0; d < 7; d++) {
            weekLabel[d] = moment().subtract((6 - d), 'day').format('dddd');
            weekData[d] = this.getTotalDayData(data, moment().subtract((6 - d), 'day'));
        }

        console.log('gpsdata::weekLabel', weekLabel);
        console.log('gpsdata::weekData', weekData);
        return weekData;
    }
    getTotalDayData(data, trackingDate) {
        const dayData = this.getDayData(data, trackingDate);
        let i;
        let total = 0;
        for ( i = 0; i < dayData.length; i++) {
            total = total + dayData[i];
        }
        return total;
    }

    getDayData(data, trackingDate) {
        let i;
        let trackLog;
        let isSameDay;
        let todayDate = moment();
        if ( trackingDate ) {
            todayDate = trackingDate;
        }
        console.log('gpsdata now: ', todayDate.hour(), todayDate);
        const dayData = [0, 0, 0, 0, 0, 0, 0, 0];
        const dayLabel = ['12AM-3AM', '3AM-6AM', '6AM-9AM', '9AM-12PM', '12PM-3PM', '3PM-6PM', '6PM-9PM', '9PM-12AM'];
        const dataUpdate = [true, true, true, true, true, true, true, true];

        if (data && data.length > 0) {
            for (i = data.length - 1; i >= 0; i--) {
                trackLog = data[i];

                const dataDate = moment(trackLog.date);
                isSameDay = dataDate.isSame(todayDate, 'day');

                // console.log('gpsdata::trackLog', trackLog);

                if (isSameDay) {
                    if (dataUpdate[0] && 0 <= trackLog.period && 3 > trackLog.period) {
                        dayData[0] = dayData[0] + trackLog.distance;
                        if (0 - trackLog.period === -0.5) {
                            dayData[0] = trackLog.distance;
                            dataUpdate[0] = false;
                        }
                    } else if (dataUpdate[1] && 3 <= trackLog.period && 6 > trackLog.period) {
                        dayData[1] = dayData[1] + trackLog.distance;
                        if (3 - trackLog.period === -0.5) {
                            dayData[1] = trackLog.distance;
                            dataUpdate[1] = false;
                        }
                    } else if (dataUpdate[2] && 6 <= trackLog.period && 9 > trackLog.period) {
                        dayData[2] = dayData[2] + trackLog.distance;
                        if (6 - trackLog.period === -0.5) {
                            dayData[2] = trackLog.distance;
                            dataUpdate[2] = false;
                        }
                    } else if (dataUpdate[3] && 9 <= trackLog.period && 12 > trackLog.period) {
                        dayData[3] = dayData[3] + trackLog.distance;
                        if (9 - trackLog.period === -0.5) {
                            dayData[3] = trackLog.distance;
                            dataUpdate[3] = false;
                        }
                    } else if (dataUpdate[4] && 12 <= trackLog.period && 15 > trackLog.period) {
                        dayData[4] = dayData[4] + trackLog.distance;
                        if (12 - trackLog.period === -0.5) {
                            dayData[4] = trackLog.distance;
                            dataUpdate[4] = false;
                        }
                    } else if (dataUpdate[5] && 15 <= trackLog.period && 18 > trackLog.period) {
                        dayData[5] = dayData[5] + trackLog.distance;
                        if (15 - trackLog.period === -0.5) {
                            dayData[5] = trackLog.distance;
                            dataUpdate[5] = false;
                        }
                    } else if (dataUpdate[6] && 18 <= trackLog.period && 21 > trackLog.period) {
                        dayData[6] = dayData[6] + trackLog.distance;
                        if (18 - trackLog.period === -0.5) {
                            dayData[6] = trackLog.distance;
                            dataUpdate[6] = false;
                        }
                    } else if (dataUpdate[7] && 21 <= trackLog.period && 24 > trackLog.period) {
                        dayData[7] = dayData[7] + trackLog.distance;
                        if (21 - trackLog.period === -0.5) {
                            dayData[7] = trackLog.distance;
                            dataUpdate[7] = false;
                        }
                    }
                }
            }
        }
        console.log('gpsdata::dayData', dayData);
        return dayData;
    }
}
