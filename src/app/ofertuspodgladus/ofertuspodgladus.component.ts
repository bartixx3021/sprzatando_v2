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
            this.edited_title = this.selected.nazwa;
            this.edited_date = this.selected.od_kiedus;
            this.edited_datus = this.selected.do_kiedus;
            this.edited_localization = this.selected.location;
            this.edited_salary = this.selected.stawka;
            this.edited_description = this.selected.opisus;
            this.edited_url = this.selected.img;
            break;
          }
        }
        console.log(this.selected);
      });
      this.Checkus();
      if (this.ReadCookie() == this.selected.creator_id) {
        this.con = false;
      }
      this.condition_zglos = JSON.parse(this.selected.volunteer).includes(this.ReadCookie());
      this.SetUp();
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
      if (this.users[i].id == Number(mail)) {
        console.log(this.users[i]);
        return this.users[i];
      }
    }
  }
  condition_zglos = false;
  Klikus() {
    if (this.val) {
      console.log("Zgłosił się");
      let lista = JSON.parse(this.selected.volunteer);
      let user_id = this.ReadCookie();
      if (!this.condition_zglos) {
        lista.push(user_id);
      } else {
        lista.splice(lista.indexOf(user_id), 1);
      }
      let query = [["volunteer"],[JSON.stringify(lista)],this.selected.id];
      console.log(JSON.stringify(query));
      
      let url = "http://130.162.234.221:8080?action=offer&subact=edit&security=ezzz&parametry=" + JSON.stringify(query);
      fetch(url).then(stream => stream.json()).then(jsonData => {
        let ans = jsonData;
        console.log(ans);
        this.GetOffer();
        this.Checkus();
        this.router.navigateByUrl("/ofertus")
      });
      
    } else {
      this.router.navigateByUrl("/loginus");
    }
  }
  
  vols :any[] = [];
  SetUp() {
    let tmp = JSON.parse(this.selected.volunteer);
    for (let element of tmp) {
      this.vols.push(this.FindUser(element));
    }
    console.log(this.vols);
  }
  Clear_volunteer() {
    let lista :any[] = [];
    let query = [["volunteer"],[JSON.stringify(lista)],this.selected.id];
    console.log(JSON.stringify(query));
    
    let url = "http://130.162.234.221:8080?action=offer&subact=edit&security=ezzz&parametry=" + JSON.stringify(query);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
      this.router.navigateByUrl("/ofertus");
    });
  }

  Choose(idx : number) {
    let query = [["chosen"],[idx],this.selected.id];
    console.log(JSON.stringify(query));
    
    let url = "http://130.162.234.221:8080?action=offer&subact=edit&security=ezzz&parametry=" + JSON.stringify(query);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
      this.Clear_volunteer();
    });
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




  edited_title = "";
  edited_date = "";
  edited_datus = "";
  edited_localization = "";
  edited_salary = 0;
  edited_description = "";
  edited_url :any = "";

  Editus_ogloszenius() {
    let odod = new Date(this.edited_date);
    let dodo = new Date(this.edited_datus);
    let od_str = `${odod.getFullYear()}-${odod.getMonth() +1}-${odod.getDate()}`;
    let do_str = `${dodo.getFullYear()}-${dodo.getMonth() +1}-${dodo.getDate()}`;

    // USTAW DATE ROZPOCZĘCIA

    if ((odod.getMonth() +1).toString().length < 2 && (odod.getDate()).toString().length < 2) {
      od_str = `${odod.getFullYear()}-0${odod.getMonth() +1}-0${odod.getDate()}`;
      
    } else if ((odod.getMonth() +1).toString().length < 2) {
      od_str = `${odod.getFullYear()}-0${odod.getMonth() +1}-${odod.getDate()}`;
      
    } else if ((odod.getDate()).toString().length < 2) {
      od_str = `${odod.getFullYear()}-${odod.getMonth() +1}-0${odod.getDate()}`
    }

    //USTAW DATE ZAKONCZENIA

    if ((dodo.getMonth() +1).toString().length < 2 && (dodo.getDate()).toString().length < 2) {
      do_str = `${dodo.getFullYear()}-0${dodo.getMonth() +1}-0${dodo.getDate()}`;
      
    } else if ((dodo.getMonth() +1).toString().length < 2) {
      do_str = `${dodo.getFullYear()}-0${dodo.getMonth() +1}-${dodo.getDate()}`;
      
    } else if ((dodo.getDate()).toString().length < 2) {
      do_str = `${dodo.getFullYear()}-${dodo.getMonth() +1}-0${dodo.getDate()}`
    }
    console.log(do_str);
    let query = [["nazwa", "location", "stawka", "opisus", "od_kiedus", "do_kiedus", "img"],[this.edited_title, this.edited_localization, this.edited_salary, this.edited_description, od_str, do_str, this.edited_url],this.selected.id];
    console.log(JSON.stringify(query));
    let url = "http://130.162.234.221:8080?action=offer&subact=edit&security=ezzz&parametry=" + JSON.stringify(query);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
      //this.router.navigateByUrl("ofertus")
      //this.Clear_volunteer();
    });
  }
  ChgPhoto() {
    this.edited_url = prompt("Podaj url nowego zdjęcia: ");
  }
  changusEdytus(){
    this.edytus = !this.edytus
    this.Editus_ogloszenius();
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

  report_widoczny = true;
  Report(idx : number) {
    let obj :any[]= [["is_reported_speech"], [true], [idx]];
    let url = "http://130.162.234.221:8080?action=offer&subact=edit&security=ezzz&parametry=" + JSON.stringify(obj);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
      this.router.navigateByUrl( `ofertus/`);
    })
  }

  Banuj(id : number) {
    if (id == 0) {
      let obj :any[]= [["is_blocked"], [true], [this.selected.id]];
    let url = "http://130.162.234.221:8080?action=offer&subact=edit&security=ezzz&parametry=" + JSON.stringify(obj);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
      this.router.navigateByUrl( `ofertus/`);
    })
    } else {
      let obj :any[]= [["is_blocked"], [false], [this.selected.id]];
      let url = "http://130.162.234.221:8080?action=offer&subact=edit&security=ezzz&parametry=" + JSON.stringify(obj);
      fetch(url).then(stream => stream.json()).then(jsonData => {
        let ans = jsonData;
        console.log(ans);
        this.router.navigateByUrl( `ofertus/`);
    })
    }
  }
}
