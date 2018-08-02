import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Repair, Vendor} from '../../../provider/provider-user/user.model';
import {UserService} from '../../../provider/provider-user/user.service';
import * as alasql from 'alasql';
import {FilterPipe} from '../../filter.pipe';
import * as moment from 'moment';

@Component({
  selector: 'app-user-repair',
  templateUrl: './user-repair.component.html',
  styleUrls: ['./user-repair.component.css']
})
export class UserRepairComponent implements OnInit {

    repairs: Repair[];
    repairsRep: Repair[];
    repair: Repair;
    userId: String;
    isShow: Boolean;

    items = [];
    pages = [];
    page: number;
    pmax: number;
    len: number;
    index1: number;
    index2: number;
    setNum: number;

    searchText: string;
    filter: FilterPipe = new FilterPipe();
    selectAll: Boolean = false;

    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private router: Router) {
        this.route.queryParams.subscribe(res => {
            console.log(res.userId + ' Detail');
            this.userId = res.userId;
        });
        this.setNum = 10;
        this.searchText = '';
        this.page = 0;
    }

    ngOnInit() {
        this.fetchData();
    }
    _initPage(data) {
        console.log(data);
        this.len = data.length;
        this.index1 = 1;
        if (this.len < this.setNum) {
            this.index2 = this.len;
        } else {
            this.index2 = this.setNum;
        }
        // console.log(Math.ceil(this.len / this.setNum));
        // this.pages = new Array(Math.ceil(this.len / this.setNum));
        this.pmax = Math.ceil(this.len / this.setNum);
        for (let i = this.page; i < this.pmax; i++) {
            this.pages.push(i);
        }
        if ( this.len < this.setNum) {
            this.repairs = data ;
        } else {
            this.repairs = data.slice(0, this.setNum);
        }
    }
    search() {

        this._initPage(this.filter.transform(this.repairsRep, this.searchText));
    }
    _getCategories() {
        const str = '[{"label":"Seat/Back/Positioning (supports' +
            ' arms/legs/feet/head)","description":["","","",""],' +
            '"subCategory":[{"label":"Seat back","description":["","The seat back can be either rigid plastic or fabric. Problems include ripped, torn, or sagging fabric; sharp edges or cracks in plastic","The seat back can be either rigid plastic or fabric. Problems include ripped, torn, or sagging fabric; sharp edges or cracks in plastic",""],"subCategory":[{"label":"Crack in rigid seat back","description":["","","",""],"subCategory":[],"type":"3","idx":1,"images":["","","",""]},{"label":"Backrest cane","description":["","","",""],"subCategory":[],"type":"3","idx":2,"images":["","","",""]},{"label":"Sagging backrest upholstery","description":["","","",""],"subCategory":[],"type":"3","idx":3,"images":["","","",""]},{"label":"Torn backrest upholstery","description":["","","",""],"subCategory":[],"type":"3","idx":4,"images":["","","",""]},{"label":"Back cushion deteriorating/cracked","description":["","","",""],"subCategory":[],"type":"3","idx":5,"images":["","","",""]},{"label":"Torn/worn/holes in back cushion cover","description":["","","",""],"subCategory":[],"type":"3","idx":6,"images":["","","",""]},{"label":"I’m not sure/other","description":["","","",""],"subCategory":[],"type":"3","idx":7,"images":["","","",""]}],"type":"3","idx":1,"images":["","pwc_back.jpg","mwc_seat_back.jpg",""]},{"label":"Seat base","description":["","Problems include sharp edges or cracks in seat base","The seat base can be either rigid plastic or fabric. Problems include ripped, torn, or sagging fabric; sharp edges or cracks in plastic",""],"subCategory":[{"label":"Crack rigid seat base","description":["","","",""],"subCategory":[],"type":"3","idx":1,"images":["","","",""]},{"label":"Sagging seat upholstery","description":["","","",""],"subCategory":[],"type":"2","idx":2,"images":["","","",""]},{"label":"Torn seat upholstery","description":["","","",""],"subCategory":[],"type":"3","idx":3,"images":["","","",""]},{"label":"I’m not sure/ other","description":["","","",""],"subCategory":[],"type":"3","idx":4,"images":["","","",""]}],"type":"3","idx":2,"images":["","pwc_base.jpg","mwc_seat_base.jpg",""]},{"label":"Cushion","description":["","The seat cushion can be made of a combination of foam, gel, or air pockets. Problems include tears, punctures, deflated air cells, or otherwise damaged foam or gel.","The seat cushion can be made of a combination of foam, gel, or air pockets. Problems include tears, punctures, deflated air cells, or otherwise damaged foam or gel.",""],"subCategory":[{"label":"Leaking gel","description":["","","",""],"subCategory":[],"type":"3","idx":1,"images":["","","",""]},{"label":"Leaking/won’t hold air","description":["","","",""],"subCategory":[],"type":"3","idx":2,"images":["","","",""]},{"label":"Deteriorating foam","description":["","","",""],"subCategory":[],"type":"3","idx":3,"images":["","","",""]},{"label":"Torn cushion cover","description":["","","",""],"subCategory":[],"type":"3","idx":4,"images":["","","",""]},{"label":"I’m not sure/ other","description":["","","",""],"subCategory":[],"type":"3","idx":5,"images":["","","",""]}],"type":"3","idx":3,"images":["","pwc_cushion.jpg","mwc_cushion.jpg",""]},{"label":"Positioning support (arm/legs/feet/head)","description":["","Positioning supports should be appropriately aligned and have intact surface (fabric or plastic). Problems include sharp edges, torn fabric, loose or missing bolts.","Positioning supports should be appropriately aligned and have intact surface (fabric or plastic). Problems include sharp edges, torn fabric, loose or missing bolts.",""],"subCategory":[{"label":"Head support/head rest","description":["","","",""],"subCategory":[],"type":"1","idx":1,"images":["","","",""]},{"label":"Arm rest","description":["","","",""],"subCategory":[],"type":"3","idx":2,"images":["","","",""]},{"label":"Lateral/trunk support","description":["","","",""],"subCategory":[],"type":"3","idx":3,"images":["","","",""]},{"label":"Clothing guard","description":["","","",""],"subCategory":[],"type":"2","idx":4,"images":["","","",""]},{"label":"Thigh support","description":["","","",""],"subCategory":[],"type":"1","idx":5,"images":["","","",""]},{"label":"Calf (lower leg) support","description":["","","",""],"subCategory":[],"type":"3","idx":6,"images":["","","",""]},{"label":"Foot rest","description":["","","",""],"subCategory":[],"type":"3","idx":7,"images":["","","",""]},{"label":"I’m not sure/ other","description":["","","",""],"subCategory":[],"type":"3","idx":8,"images":["","","",""]}],"type":"3","idx":4,"images":["","pwc_supports.jpg","mwc_supports.jpg",""]},{"label":"Power Seating Functions","description":["","Problems include power seating functions that do not move through range of motion smoothly or grinding or scraping noises while using power seating functions.","",""],"subCategory":[{"label":"Tilt","description":["","","",""],"subCategory":[],"type":"1","idx":1,"images":["","","",""]},{"label":"Recline","description":["","","",""],"subCategory":[],"type":"1","idx":2,"images":["","","",""]},{"label":"Elevating leg rest","description":["","","",""],"subCategory":[],"type":"1","idx":3,"images":["","","",""]},{"label":"Seat elevator","description":["","","",""],"subCategory":[],"type":"1","idx":4,"images":["","","",""]},{"label":"Standing","description":["","","",""],"subCategory":[],"type":"1","idx":5,"images":["","","",""]},{"label":"I’m not sure/ other","description":["","","",""],"subCategory":[],"type":"1","idx":6,"images":["","","",""]}],"type":"1","idx":5,"images":["","power_seating.jpg","",""]},{"label":"Seat belt","description":["","Seat belt should be tightly fastened to frame and able to easily be fastened and removed.","Seat belt should be tightly fastened to frame and able to easily be fastened and removed.",""],"subCategory":[],"type":"3","idx":6,"images":["","mwc_seatbelt.png","mwc_seatbelt.png",""]}],"type":"3","idx":1,"images":["","","",""]},{"label":"Wheels","description":["","","",""],"subCategory":[{"label":"Drive wheels (larger wheel)","description":["","Maintenance is needed if wheels do not hold pressure, have cracks, or tread is bald or has bulges.","",""],"subCategory":[{"label":"Worn tire (flat spots, insufficient/uneven tread, bald)","description":["","","",""],"subCategory":[],"type":"1","idx":1,"images":["","","",""]},{"label":"Flat tire (won’t hold air)","description":["","","",""],"subCategory":[],"type":"1","idx":2,"images":["","","",""]},{"label":"Bearing","description":["","","",""],"subCategory":[],"type":"1","idx":3,"images":["","","",""]},{"label":"I’m not sure/ other","description":["","","",""],"subCategory":[],"type":"1","idx":4,"images":["","","",""]}],"type":"1","idx":1,"images":["","pwc_drive_wheel.jpg","",""]},{"label":"Rear wheel (used to push)","description":["","","",""],"subCategory":[{"label":"Worn tire (flat spots, insufficient/uneven tread, bald)","description":["","","Problems include tires that do not inflate, have cracks, are bald or significantly worn",""],"subCategory":[],"type":"2","idx":1,"images":["","","mwc_tire.jpg",""]},{"label":"Flat tire (won’t hold air)","description":["","","",""],"subCategory":[],"type":"2","idx":2,"images":["","","",""]},{"label":"Handrim","description":["","","Problems include handrims that are loose from wheel or have sharp edges",""],"subCategory":[],"type":"2","idx":3,"images":["","","mwc_handrim.jpg",""]},{"label":"Bearing","description":["","","",""],"subCategory":[],"type":"2","idx":4,"images":["","","",""]},{"label":"Spoke","description":["","","Problems include spokes that are not uniformly tight or have deep scratches, cracks, or distortions.",""],"subCategory":[],"type":"2","idx":5,"images":["","","mwc_spokes.jpg",""]},{"label":"Axle","description":["","","Problems include axles that do not engage or have excessive play require maintenance or quick release axles that are tight or stuck.",""],"subCategory":[],"type":"2","idx":6,"images":["","","mwc_axle.jpg",""]},{"label":"Quick release mechanism","description":["","","",""],"subCategory":[],"type":"2","idx":7,"images":["","","",""]},{"label":"Alignment (pulls to one side)","description":["","","",""],"subCategory":[],"type":"2","idx":8,"images":["","","",""]},{"label":"I’m not sure/ other","description":["","","",""],"subCategory":[],"type":"2","idx":9,"images":["","","",""]}],"type":"2","idx":2,"images":["","","",""]},{"label":"Casters (smaller wheels)","description":["","Maintenance is needed if caster wheels do not swivel freely. Problems include: loose caps on caster forks, bulges, cracks or flattened areas on caster tires, or misalignment that causes caster to flutter or not spin freely","Problems include casters that do not swivel or spin freely, float, flutter, or have excessive play or stem is not perpendicular to the floor.",""],"subCategory":[{"label":"Fork","description":["","","",""],"subCategory":[],"type":"3","idx":1,"images":["","","",""]},{"label":"Stem","description":["","","",""],"subCategory":[],"type":"3","idx":2,"images":["","","",""]},{"label":"Bearing","description":["","","",""],"subCategory":[],"type":"3","idx":3,"images":["","","",""]},{"label":"Wheel","description":["","","",""],"subCategory":[],"type":"3","idx":4,"images":["","","",""]},{"label":"I’m not sure/other","description":["","","",""],"subCategory":[],"type":"3","idx":5,"images":["","","",""]}],"type":"3","idx":3,"images":["","pwc_caster.jpg","mwc_casters.jpg",""]}],"type":"3","idx":2,"images":["","","",""]},{"label":"Brakes","description":["","The brakes should hold the chair in place. Motors should be disengaged and chair should be able to be manually pushed when these levers are disengaged. Problems include cracked levers, chair that can be driven even with motors disengaged.","Wheel locks should hold wheels firmly. Problems include brakes that do not engage, allow wheel to turn freely when engaged, or interfere with pushing the wheel when not engaged",""],"subCategory":[],"type":"3","idx":3,"images":["","pwc_manual_drive.jpg","mwc_brakes1.jpg",""]},{"label":"Frame","description":["","","Frame should not have rust, sharp edges, or cracks",""],"subCategory":[{"label":"Weld point (where two pieces of the frame come together)","description":["","Problems include rust, cracks, distortions, or sharp edges.","",""],"subCategory":[],"type":"3","idx":1,"images":["","pwc_weld.jpg","",""]},{"label":"Shroud (plastic covering on base)","description":["","Problems include cracks, distortions, or loose shroud.","",""],"subCategory":[],"type":"1","idx":2,"images":["","pwc_shroud.jpg","",""]},{"label":"Chassis (underpart/base of wheelchair)","description":["","Problems include rust, cracks, distortions, or sharp edges.","",""],"subCategory":[],"type":"1","idx":3,"images":["","pwc_chassis.jpg","",""]},{"label":"I’m not sure/other","description":["","","",""],"subCategory":[],"type":"3","idx":4,"images":["","","",""]}],"type":"3","idx":4,"images":["","","mwc_frame.jpg",""]},{"label":"Suspension","description":["","Problems include abnormal sounds when driving over obstacles, anti-tip casters contacting ground and becoming stuck, or wheelchair tipping.","Problems include suspension that has cracks or does not compress when loaded.",""],"subCategory":[],"type":"3","idx":5,"images":["","suspension.jpg","mwc_suspension.jpg",""]},{"label":"Joystick/Controller/Cables","description":["","","",""],"subCategory":[{"label":"Joystick","description":["","Problems include poor seal around joystick, difficulty moving joystick, or loose joystick.","",""],"subCategory":[],"type":"1","idx":1,"images":["","controller_box.png","",""]},{"label":"Control box","description":["","Problems include cracked or broken case of control box","",""],"subCategory":[],"type":"1","idx":2,"images":["","controller_box.png","",""]},{"label":"Control panel (buttons, LED display, indicator lights)","description":["","Problems include inputs not functioning properly.","",""],"subCategory":[],"type":"1","idx":3,"images":["","controller_box.png","",""]},{"label":"Cables, wires or connectors","description":["","Problems include loose or frayed wires, damaged connections to control box or back shroud of chair.","",""],"subCategory":[],"type":"1","idx":4,"images":["","cables.jpg","",""]},{"label":"Charging socket","description":["","Problems include broken or cracked socket, inability to charge chair","",""],"subCategory":[],"type":"1","idx":5,"images":["","charging_socket.jpg","",""]},{"label":"Attendant control","description":["","Problems include inability to drive chair through attendant control, loose fasteners attaching to backrest, or loose cables connecting attendant control to power wheelchair.","",""],"subCategory":[],"type":"1","idx":6,"images":["","attendant_control.jpg","",""]},{"label":"Alignment (veers when joystick pointed straight)","description":["","Problem identified when chair drifts to one side when control and joystick are pointed straight.","",""],"subCategory":[],"type":"1","idx":7,"images":["","","",""]},{"label":"I’m not sure/ other","description":["","","",""],"subCategory":[],"type":"1","idx":8,"images":["","","",""]}],"type":"1","idx":6,"images":["","","",""]},{"label":"Battery","description":["","Problems include needing to charge multiple times during the day, battery not holding charge, or any leaking substance from battery box","",""],"subCategory":[],"type":"1","idx":7,"images":["","","",""]},{"label":"Motors and Gear Boxes","description":["","Problems include grinding or scraping noises while driving or utilizing power seating functions.","",""],"subCategory":[],"type":"1","idx":8,"images":["","","",""]},{"label":"Power Assist element (wheels, e-motion, etc)","description":["","","Problems requiring maintenance include power assist devices that do not hold adequate charge, when the motors scrape or grind, or the controls do not work properly.",""],"subCategory":[],"type":"2","idx":9,"images":["","","paw.jpg",""]},{"label":"Anti-tippers","description":["","","Problems requiring maintenance include anti-tip devices that are cracked, the wheels do not turn, or they do not touch the ground evenly.",""],"subCategory":[],"type":"2","idx":10,"images":["","","mwc_anti_tips.jpg",""]},{"label":"Push handles","description":["","","Problems include push handles that have cracks, sharp edges, or are significantly distorted.",""],"subCategory":[],"type":"2","idx":11,"images":["","","mwc_push_handles.jpg",""]},{"label":"Folding Mechanism","description":["","","Problems occur when the chair does not stay secure when expanded or does not move when attempting to fold.",""],"subCategory":[],"type":"2","idx":12,"images":["","","mwc_folded.png",""]}]';
        return str;
    }
    fetchData() {
        let idx;
        let idx2;
        let idx3;
        let categories = [];
        categories = JSON.parse(this._getCategories());
        // this.userService.getCategories().subscribe(data => {
        //     console.log('---categories---');
        //     console.log(data);
        //     categories = data;
        // }, err => {
        //     console.log(err);
        // });
        this.userService.getRepair(this.userId).subscribe(data => {
            this.repairsRep = data;
            this.repairsRep.sort( function (a, b) {
                if (a.createdAt < b.createdAt) {
                    return 1;
                } else {
                    return -1;
                }
            });
            for (let i = 0; i < data.length ; i++ ) {
                this.repairsRep[i].consequncesArray = JSON.parse(this.repairsRep[i].consequences.toString());
                console.log(this.repairsRep[i].consequncesArray);

                if (this.repairsRep[i].category != null) {
                    idx = parseInt(this.repairsRep[i].category, 10);
                    this.repairsRep[i].category = categories[idx - 1].label;
                }
                if (this.repairsRep[i].subCategory != null) {
                    idx2 = parseInt(this.repairsRep[i].subCategory, 10);
                    console.log('idx ' + idx + 'idx2' + idx2);
                    this.repairsRep[i].subCategory = categories[idx - 1].subCategory[idx2 - 1].label;
                }
                if (this.repairsRep[i].detail != null) {
                    idx3 = parseInt(this.repairsRep[i].detail, 10);
                    console.log(idx3 + 'idx3' + idx2 + 'idx2' + idx);
                    this.repairsRep[i].detail = categories[idx - 1].subCategory[idx2 - 1].subCategory[idx3 - 1].label;
                }

                this.userService.getTracking(this.repairsRep[i].id).subscribe(res => {
                    this.repairsRep[i].hasTracking = true;
                }, error => {
                    console.log(true);
                    this.repairsRep[i].hasTracking = false;
                });
            }
            this._initPage(this.repairsRep);
            this.isShow = false;
        }, error => {
            this.isShow = true;
        });
    }
    getRepair(item) {
        this.repair = item;
    }
    setPage(i) {
        this.page = i;
        this.index1 = i * this.setNum + 1;
        this.index2 = (i + 1) * this.setNum;
        if (this.index2 > this.len) {
            this.index2 = this.len;
        }
        const setNum = this.setNum;
        this.repairs = this.repairsRep.slice(i * setNum, i * setNum + setNum);
    }
    _downloadAll() {
        const end = [{value: 'null'}];
        this.items.forEach(e => {
            e.date = moment(e.date).format('MM-DD-YYYY');
            e.createdAt = moment(e.createdAt).format('MM-DD-YYYY');
            e.modifiedAt = moment(e.modifiedAt).format('MM-DD-YYYY');
            e.dateRepairNeeded = moment(e.dateRepairNeeded).format('MM-DD-YYYY');
            e.dateRepairCompleted = moment(e.dateRepairCompleted).format('MM-DD-YYYY');
            e.consequences = JSON.parse(e.consequences);
        });
        if (this.items.length > 0) {
            const opts = [
                {sheetid: 'RepairData', header: true},
            ];
            const report = alasql('SELECT INTO XLSX("' + this.userId + '_repairs.xlsx",?) FROM ?',
                [opts, [this.items]]);
        }
    }

    getAlldata() {
        this._downloadAll();
    }

    updateSelection(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
            console.log('remove ' + item);
        } else {
            this.items.push(item);
            console.log('add ' + item);
        }
        console.log('items: ');
        console.log(this.items);
    }

    numChange(value) {
        console.log(value);
        this.setNum = value;
        this._initPage(this.repairsRep);
    }

    selectAllboxes() {
        let i;
        this.selectAll = !this.selectAll;
        this.items = [];
        if (this.selectAll) {
            for (i = 0; i < this.repairs.length; i ++) {
                this.updateSelection(this.repairs[i]);
            }
        }
    }

    previous() {
        if (this.page > 0)
            this.setPage(this.page - 1);
    }

    next() {
        if (this.page < this.pmax - 1)
            this.setPage(this.page + 1);
    }

    isActive(page) {
        return this.page === page;
    }
}
