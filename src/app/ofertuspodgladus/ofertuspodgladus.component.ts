import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ofertuspodgladus',
  templateUrl: './ofertuspodgladus.component.html',
  styleUrls: ['./ofertuspodgladus.component.css']
})
export class OfertuspodgladusComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router : Router) { }
  oferty :any[] = [];
  selected :any = {};
  val = false;
  ngOnInit(): void {
    let url = "http://130.162.234.221:8080?action=offer&subact=select&security=ezzz";
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
      this.oferty = ans.result;
      console.log(this.oferty);
      this.route.paramMap.subscribe(params => {
        let id :any = params.get("idus");
        let tmp = JSON.parse(id.replace(id[0], "")).nr;
        //console.log(tmp);
        for (let i of this.oferty) {
          if (tmp == i.id) {
            this.selected = this.oferty[tmp -1];
            break;
          }
        }
        console.log(this.selected);
      });
    })
    if (this.ReadCookie() != "-1") {
      this.val = true;
      let v = this.ReadCookie();

    }
  }
  Klikus() {
    if (this.val) {
      console.log("Zgłosił się");
    } else {
      this.router.navigateByUrl("/loginus");
    }
  }
  ReadCookie() {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "logged") {
        return value;
      }
    }
    return "-1";
  }

}
