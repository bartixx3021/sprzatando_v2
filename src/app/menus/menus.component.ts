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
  ngOnInit(): void {
    let id : any  = this.route.snapshot.paramMap.get('datus')?.toString();
    console.log(id);
    this.data = JSON.parse(id.replace(":", ""));
    this.image = this.data.img;
  }

}
