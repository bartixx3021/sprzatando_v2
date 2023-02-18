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
  logged = {name: "", email: "", id : 0, is_admin : false};
  edit_n = "";
  edit_e = "";
  bannedID = 0;

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
        this.logged = ans.result[0];
        console.log(this.logged);
      }
    })
  }

  Edit(val : string) {
    let tmp = [];
    if (val == "name") {
      tmp = [["name"], [this.edit_n], [this.logged.id]];
    } else {
      tmp = [["email"], [this.edit_e], [this.logged.id]];
    }
    let tmpp = JSON.stringify(tmp);
    fetch(`http://localhost:8080?action=user&subact=modify&parametry=${tmpp}`).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
    })
  }

  Ban() {
    let tmp = [["is_banned"], [true], [this.bannedID]];
    let tmpp = JSON.stringify(tmp);
    fetch(`http://localhost:8080?action=user&subact=modify&parametry=${tmpp}`).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
    })
  }
}
