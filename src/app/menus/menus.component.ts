import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  image = "";
  data = {img : ""};
  users :any[] = [];
  selected :any = {};
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
  LoginusZapisus(){
    this.EdytusLoginus = false;
  }


  EmailusEditus(){
    this.EdytusEmailus = true;
  }
  EmailusZapisus(){
    this.EdytusEmailus = false;
  }


  HaslusEditus(){
    this.EdytusHaslus = true;
  }
  HaslusZapisus(){
    this.EdytusHaslus = false;
  }

  

}
