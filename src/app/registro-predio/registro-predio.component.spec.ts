import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPredioComponent } from './registro-predio.component';

describe('RegistroPredioComponent', () => {
  let component: RegistroPredioComponent;
  let fixture: ComponentFixture<RegistroPredioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPredioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
