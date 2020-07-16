import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authUser: boolean;

  constructor(private commonServe: CommonService) { }

  ngOnInit() {
    this.commonServe.$authStatus.subscribe((data: any)=>{
      this.authUser = data;
    });
  }

}
