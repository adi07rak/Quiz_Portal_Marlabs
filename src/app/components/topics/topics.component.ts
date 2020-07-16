import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  technologies: any = [];

  constructor(private comServe: CommonService) { }

  ngOnInit() {
    // this.comServe.getAllTechnology().subscribe((res: any) => {
    //   console.log('response:::', res);
    //   if (res) {
    //     this.technologies = res;
    //   }
    // }, (error: any) => {
    //   console.log('error:::', error);
    // }, () => {
    //   console.log('Complete:::');
    // });
  }

  onchangeTechnology($event?: any) {
    console.log(':::', $event);
  }

}
