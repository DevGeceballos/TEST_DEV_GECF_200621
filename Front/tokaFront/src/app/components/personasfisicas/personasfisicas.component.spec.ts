import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasfisicasComponent } from './personasfisicas.component';

describe('PersonasfisicasComponent', () => {
  let component: PersonasfisicasComponent;
  let fixture: ComponentFixture<PersonasfisicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonasfisicasComponent ]
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
