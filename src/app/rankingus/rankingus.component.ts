import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rankingus',
  templateUrl: './rankingus.component.html',
  styleUrls: ['./rankingus.component.css']
})
export class RankingusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let url = "http://130.162.234.221:8080?action=offer&subact=select&security=ezzz";
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      this.oferty = ans.result;
      this.GetUsers();
    });
  }
  oferty :any[] = []
  users :any[] = [];
  selected_user = [];
  GetUsers() {
    let url = "http://130.162.234.221:8080?action=user&subact=select&security=ezzz&parametry=" + JSON.stringify({message: "ok"});
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      this.users = ans.result;
      this.Rated();
      this.Topka();
    })
  }
  Rated() {
    for (let user of this.users) {
      if (user.comments != "[]" && user.comments != "") {
          let cuma = 0;
          for (let ocena of JSON.parse(user.comments)) {
            cuma += ocena.rate;
          }
          user.rate = cuma / JSON.parse(user.comments).length;
          this.top.push(user);
      } else {
        user.rate = 0;
        user.ostatniuszlecenius = [];
      }
    }
  }
  top : any[] = [];
  Topka() {
    
    for (let i = 0; i < this.top.length; i++) {
      for (let j = 0; j < this.top.length; j++) {
        if (this.top[i].rate < this.top[j].rate) {
          let t = this.top[i];
          this.top[i] = this.top[j];
          this.top[j] = t;
        }
      }
    }
    this.top.reverse();
    this.top.splice(5);
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
