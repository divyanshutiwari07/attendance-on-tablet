import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../config';
import {RestClient} from '../common/rest.client';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: RestClient) { }

  // getNewEmpDetails() {
  //   return this.http.get(config.TEST);
  // }

  getPresentEmployeesForDate(obj): Observable <any> {
    return this.http.get(config.TODAYS_ATTENDANCE, obj);
  }

  getListOfRegisteredUsers(): Observable <any> {
    return this.http.get(config.LIST_OF_REGISTER_URL , {});
  }

  login(obj): Observable <any> {
    return this.http.post(config.LOGIN_URL , obj);
  }

  verifyEmployeePresence(obj): Observable <any> {
    return this.http.get(config.VERIFY_EMPLOYEE_PRESENCE_URL, obj);
  }

  getListOfSources(): Observable <any> {
    return this.http.get(config.LIST_OF_SOURCES_URL, {});
  }

}
