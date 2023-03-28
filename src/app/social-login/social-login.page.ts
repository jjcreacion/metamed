import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.page.html',
  styleUrls: ['./social-login.page.scss'],
})
export class SocialLoginPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

verification() {
    this.route.navigate(['./verification']);
  } 
}
