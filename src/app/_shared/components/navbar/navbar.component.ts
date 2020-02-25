import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() public onLogout = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  logout() {
    this.onLogout.emit();
  }
}
