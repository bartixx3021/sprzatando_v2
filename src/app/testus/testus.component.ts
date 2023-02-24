import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testus',
  templateUrl: './testus.component.html',
  styleUrls: ['./testus.component.css']
})
export class TestusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  pass = "";
  em = "";
  name = "";

  Create() {
    let obj = {pass : this.pass, email: this.em, name : this.name};
    let url = "http://130.162.234.221:8080?action=user&subact=add&security=ezzz&parametry=" + JSON.stringify(obj);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
    })
  }

}
