import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs';

@Component({
  selector: 'app-ofertus',
  templateUrl: './ofertus.component.html',
  styleUrls: ['./ofertus.component.css']
})
export class OfertusComponent implements OnInit {

  constructor() { }
  oferty: any = []
  testUs = {
    tytul: "Sporzntako",
    miasto: "Afrika",
    wynagrodzenie: "10",
    opis: "Potrzebuje kogoś do sprzątania polskiego cmenatrza we wiosce śnieżynek",
    dokiedy: "1.09.1939",
    pfp: "assets/pfptest.png",
    id_oferty: 1
  }
  testUs2 = {
    tytul: "AMONGUS",
    miasto: "STACJA KOSMICZNA",
    wynagrodzenie: "2137",
    opis: "IMPOSTOR IS AMONGUS!!!!!!!!!!!!",
    dokiedy: "NOW!!!!!!!",
    pfp: "assets/amongus.png",
    id_oferty: 2
  }
  ngOnInit(): void {
    this.oferty.push(this.testUs)
    this.oferty.push(this.testUs2)
    this.oferty.push(this.testUs)
    this.oferty.push(this.testUs2)
    this.oferty.push(this.testUs)
    this.oferty.push(this.testUs2)
    this.oferty.push(this.testUs)
    this.oferty.push(this.testUs2)
    

  }
}
