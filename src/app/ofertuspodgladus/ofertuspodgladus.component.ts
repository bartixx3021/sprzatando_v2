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
  condition = false;
  con = true;
  ngOnInit(): void {
    this.GetUsers();
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
      this.Checkus();
      if (this.ReadCookie() == this.selected.creator_id) {
        this.con = false;
      }
      
    })
    if (this.ReadCookie() != "-1") {
      this.val = true;
      let v = this.ReadCookie();

    }
  }
  Checkus() {
    let lista = JSON.parse(this.selected.volunteer);
    if (lista.includes(this.ReadCookie().toString())) {
      this.condition = true;
    } else {
      this.condition = false;
    }
  }

  users :any[] = [];
  selected_user = [];
  GetUsers() {
    let url = "http://130.162.234.221:8080?action=user&subact=select&security=ezzz&parametry=" + JSON.stringify({message: "ok"});
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      //console.log(ans);
      this.users = ans.result;
    })
  }
  FindUser(mail : string) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == mail) {
        console.log(this.users[i]);
        return this.users[i];
      }
    }
  }
  Klikus() {
    if (this.val) {
      console.log("Zgłosił się");
      let lista = JSON.parse(this.selected.volunteer);
      let user_id = this.ReadCookie();
      lista.push(user_id);
      let query = [["volunteer"],[JSON.stringify(lista)],this.selected.id];
      console.log(JSON.stringify(query));
      
      let url = "http://130.162.234.221:8080?action=offer&subact=edit&security=ezzz&parametry=" + JSON.stringify(query);
      fetch(url).then(stream => stream.json()).then(jsonData => {
        let ans = jsonData;
        console.log(ans);
        this.GetOffer();
        this.Checkus();
      });
      
    } else {
      this.router.navigateByUrl("/loginus");
    }
  }

  GetOffer() {
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
  


  przykladus = {
    tytulus: "Grzesio",
    creatus: "Pukasus Grzegosus",
    datus: "10/04/2023",
    lokalizacjus: "Opolus Piwnicus",
    stawkus: "Darmo/h",
    opisus: "Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P",
    obrazus: "assets/login_bg.png"
  }

  profilus = {
    imgus: "assets/login_bg.png",
    imienius: "GrzesioPL 2137",
    gwiazdkus: 4.32,
    idkus: 12
  }
  profilus2 = {
    imgus: "assets/pfptest.png",
    imienius: "Siusiak 420",
    gwiazdkus: 21.37,
    idkus: 13
  }

  arrajus = [this.profilus,this.profilus2]  
  

  // Masz tu do patrzenia roznych widoków

  isCreatus = true
  isZalogowanus = true
  isAdminus = false

  edytus = false




  edited_title = this.przykladus.tytulus
  edited_date = this.przykladus.datus
  edited_localization = this.przykladus.lokalizacjus
  edited_salary = this.przykladus.stawkus
  edited_description = this.przykladus.opisus

  changusEdytus(){
    this.edytus = !this.edytus
  }

  
  isWybranus = false
  wybranus: any


  showProfilus(index:number){
    console.log(index)
    this.isWybranus = true
    this.wybranus = this.arrajus[index]
  }

  closeProfilus(){
    this.isWybranus = false;
  }
}
