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
      this.oferty = ans.result.reverse();
      for (let i = 0; i < this.oferty.length; i++) {

      }
      this.displayed = this.oferty;
      this.SetFilters();
    })
    
  }
  Goto(i : number) {
    let x = this.displayed[i];
    let obj = JSON.stringify({nr :x.id})
    this.router.navigateByUrl(`ofertuspodgladus/:${obj}`);
  }
  SetFilters() {
    for (let x = 0; x < this.oferty.length; x++) {
      let m  = String(this.oferty[x].location);
      if (!this.miasta.includes(m) && this.oferty[x].is_active && m != "") {
        this.miasta.push(m);
      }
      let t = JSON.parse(this.oferty[x].typus);
      for (let typ of t) {
        if (!this.typusy.includes(typ) && this.oferty[x].is_active) {
          this.typusy.push(typ);
        }
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
        if (JSON.parse(this.oferty[i].typus).includes(this.selected_typus)) {
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
        if (this.oferty[i].location == this.selected_miasto && JSON.parse(this.oferty[i].typus).includes(this.selected_typus)) {
          this.displayed.push(this.oferty[i]);
        }
      }
      if (this.selected_miasto == "" && !added) {
        if (JSON.parse(this.oferty[i].typus).includes(this.selected_typus) && this.oferty[i].stawka >= this.pointer) {
          this.displayed.push(this.oferty[i]);
        }
      }
      if (this.selected_miasto != "" && this.selected_typus != "" && this.pointer != 0) {
        if (JSON.parse(this.oferty[i].typus).includes(this.selected_typus) && this.oferty[i].stawka >= this.pointer && this.oferty[i].location == this.selected_miasto) {
          this.displayed.push(this.oferty[i]);
        }
      }
      added = false;
    }
  }

  ReadCookie() {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "logged") {
        return value;
      }
    }
    return -1;
  }
  Destroy() {
    document.cookie = "logged=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}
