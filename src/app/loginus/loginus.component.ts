import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loginus',
  templateUrl: './loginus.component.html',
  styleUrls: ['./loginus.component.css']
})
export class LoginusComponent implements OnInit {

  constructor(private router : Router ) { }

  ngOnInit(): void {
  }
  pass = "";
  em = "";
  Redirect() {
    let obj = {pass : this.pass, mail: this.em};
    let url = "http://130.162.234.221:8080?action=user&subact=get&parametry=" + JSON.stringify(obj);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
      if (ans.result.length > 0) {
        this.router.navigateByUrl('/testus');
      }
    })
  }
}
