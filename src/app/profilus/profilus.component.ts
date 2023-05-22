import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profilus',
  templateUrl: './profilus.component.html',
  styleUrls: ['./profilus.component.css']
})
export class ProfilusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  test1 = {
    desc: "super zrobiłajajajjajajaj",
    ocena: "4",
    wystaw_pic: "assets/login_bg.png"
  }
  test2 = {
    desc: "Piwo",
    ocena: "5",
    wystaw_pic: "assets/pfptest.png"
  }
  test3 = {
    desc: "Ale dobra robota super  wszystko pzodrawiam kolege bardzo suepr ejst!!!!",
    ocena: "1",
    wystaw_pic: "assets/login_bg.png"
  }

  comments = [this.test1,this.test2,this.test3,this.test3,this.test3,this.test3,this.test3,this.test3]
}
