import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-registrus',
  templateUrl: './registrus.component.html',
  styleUrls: ['./registrus.component.css']
})
export class RegistrusComponent implements OnInit {

  constructor(private router : Router) { }
  selector = "Kim ty jesteś straszydle???";
  username = "";
  email = "";
  pass = "";
  passrepeat = "";
  is_offer = false;
  is_search = true;
  users :any[] = [];
  ngOnInit(): void {
    this.GetUsers();
  }

  GetUsers() {
    let url = "http://130.162.234.221:8080?action=user&subact=select&security=ezzz&parametry=" + JSON.stringify({message: "ok"});
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      this.users = ans.result;
    })
  }
  VerifyMail() {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x].email == this.email) {
        return false;
      }
    }
    return true;
  }

  VerifyName() {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x].name == this.username) {
        return false;
      }
    }
    return true;
  }

  CheckForSpecial(x : string) {
    let str = "&/:";
    for (let i = 0; i < str.length; i++) {
      if (x.includes(str[i])) {
        return false;
      }
    }
    return true;
  }
  SendData() {
    if (!this.VerifyName()) {
      alert("Użytkownik o danej nazwie już istnieje");
      return;
    }
    if (!this.VerifyMail()) {
      alert("Email połączony z innym kontem");
      return;
    }
    if (this.username == "" || this.email == "" || this.pass == "" || this.passrepeat == "") {
      alert("Żadne z pól nie może być puste!!!");
      return;
    }
    if (this.pass != this.passrepeat) {
      alert("Źle powtórzone hasło");
    }
    if (this.selector == "Kim ty jesteś straszydle???") {
      alert("wybierz opcjęęęęę zlecenia");
      return;
    }
    if (this.CheckForSpecial(this.username) && this.CheckForSpecial(this.email) && this.CheckForSpecial(this.pass)) {
      switch (this.selector) {
        case "Zleceniobiorca":
          this.is_offer = false;
          this.is_search = true;
          break;
        case "Zleceniodawca":
          this.is_offer = true;
          this.is_search = false;
          break;
        case "Oba":
          this.is_offer = true;
          this.is_search = true;
          break;
        default:
          break;
      }
      let idx = Math.floor(Math.random() * 9);
      let obj = {pass : this.pass, email: this.email, name : this.username, is_offer : this.is_offer, is_search : this.is_search, picid : idx};
      let url = "http://130.162.234.221:8080?action=user&subact=add&security=ezzz&parametry=" + JSON.stringify(obj);
      fetch(url).then(stream => stream.json()).then(jsonData => {
        let ans = jsonData;
        //console.log(ans);
        this.Redirect();
      })
    }

  }
  Redirect() {
    let obj = {pass : this.pass, mail: this.email};
    let url = "http://130.162.234.221:8080?action=user&subact=get&security=ezzz&parametry=" + JSON.stringify(obj);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
      if (ans.result.length > 0) {
        let x = ans.result[0];
        console.log(x);
        let ob = {id : x.id, name: x.name};
        console.log(JSON.stringify(ob));
        document.cookie = `logged=${x.id}`;
        this.router.navigateByUrl( `menus`);
      }
    })
  }
}
