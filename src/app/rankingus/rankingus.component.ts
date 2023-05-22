import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rankingus',
  templateUrl: './rankingus.component.html',
  styleUrls: ['./rankingus.component.css']
})
export class RankingusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  test1 = {
    name: "Grzegorz Pukas",
    pfp: "assets/login_bg.png",
    average: "4.32"
  }
  test2 = {
    name: "Grzegorz Płuska",
    pfp: "assets/login_bg.png",
    average: "21.37"
  }
  test3 = {
    name: "Grzegorz Kasperkiewicz",
    pfp: "assets/login_bg.png",
    average: "69.420"
  }
  leaderboard = [this.test1,this.test2,this.test3]


}
