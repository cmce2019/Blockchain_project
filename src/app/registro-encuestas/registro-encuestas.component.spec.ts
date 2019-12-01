import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEncuestasComponent } from './registro-encuestas.component';

describe('RegistroEncuestasComponent', () => {
  let component: RegistroEncuestasComponent;
  let fixture: ComponentFixture<RegistroEncuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEncuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEncuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
