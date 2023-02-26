import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homus',
  templateUrl: './homus.component.html',
  styleUrls: ['./homus.component.css']
})
export class HomusComponent implements OnInit {

  constructor() { }
  oferty :any[] = [];
  ngOnInit(): void {
    let url = "http://130.162.234.221:8080?action=offer&subact=select&security=ezzz";
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
      let x = ans.result.reverse();
      for (let i = 0; i < 7; i++) {
        this.oferty.push(x[i]);
      }
    })
  }



}
