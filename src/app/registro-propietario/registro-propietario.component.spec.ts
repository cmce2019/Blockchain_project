import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPropietarioComponent } from './registro-propietario.component';

describe('RegistroPropietarioComponent', () => {
  let component: RegistroPropietarioComponent;
  let fixture: ComponentFixture<RegistroPropietarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPropietarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
