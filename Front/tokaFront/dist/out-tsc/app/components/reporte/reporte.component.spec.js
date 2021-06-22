import { TestBed } from '@angular/core/testing';
import { ReporteComponent } from './reporte.component';
describe('ReporteComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ReporteComponent]
        })
            .compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(ReporteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=reporte.component.spec.js.map