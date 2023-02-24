import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-loginus',
  templateUrl: './loginus.component.html',
  styleUrls: ['./loginus.component.css']
})
export class LoginusComponent implements OnInit {

  constructor(private router : Router, private cookieService: CookieService) { }

  ngOnInit(): void {
  }
  pass = "";
  em = "";
  Redirect() {
    let obj = {pass : this.pass, mail: this.em};
    let url = "http://130.162.234.221:8080?action=user&subact=get&security=ezzz&parametry=" + JSON.stringify(obj);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
      if (ans.result.length > 0) {
        let x = ans.result[0];
        console.log(x);
        let ob = {id : x.id, name: x.name, img: x.img.replace(":", "AMOGUSSS").replace("/", "ZUS")};
        console.log(JSON.stringify(ob));
        this.router.navigateByUrl( `menus/:${JSON.stringify(ob)}`);
      }
    })
  }
}
