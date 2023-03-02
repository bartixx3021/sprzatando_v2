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
  ngOnInit(): void {
    //console.log(id.replace(":", ""));
    //this.data = JSON.parse(this.ImageSorter(id.replace(":", "")));
    /**
    console.log(this.data);
    this.data.img = this.ImageSorter(this.data.img);
    this.image = this.data.img;
    */
    this.GetUsers();
  }

  FindUser(mail : string) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email == mail) {
        return this.users[i];
      }
    }
  }
  CreatePass(ln : Number) {
    this.pazz = "";
    for (let i = 0; i < ln; i++) {
      this.pazz += "*";
    }
  }
  GetUsers() {
    let url = "http://130.162.234.221:8080?action=user&subact=select&security=ezzz&parametry=" + JSON.stringify({message: "ok"});
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      //console.log(ans);
      this.users = ans.result;
      //console.log(this.users);
      let id : any  = this.route.snapshot.paramMap.get('datus')?.toString();
      //console.log(id.replace(":", ""));
      this.selected = this.FindUser(id.replace(":", ""));
      //console.log(this.selected);
      this.image = this.selected.img;
      this.CreatePass(this.selected.pass.length);
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
      console.log(ans);
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
      console.log(ans);
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
      console.log(ans);
      this.router.navigateByUrl( `menus/:${this.selected.email}`);
    })
  }


  // Jak będziesz zmieniał se tu to odrazu "last" zmień na odpowiadający indeks pozdro 600
  stronaProfil = true; //0
  stronaStworzOferta = false; //1
  stronaMojeOferty = false; //2
  stronaMojeZglo = false; //3

  last = 0;

  listastron = [this.stronaProfil,this.stronaStworzOferta,this.stronaMojeOferty,this.stronaMojeZglo];
  listaCss = ["jeden","dwa","czy","cztery"]
  ChangusStrony(ktura: number){
    this.listastron[this.last] = !this.listastron[this.last];
    this.listastron[ktura] = !this.listastron[ktura];
    console.log(this.listaCss[this.last]);
    (<HTMLDivElement>document.getElementById(this.listaCss[this.last])).classList.remove('selec');
    (<HTMLDivElement>document.getElementById(this.listaCss[ktura])).classList.add('selec');
    this.last = ktura;
  }
  
  // TWORZENIE OFERT
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
  VerifyValue(value :string) {
    let s = "<>{}[]()\"';\\=+-_^&|*^%$#@`~";
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
    let selected_typ = this.typy[Number(this.typid)];
    this.creator = this.selected.id;
    console.log(this.creator);

    if (this.nazwa == "" || this.creator == 0 || this.miejsce == "" || this.stawka == "" || this.opisus == "" || this.od_kiedy == "" || this.do_kiedy == "") {
        alert("Żadne z pól nie może być puste. Za wyjątkiem zdjęcia");
        return;
    }
    if (this.typid == "") {
      alert("Wybierz jeden typ");
      return;
    }
    if (!this.VerifyValue(this.nazwa) || !this.VerifyValue(this.miejsce) || !this.VerifyValue(this.opisus) || this.VerifyPic(this.picurl)) {
      alert("Zabrania się używania znaków specjalnych za wyjątkiem: . , : ? ! /");
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
    console.log(do_str);
    
    let obj = {nazwa : this.nazwa, creator : this.creator , location : this.miejsce,opisus : this.opisus, stawka : this.stawka, od : od_str, do : do_str, typus: selected_typ, picurl : this.picurl};
    let url = "http://130.162.234.221:8080?action=offer&subact=add&security=ezzz&parametry=" + JSON.stringify(obj);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
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
      this.router.navigateByUrl( `menus/:${this.selected.email}`);
    })
    
  }

  AddusPicus() {
    let value = prompt("Podaj url zdjęcia:   ");
    this.picurl = String(value);
    this.stylus = `{'backgroud-image' : '${this.picurl}'}`;
  }
}
