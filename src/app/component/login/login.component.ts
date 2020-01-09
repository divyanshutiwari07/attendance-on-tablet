import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthGuard } from '../../shared/guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginDetails: any = {};

  constructor(private apiService: ApiService, private auth: AuthGuard) { }

  ngOnInit() {
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiY…QzNH0.hqK7VYFdj2vNBmIFk7_7Po0fUo_e-AF1VIWa8-nEUaY';
  }

  onSubmit() {
    console.log('onsubmit');
    this.apiService.login(this.loginDetails).subscribe((loginRes) => {
      console.log('loginres');
      console.log('login res', loginRes);

      if ( loginRes.success ) {
            this.auth.logIn(loginRes.token);
        } else {
            alert(loginRes.msg);
        }
    });
  }
}
