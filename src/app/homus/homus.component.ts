import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homus',
  templateUrl: './homus.component.html',
  styleUrls: ['./homus.component.css']
})
export class HomusComponent implements OnInit {

  constructor() { }
  oferty :any[] = [];
  ngOnInit(): void {
    let url = "http://130.162.234.221:8080?action=offer&subact=select&security=ezzz";
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      let x = ans.result.reverse();
      let i = 0;
      while (this.oferty.length < 10 && i < x.length) {
        if (!x[i].is_blocked && x[i].is_active) {
          this.oferty.push(x[i]);
        }
        i++;
      }
      this.Disactivate(x);
    })
  }

  ReadCookie() {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "logged") {
        return value;
      }
    }
    return -1;
  }

  Disactivate(x : any[]) {
    for (let oferta of x) {
      if (new Date(oferta.do_kiedus) < new Date()) {
        let obj :any[]= [["is_active"], [false], [oferta.id]];
        let url = "http://130.162.234.221:8080?action=offer&subact=edit&security=ezzz&parametry=" + JSON.stringify(obj);
        fetch(url).then(stream => stream.json()).then(jsonData => {
          let ans = jsonData;
        });
      }
  }

}

}
