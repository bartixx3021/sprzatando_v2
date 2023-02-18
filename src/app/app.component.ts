import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sprzatando';
  pass = "";
  email = "";
  name = "";
  log = false;
  log_pass = "";
  log_mail = "";

  TestFetch() {
    fetch("http://localhost:8080?action=user").then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
    })
  }

  TestAdd() {
    let objektus = {name : this.name, email : this.email, pass : this.pass};
    let tmp = JSON.stringify(objektus);
    console.log(tmp);
    fetch(`http://localhost:8080?action=user&subact=add&parametry=${tmp}`).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
    })
    this.pass = "";
    this.email = "";
    this.name = "";
  }

  Login() {
    let objektus = {mail: this.log_mail, pass: this.log_pass};
    let tmp = JSON.stringify(objektus);
    console.log(tmp);
    fetch(`http://localhost:8080?action=user&subact=get&parametry=${tmp}`).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
      if (ans.result.length > 0) {
        this.log = true;
      }
    })
  }
}
