import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

 post_info() {
    this.route.navigate(['./post-info']);
  } 
}
