import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loginus',
  templateUrl: './loginus.component.html',
  styleUrls: ['./loginus.component.css']
})
export class LoginusComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  pass = "";
  em = "";
  ImageSorter(iput : string) {
    let input = iput.replace(":", "DWUKROPEK");
    while (input.includes("/") || input.includes(":")) {
      input = input.replace("/", "SLASH").replace(":", "DWUKROPEK");
    }
    return input;
  }
  Redirect() {
    let obj = {pass : this.pass, mail: this.em};
    let url = "http://130.162.234.221:8080?action=user&subact=get&security=ezzz&parametry=" + JSON.stringify(obj);
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
      if (ans.result.length > 0) {
        let x = ans.result[0];
        console.log(new Date() , new Date(x.how_long))
        if (new Date() < new Date(x.how_long)) {
          alert(`Masz bana aż do ${new Date(x.how_long).getDate()}-${new Date(x.how_long).getMonth() + 1}-${new Date(x.how_long).getFullYear()}`);
          return;
        } else {
          console.log(x);
          let ob = {id : x.id, name: x.name, img: this.ImageSorter(x.img)};
          console.log(JSON.stringify(ob));
          document.cookie = `logged=${x.id}`;
          this.router.navigateByUrl( `menus`);
        }
        
      }
    })
  }
}
