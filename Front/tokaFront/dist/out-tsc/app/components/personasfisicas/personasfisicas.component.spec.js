import { TestBed } from '@angular/core/testing';
import { PersonasfisicasComponent } from './personasfisicas.component';
describe('PersonasfisicasComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PersonasfisicasComponent]
        })
            .compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(PersonasfisicasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=personasfisicas.component.spec.js.map