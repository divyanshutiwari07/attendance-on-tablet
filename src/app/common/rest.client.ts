import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RestClient {

    constructor(private http: HttpClient) {}

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

    get(url: string, payload: Object = null, token = null) {
        if (isNullOrUndefined(payload)) {
            return this.http.get(url, this.getHttpOptions());
        } else {
            console.log('payload');
            return this.http.post(url, payload, this.getHttpOptions());
        }
    }

    post(url: string, payload: object = {}) {
        return this.http.post(url, payload);
    }
}
