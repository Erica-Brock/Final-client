import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  

  constructor() { }
  
  ngOnInit() {
  }

  openCheckout() {
    const handler =(<any>window).StripeCheckout.configure({
      key: 'pk_test_kesh0o4PTdz0sU8o4fswkxfN',
      locale: 'auto',
      token: function (token: any) {
        console.log(token)
      }
    });

    handler.open({
      name: 'Payment',
      description: '2 widgets',
      amount: 2000
    })
  }

}
