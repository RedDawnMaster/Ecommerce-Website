import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ecommerce';
  constructor(private router: Router) {}

  checkLink(): boolean {
    if (
      this.router.url.includes('login') ||
      this.router.url.includes('register')
    )
      return false;
    else return true;
  }
}
