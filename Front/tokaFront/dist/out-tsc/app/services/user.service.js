import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { global } from './global';
let UserService = class UserService {
    constructor(_http) {
        this._http = _http;
        // code...
        this.url = global.url;
    }
    register(user) {
        let json = JSON.stringify(user);
        let params = json;
        let headers = new HttpHeaders().set('content-type', 'application/json' /*, 'application/x-www-form-urlencoded'*/);
        return this._http.post(this.url + 'Users', params, { headers: headers });
    }
    login(user) {
        let json = JSON.stringify(user);
        let params = json;
        let headers = new HttpHeaders().set('content-type', 'application/json' /*, 'application/x-www-form-urlencoded'*/);
        return this._http.post(this.url + 'Login', params, { headers: headers });
    }
    getIdentity() {
        let identity = localStorage.getItem('identity');
        if (identity && identity != "undefined") {
            this.identity = identity;
        }
        else {
            this.identity = null;
        }
        return this.identity;
    }
    /*Apartado para funciones del crud*/
    createperson(personasfisicas) {
        let json = JSON.stringify(personasfisicas);
        let params = json;
        let headers = new HttpHeaders().set('content-type', 'application/json' /*, 'application/x-www-form-urlencoded'*/);
        return this._http.post(this.url + 'Personas', params, { headers: headers });
    }
    readperson() {
        let headers = new HttpHeaders().set('content-type', 'application/json' /*, 'application/x-www-form-urlencoded'*/);
        return this._http.get(this.url + 'Personas', { headers: headers });
    }
    updateperson(personasfisicas) {
        let json = JSON.stringify(personasfisicas);
        let params = json;
        let headers = new HttpHeaders().set('content-type', 'application/json' /*, 'application/x-www-form-urlencoded'*/);
        return this._http.put(this.url + 'Personas', params, { headers: headers });
    }
    deleteperson(personasfisicas) {
        let json = JSON.stringify(personasfisicas);
        let params = json;
        let headers = new HttpHeaders().set('content-type', 'application/json' /*, 'application/x-www-form-urlencoded'*/);
        return this._http.delete(this.url + 'Personas', { headers: headers });
    }
};
UserService = __decorate([
    Injectable()
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map