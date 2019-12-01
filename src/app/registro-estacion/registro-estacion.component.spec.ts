import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEstacionComponent } from './registro-estacion.component';

describe('RegistroEstacionComponent', () => {
  let component: RegistroEstacionComponent;
  let fixture: ComponentFixture<RegistroEstacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEstacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEstacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
