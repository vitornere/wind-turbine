import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
    constructor(
      private router: Router
    ) {}
  
    ngOnInit() {
    }
  
    home() {
      this.router.navigate(['']);
    }
  
    historic() {
      this.router.navigate(['historic']);
    }
  
    about() {
      this.router.navigate(['about']);
    }
  title = 'app';
}
