import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { personasfisicas } from '../../models/personasfisicas';
import { UserService } from '../../services/user.service';
let PersonasfisicasComponent = class PersonasfisicasComponent {
    constructor(_userService, http) {
        this._userService = _userService;
        this.http = http;
        this.page_title = "Modulo de personas fisicas";
        this.personasfisicas = new personasfisicas(0, '', '', '', '', '', '', '', 0, true);
        this.data = [
            { firstName: 'John', lastName: 'Doe', age: '35' },
            { firstName: 'Michael', lastName: 'Smith', age: '39' },
            { firstName: 'Michael', lastName: 'Jordan', age: '45' },
            { firstName: 'Tanya', lastName: 'Blake', age: '47' }
        ];
    }
    ngOnInit() {
        this._userService.readperson().subscribe(response => {
            this.personasfisicas = response;
            this.data;
            console.log(typeof (res));
            console.log(typeof (this.data));
        }, error => {
        });
    }
};
PersonasfisicasComponent = __decorate([
    Component({
        selector: 'app-personasfisicas',
        templateUrl: './personasfisicas.component.html',
        styleUrls: ['./personasfisicas.component.css'],
        providers: [UserService]
    })
], PersonasfisicasComponent);
export { PersonasfisicasComponent };
//# sourceMappingURL=personasfisicas.component.js.map