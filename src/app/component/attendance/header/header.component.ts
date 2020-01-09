import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/shared/guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthGuard) { }

  ngOnInit() {

  }

  onLoggedout() {
    this.auth.logOut();
  }

}
