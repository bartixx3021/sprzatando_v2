import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sprzatando';

  TestFetch() {
    fetch("http://localhost:8080").then(stream => stream.json()).then(jsonData => {
      let ans = jsonData;
      console.log(ans);
    })
  }
}
