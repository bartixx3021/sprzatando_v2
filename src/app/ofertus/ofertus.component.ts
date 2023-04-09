import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ofertus',
  templateUrl: './ofertus.component.html',
  styleUrls: ['./ofertus.component.css']
})
export class OfertusComponent implements OnInit {

  constructor(private router : Router) { }
  oferty: any = [];
  displayed :any[] = [];
  miasta :string[] = ["Obojętnie"];
  typusy :string[] = ["Każdy"];
  min = 0;
  max = 0;
  pointer = 0;
  selected_miasto = "";
  selected_typus = "";
  ngOnInit(): void {
    let url = "http://130.162.234.221:8080?action=offer&subact=select&security=ezzz";
    fetch(url).then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
      this.oferty = ans.result.reverse();
      this.displayed = this.oferty;
      this.SetFilters();
    })
    
  }
  Goto(i : number) {
    let x = this.oferty[i];
    let obj = JSON.stringify({nr :x.id})
    this.router.navigateByUrl(`ofertuspodgladus/:${obj}`);
  }
  SetFilters() {
    for (let x = 0; x < this.oferty.length; x++) {
      let m  = String(this.oferty[x].location);
      if (!this.miasta.includes(m)) {
        this.miasta.push(m);
      }
      let t = String(this.oferty[x].typus);
      if (!this.typusy.includes(t)) {
        this.typusy.push(t);
      }
      let s = Number(this.oferty[x].stawka);
      if (s < this.min) {
        this.min = s;
      }
      if (s > this.max) {
        this.max = s;
      }
    }
  }

  // MIASTA

  SelectusMiastus(idx :any) {
    this.selected_miasto = this.miasta[idx];
    if (this.selected_miasto == "Obojętnie") {
      this.selected_miasto = "";
    }
    this.Filtrus();
  }

  // RODZAJE

  SelectusTypus(idx :any) {
    this.selected_typus = this.typusy[idx];
    if (this.selected_typus == "Każdy") {
      this.selected_typus = "";
    }
    this.Filtrus();
  }

  // SUWAK ZE STAWKAMI

  PointerusAlterus() {
    this.Filtrus();
  }

  Filtrus() {
    this.displayed = [];
    let added = false; 
    for (let i = 0; i < this.oferty.length; i++) {
      if (this.selected_miasto == "" && this.selected_typus == "") {
        if (this.oferty[i].stawka >= this.pointer) {
          this.displayed.push(this.oferty[i]);
          added = true;
        }
      }
      if (this.selected_miasto == "" && this.pointer == 0 && !added) {
        if (this.oferty[i].typus == this.selected_typus) {
          this.displayed.push(this.oferty[i]);
          added = true;
        }
      }
      if (this.selected_typus == "" && this.pointer == 0 && !added) {
        if (this.oferty[i].location == this.selected_miasto) {
          this.displayed.push(this.oferty[i]);
          added = true;
        }
      }
      if (this.selected_typus == "" && !added) {
        if (this.oferty[i].location == this.selected_miasto && this.oferty[i].stawka >= this.pointer) {
          this.displayed.push(this.oferty[i]);
        }
      }
      if (this.pointer == 0 && !added) {
        if (this.oferty[i].location == this.selected_miasto && this.oferty[i].typus == this.selected_typus) {
          this.displayed.push(this.oferty[i]);
        }
      }
      if (this.selected_miasto == "" && !added) {
        if (this.oferty[i].typus == this.selected_typus && this.oferty[i].stawka >= this.pointer) {
          this.displayed.push(this.oferty[i]);
        }
      }
      if (this.selected_miasto != "" && this.selected_typus != "" && this.pointer != 0) {
        if (this.oferty[i].typus == this.selected_typus && this.oferty[i].stawka >= this.pointer && this.oferty[i].location == this.selected_miasto) {
          this.displayed.push(this.oferty[i]);
        }
      }
      added = false;
    }
  }
}
