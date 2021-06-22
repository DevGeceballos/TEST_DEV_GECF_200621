import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
let LoginComponent = class LoginComponent {
    constructor(_userService, _router, _route) {
        this._userService = _userService;
        this._router = _router;
        this._route = _route;
        this.page_title = 'Identificate';
        this.user = new User('', '', '');
    }
    ngOnInit() {
        this.logout();
    }
    onSubmit(form) {
        this._userService.login(this.user).subscribe(response => {
            localStorage.setItem('token', "DENEGADO");
            if (response[0].RESPONSE == "DENEGADO") {
                Swal.fire('Tu contraseña o correo son incorrectos', 'Favor de intentarlo nuevamente', 'error');
            }
            else {
                this.identity = response[0].RESPONSE;
                localStorage.setItem('token', "OK");
                localStorage.setItem('identity', this.identity);
            }
        }, error => {
            Swal.fire('Ah ocurrido un error con la aplicación', 'Lamentamos mucho la molestia', 'error');
        });
        form.reset();
    }
    logout() {
        this._route.params.subscribe(params => {
            let logout = +params['sure'];
            if (logout == 1) {
                localStorage.removeItem('identity');
                localStorage.removeItem('token');
                this.identity = null;
                this._router.navigate(['']);
            }
        });
    }
    ngDoCheck() {
        this.loadUser();
    }
    loadUser() {
        this.identity = this._userService.getIdentity();
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css'],
        providers: [UserService]
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map