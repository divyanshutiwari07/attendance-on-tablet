import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { WebsocketService } from '../../services/websocket.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private wsService: WebsocketService) {}

    canActivate() {
        if ( !this.isLoggedIn() ) {
            this.router.navigateByUrl('/login');
            return false;
        } else {
            return true;
        }
    }

    isLoggedIn() {
        return !isNullOrUndefined(localStorage.getItem('token'));
    }

    logOut() {
        localStorage.removeItem('token');
        this.wsService.disconnectSocksdet();
        if ( isNullOrUndefined(localStorage.getItem('token')) ) {
            this.router.navigate(['/login']);
        }
    }

    logIn(token) {
        localStorage.setItem('token', token);
        if ( !isNullOrUndefined(localStorage.getItem('token')) ) {
            this.router.navigateByUrl('/attendance');
        }
    }

    handleSession(response) {
        return ( !response.success && response.msg === 'Un-Authorized Access, expired session' );
    }
}
