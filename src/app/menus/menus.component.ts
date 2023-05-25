import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router : Router) { }

  image = "";
  data = {img : ""};
  users :any[] = [];
  selected :any = {};
  pazz = "";
  displayed :any[] = [];
  cookz = false;
  rep_speech :any[] = [];
  ngOnInit(): void {
    let url = "http://130.162.234.221:8080?action=offer&subact=select&security=ezzz";
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      this.displayed = ans.result.reverse();
      this.Zgloszone();
      this.ActiveList();
      this.ExpiredList();
      this.BannedList();
      this.FinishedList();
    })
    this.GetUsers();
  }
  Zgloszone() {
    this.rep_speech = [];
    for (let i = 0; i < this.displayed.length; i++) {
      if (this.displayed[i].is_reported_speech && !this.displayed[i].is_blocked) {
        this.rep_speech.push(this.displayed[i]);
      }
    }
  }
  Banowanie(idx: number) {
    let obj :any[]= [["is_blocked"], [true], [this.rep_speech[idx].id]];
    let url = "http://130.162.234.221:8080?action=offer&subact=edit&security=ezzz&parametry=" + JSON.stringify(obj);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      this.router.navigateByUrl("#")
    });
  }
  Okej(idx : number) {
    let obj :any[]= [["is_reported_speech"], [false], [this.rep_speech[idx].id]];
    let url = "http://130.162.234.221:8080?action=offer&subact=edit&security=ezzz&parametry=" + JSON.stringify(obj);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      this.router.navigateByUrl("#")
    });
  }

  FindUser(mail : string) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == mail) {
        return this.users[i];
      }
    }
  }
  CreatePass(ln : number) {
    this.pazz = "";
    for (let i = 0; i < ln; i++) {
      this.pazz += "*";
    }
  }
  ReadCookie() {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "logged") {
        this.cookz = true;
        return value;
      }
    }
    return "-1";
  }
  Destroy() {
    document.cookie = "logged=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  GetUsers() {
    let url = "http://130.162.234.221:8080?action=user&subact=select&security=ezzz&parametry=" + JSON.stringify({message: "ok"});
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      this.users = ans.result;
      let id : any  = this.ReadCookie();
      this.selected = this.FindUser(id);
      this.image = this.selected.img;
      this.CreatePass(this.selected.pass.length);
      this.GetOffer();
    })
  }

  
  ImageSorter(iput : string) {
    let input = iput.replace("DWUKROPER", ":");
    while (input.includes("SLASH") || input.includes("DWUKROPEK")) {
      input = input.replace("SLASH", "/").replace("DWUKROPEK", ":");
    }
    return input;
  }




  

  isZleceniodawca = true;
  isZleceniobiorca = true;





  EdytusLoginus = false;
  EdytusEmailus = false;
  EdytusHaslus = false;

  LoginusEditus(){
    this.EdytusLoginus = true;
  }
  new_login = "";
  LoginusVerificus() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].name == this.new_login) {
        return false;
      }
    }
    return true;
  }
  LoginusZapisus(){
    if (!this.LoginusVerificus()) {
      alert("Użytkownik o podanej nazwie istnieje !!!");
      return;
    }
    this.EdytusLoginus = false;
    let obj :any[]= [["name"], [this.new_login], [this.selected.id]];
    let url = "http://130.162.234.221:8080?action=user&subact=modify&security=ezzz&parametry=" + JSON.stringify(obj);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      this.router.navigateByUrl( `menus/:${this.selected.email}`);
    })
  }

  new_email = "";
  EmailusVerificus() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email == this.new_email) {
        return false;
      }
    }
    return true;
  }
  EmailusEditus(){
    this.EdytusEmailus = true;
    
  }
  EmailusZapisus(){
    if (!this.EmailusVerificus()) {
      alert("Email powiązany z innym kontem!!!");
      return;
    }
    this.EdytusEmailus = false;
    let obj :any[]= [["email"], [this.new_email], [this.selected.id]];
    let url = "http://130.162.234.221:8080?action=user&subact=modify&security=ezzz&parametry=" + JSON.stringify(obj);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      this.router.navigateByUrl( `loginus`);
    })
  }


  HaslusEditus(){
    this.EdytusHaslus = true;
  }
  new_pass = "";
  HaslusZapisus(){
    this.EdytusHaslus = false;
    let obj :any[]= [["pass"], [this.new_pass], [this.selected.id]];
    let url = "http://130.162.234.221:8080?action=user&subact=modify&security=ezzz&parametry=" + JSON.stringify(obj);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      this.router.navigateByUrl( `menus/:${this.selected.email}`);
    })
  }


  // Jak będziesz zmieniał se tu to odrazu "last" zmień na odpowiadający indeks pozdro 600
  stronaProfil = true; //0
  stronaStworzOferta = false; //1
  stronaMojeOferty = false; //2
  stronaMojeZglo = false; //3
  stronaAdminus = false; //4

  last = 0;

  listastron = [this.stronaProfil,this.stronaStworzOferta,this.stronaMojeOferty,this.stronaMojeZglo, this.stronaAdminus];
  listaCss = ["jeden","dwa","czy","cztery", "pinc"]
  ChangusStrony(ktura: number){
    this.listastron[this.last] = !this.listastron[this.last];
    this.listastron[ktura] = !this.listastron[ktura];
    (<HTMLDivElement>document.getElementById(this.listaCss[this.last])).classList.remove('selec');
    (<HTMLDivElement>document.getElementById(this.listaCss[ktura])).classList.add('selec');
    this.last = ktura;
  }
  

  // WYŚWIETL MOJE ZGŁOSZENIA
  oferty :any[] = [];
  pendinglist :any[] = [];
  GetOffer() {
    let url = "http://130.162.234.221:8080?action=offer&subact=select&security=ezzz";
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      this.oferty = ans.result;
      this.PendingSearch();
      this.ChosenSearch();
    })
  }
  PendingSearch() {
    for (let oferta of this.oferty) {
      let lista = JSON.parse(oferta.volunteer);
      if (lista.includes(this.selected.id.toString())) {
        this.pendinglist.push(oferta);
      }
    }
  }
  chosenlist :any[] = [];
  ChosenSearch() {
    for (let oferta of this.oferty) {
      let lista = oferta.chosen;
      if (Number(lista) == this.selected.id) {
        this.chosenlist.push(oferta);
      }
    }
  }

  // TWORZENIE OFERT
  dzis = new Date();
  nazwa = "";
  creator = this.selected.id;
  miejsce = "";
  stawka = "";
  opisus = "";
  od_kiedy = "";
  do_kiedy = "";
  typid = "";
  picurl = "";
  stylus = `{}`;
  typy = ["Wywóz Śmieci", "Sprzątanie mieszkania", "Mycie Auta", "coś tam", "Ciukuluku", ""];

  tmpTypidArray: string[] = []
  
  createTypid(event:any){
    if(event.target.checked){
      this.tmpTypidArray.push(this.typy[Number(event.target.value)])
    }
    else{
      this.tmpTypidArray.splice(this.tmpTypidArray.indexOf(this.typy[Number(event.target.value)]),1)
    }
    this.typid = JSON.stringify(this.tmpTypidArray)
  }

  

  VerifyValue(value :string) {
    let s = "<>{}[]()\"';\\=+_^&|*^%$#@`~";
    for (let char of s) {
      if (value.includes(char)) {
        return false;
      }
    }
    return true;
  }
  VerifyPic(value :string) {
    let s = "<>{}[]()\"'\\";
    for (let char of s) {
      if (value.includes(char)) {
        return false;
      }
    }
    return true;
  }
  AddusOfferus() {
    let selected_typ = this.typid;
    this.creator = this.selected.id;

    if (this.nazwa == "" || this.creator == 0 || this.miejsce == "" || this.stawka == "" || this.opisus == "" || this.od_kiedy == "" || this.do_kiedy == "") {
        alert("Żadne z pól nie może być puste. Za wyjątkiem zdjęcia");
        return;
    }
    if (this.typid == "") {
      alert("Wybierz jeden typ");
      return;
    }

    let odod = new Date(this.od_kiedy);
    let dodo = new Date(this.do_kiedy);
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
    
    let obj = {nazwa : this.nazwa, creator : this.creator , location : this.miejsce,opisus : this.opisus, stawka : this.stawka, od : od_str, do : do_str, typus: selected_typ, picurl : this.picurl};
    let url = "http://130.162.234.221:8080?action=offer&subact=add&security=ezzz&parametry=" + JSON.stringify(obj);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      this.nazwa = "";
      this.creator = this.selected.id;
      this.miejsce = "";
      this.stawka = "";
      this.opisus = "";
      this.od_kiedy = "";
      this.do_kiedy = "";
      this.typid = "";
      this.picurl = "";
      this.stylus = `{}`;
      this.ChangusStrony(0);
      this.router.navigateByUrl( `menus/`);
    })
    
  }

  AddusPicus() {
    let value = prompt("Podaj url zdjęcia:   ");
    this.picurl = String(value);
    this.stylus = `{'backgroud-image' : '${this.picurl}'}`;
  }

  showusZgloszonus = false
  showusZbanowanus = false
  showusListus = false;
  showusRankingus = false;

  chagnusShowus(id: number){
    if (id == 0) {
      this.showusZgloszonus = !this.showusZgloszonus;
    } else if (id == 1) {
      this.showusZbanowanus = !this.showusZbanowanus;
    } else if (id == 2) {
      this.showusListus = !this.showusListus;
    } else if (id == 3) {
      this.showusRankingus =  !this.showusRankingus;
      this.Ratings();
    }
  }
  Odbanuj(idx : number) {
    let obj :any[]= [["is_blocked"], [false], this.displayed[idx].id];
      let url = "http://130.162.234.221:8080?action=offer&subact=edit&security=ezzz&parametry=" + JSON.stringify(obj);
      fetch(url).then(stream => stream.json()).then(jsonData => {
        let ans = jsonData;
        let url = "http://130.162.234.221:8080?action=offer&subact=select&security=ezzz";
        fetch(url).then(stream => stream.json()).then(jsonData => {
          let ans = jsonData;
          this.displayed = ans.result.reverse();
          this.Zgloszone();
          });
        });
    } 
    Ratez(user :any) {
      let comm = JSON.parse(user.comments);
      let s = 0;
      for (let c of comm) {
        s += c.rate;
      }
      return s / comm.length;
    }
    rates :any[] = [];
    Ratings() {
      this.rates = [];
      for (let us of this.users) {
          us.offer_ct = 0;
          if (us.comments != "") {
            let comm = JSON.parse(us.comments);
            let s = 0;
            for (let c of comm) {
              s += c.rate;
            }
            us.rate = s / comm.length;
            us.offer_ct = comm.length;
            if (us.rate < 3 && us.rate != 0) {
              this.rates.push(us);
            }
          }
      } 
    }

    Banuj(idx :number) {
      let obj :any[]= [["is_blocked"], [true], [this.rates[idx].id]];
      let url = "http://130.162.234.221:8080?action=user&subact=modify&security=ezzz&parametry=" + JSON.stringify(obj);
      fetch(url).then(stream => stream.json()).then(jsonData => {
        let ans = jsonData;
        let d = new Date();
        let futureDate = new Date(d.getTime() + (14 * 24 * 60 * 60 * 1000));
        let out = `${futureDate.getFullYear()}-${futureDate.getMonth() + 1}-${futureDate.getDate()}`
        let obj2 :any[]= [["how_long"], [out], [this.rates[idx].id]];
        let url2 = "http://130.162.234.221:8080?action=user&subact=modify&security=ezzz&parametry=" + JSON.stringify(obj2);
        fetch(url2).then(stream => stream.json()).then(jsonData => {
          let ans = jsonData;
          this.rates.splice(idx, 1);
        });
        
    })
    }

    search = "nazwie użytkownika";
    searchword = "";
    results :any[] = [];
    Searcher() {
      this.results = [];
      for (let user of this.users) {
        if (this.search == "id") {
          if (user.id == this.searchword) {
            if (user.comments == "[]" || user.comments == "") {
              user.rate = 0;
            } else {
              let comm = JSON.parse(user.comments);
              let s = 0;
              for (let c of comm) {
                s += c.rate;
              }
              user.rate = s / comm.length;
              user.offer_ct = comm.length;
            }
            this.results.push(user);
          }
        } else {
          if (user.name.includes(this.searchword)) {
            if (user.comments == "[]" || user.comments == "") {
              user.rate = 0;
            } else {
              let comm = JSON.parse(user.comments);
              let s = 0;
              for (let c of comm) {
                s += c.rate;
              }
              user.rate = s / comm.length;
              user.offer_ct = comm.length;
            }
            this.results.push(user);
          }
        }
      }
      if (this.searchword == "") {
        this.results = this.users;
      }
    }


  active :any[] = [];
  ActiveList() {
    for (let element of this.displayed) {
      if (element.is_active && element.creator_id == this.ReadCookie() && !element.is_blocked) {
        this.active.push(element);
      }
    }
  }
  expired : any[] = [];
  ExpiredList() {
    for (let element of this.displayed) {
      if (!element.is_active && element.creator_id == this.ReadCookie() && element.chosen == -1) {
        this.expired.push(element);
      }
    }
  }

  finished :any[] = [];
  FinishedList() {
    for (let element of this.displayed) {
      if (!element.is_active && element.creator_id == this.ReadCookie() && element.chosen != -1) {
        this.finished.push(element);
      }
    }
  }

  banned :any[] = [];
  BannedList() {
    for (let element of this.displayed) {
      if (element.is_active && element.creator_id == this.ReadCookie() && element.is_blocked) {
        this.banned.push(element);
      }
    }
  }



  ocena = "";
  komentarz = "";
  Rate(i :number) {
    let objx = this.active[i];
    let comm = JSON.parse(this.FindUser(objx.chosen).comments);
    comm.push({rate: this.ocena, comment: this.komentarz, offer_id: objx.id});
    let obj :any[]= [["comments"], [JSON.stringify(comm)], [objx.chosen]];
    let url = "http://130.162.234.221:8080?action=user&subact=modify&security=ezzz&parametry=" + JSON.stringify(obj);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      let obj :any[]= [["is_active"], [false], [objx.id]];
      let url = "http://130.162.234.221:8080?action=offer&subact=edit&security=ezzz&parametry=" + JSON.stringify(obj);
      fetch(url).then(stream => stream.json()).then(jsonData => {
        let ans = jsonData;
        this.finished.push(this.active[i]);
        this.active.splice(i, 1);
    })
  });
  }


  Goto(i : number) {
    let x = this.active[i];
    let obj = JSON.stringify({nr :x.id})
    this.router.navigateByUrl(`ofertuspodgladus/:${obj}`);
  }

  testowyOczek = {
    img: "assets/login_bg.png",
    nazwa: "Testowe Ogłoszenie",
    location: "Piwnica starego",
    stawka: 12,
    opisus: "Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P Bartłomiej P",
    do_kiedus: "jutro"
  }
  pedilist = [this.testowyOczek,this.testowyOczek,this.testowyOczek,this.testowyOczek,this.testowyOczek,this.testowyOczek,this.testowyOczek,]
}
