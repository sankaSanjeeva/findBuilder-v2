import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  navBarChange: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (window.scrollY > 200) {
      this.navBarChange = true;
    } else {
      this.navBarChange = false;
    }
  }

  backToTop(): void {
    window.scrollTo(0, 0);
  }

}
