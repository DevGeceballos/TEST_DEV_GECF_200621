import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
let RegisterComponent = class RegisterComponent {
    constructor(_userService) {
        this._userService = _userService;
        this.page_title = "Registrate";
        //Cambiar esto después
        this.user = new User('', '', '');
        this.identity = this._userService.getIdentity();
    }
    ngOnInit() {
    }
    onSubmit(form) {
        this._userService.register(this.user).subscribe(response => {
            var res = response[0].MENSAJEERROR;
            if (res == "Registro exitoso") {
                Swal.fire('Registro completado!', 'Ahora puedes iniciar sesion!', 'success');
            }
            else {
                Swal.fire('Este correo ya estaba registrado', 'Que tal si tratas de acordarte de tu contraseña', 'error');
            }
        }, error => {
            Swal.fire('Ah ocurrido un error con la aplicación', 'Lamentamos mucho la molestia', 'error');
        });
        form.reset();
    }
};
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css'],
        providers: [UserService]
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map