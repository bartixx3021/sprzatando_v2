import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service/public-api';
@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  constructor(private cService : CookieService) { }

  image = "";
  data = {img : ""};
  ngOnInit(): void {
    //const myCookieValue = this.getCookieValue('datus');
    //console.log(myCookieValue);
    /**
    if (this.cookieService.check("datus")) {
      this.data = JSON.parse(this.cookieService.get("datus"));
      this.image = this.data.img;
    }
    **/
  }

  getCookieValue(cookieName: string): string | undefined {
    const cookieValue = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith(`${cookieName}=`));
  
    if (cookieValue) {
      return cookieValue.split('=')[1];
    }
  
    return undefined;
  }

}
