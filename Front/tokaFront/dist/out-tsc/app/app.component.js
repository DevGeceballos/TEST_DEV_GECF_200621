import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UserService } from './services/user.service';
let AppComponent = class AppComponent {
    constructor(_userService) {
        this._userService = _userService;
        this.title = 'Examen para toka';
        this.loadUser();
    }
    ngOnInit() {
    }
    ngDoCheck() {
        this.loadUser();
    }
    loadUser() {
        this.identity = this._userService.getIdentity();
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
        providers: [UserService]
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map