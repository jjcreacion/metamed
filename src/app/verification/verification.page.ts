import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

edit_profile() {
    this.route.navigate(['./edit-profile']);
  } 
}
