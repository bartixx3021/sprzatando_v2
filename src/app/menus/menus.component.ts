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
      location.reload();
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
      this.router.navigateByUrl( `menus/:${this.new_email}`);
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
      location.reload();
    })
  }



  stronaProfil = true;
  stronaStworzOferta = false;
  stronaMojeOferty = false;
  stronaMojeZglo = false;

  listastron = [this.stronaProfil,this.stronaStworzOferta,this.stronaMojeOferty,this.stronaMojeZglo];
  listaCss = ["jeden","dwa","czy","cztery"]
  last = 0;
  ChangusStrony(ktura: number){
    this.listastron[this.last] = !this.listastron[this.last];
    this.listastron[ktura] = !this.listastron[ktura];
    console.log(this.listaCss[this.last]);
    (<HTMLDivElement>document.getElementById(this.listaCss[this.last])).classList.remove('selec');
    (<HTMLDivElement>document.getElementById(this.listaCss[ktura])).classList.add('selec');
    this.last = ktura;
  }
  

}
