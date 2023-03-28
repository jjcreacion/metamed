import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-buyappalert',
  templateUrl: './buyappalert.page.html',
  styleUrls: ['./buyappalert.page.scss'],
})
export class BuyappalertPage implements OnInit {

  constructor(private modalController: ModalController, private http: HttpClient) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }
  buyappalert() {
    this.modalController.dismiss();   
    window.open("http://bit.ly/cc2_qvid", '_system', 'location=no');
  }
  navWhatsapp() {
    let projectName = "qvid";
    this.http.get<any>("https://dashboard.vtlabs.dev/whatsapp.php?product_name=" + projectName + "&source=ionic_template", {
      headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' })
    }).subscribe(res => {
      window.open(res['link'], '_system', 'location=no');
    }, err => { });

    this.dismiss();
  }
}
