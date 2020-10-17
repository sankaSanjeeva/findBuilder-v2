import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'findBuilder-v2';
  navBarChange: boolean;

  @HostListener('window:scroll')
  onScroll(): void {
    if (window.scrollY > 150) {
      this.navBarChange = true;
    } else {
      this.navBarChange = false;
    }
  }
}
