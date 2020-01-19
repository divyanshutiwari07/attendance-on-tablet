import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AuthGuard } from '../shared/guard/auth.guard';

@Injectable({
    providedIn: 'root'
})
export class RestClient {

    constructor(private http: HttpClient, private auth: AuthGuard) {}

    private getHttpOptions() {
        return {
            headers: new HttpHeaders({
            //   'Content-Type':  'application/json',
              'Authorization': localStorage.getItem('token')
            })
        };
    }
    // testing

    // get(url: string, payload: object = null) {

    //     if (isNullOrUndefined(payload)) {
    //         return this.http.get(url);
    //     }    else {
    //         return this.http.post(url, payload);
    //     }
    // }

    // post(url: string, payload: object = {}) {
    //     return this.http.post(url, payload);
    // }


    // final

    get(url: string, payload: Object = null, token = null): Observable<any>{
        return Observable.create((observer: Observer<any>) => {
            if (isNullOrUndefined(payload)) {
                this.http.get(url, this.getHttpOptions()).subscribe(response => {
                    if ( this.auth.handleSession(<any>response) ) {
                        this.auth.logOut();
                    } else {
                        observer.next(response);
                    }
                });
            } else {
                return this.http.post(url, payload, this.getHttpOptions()).subscribe(response => {
                    if ( this.auth.handleSession(<any>response) ) {
                        this.auth.logOut();
                    } else {
                        observer.next(response);
                    }
                });
            }
        });
    }

    post(url: string, payload: object = {}) {
        return this.http.post(url, payload);
    }
}
