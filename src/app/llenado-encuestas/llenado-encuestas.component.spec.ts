import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlenadoEncuestasComponent } from './llenado-encuestas.component';

describe('LlenadoEncuestasComponent', () => {
  let component: LlenadoEncuestasComponent;
  let fixture: ComponentFixture<LlenadoEncuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlenadoEncuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlenadoEncuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
