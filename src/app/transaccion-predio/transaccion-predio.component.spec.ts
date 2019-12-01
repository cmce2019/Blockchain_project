import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionPredioComponent } from './transaccion-predio.component';

describe('TransaccionPredioComponent', () => {
  let component: TransaccionPredioComponent;
  let fixture: ComponentFixture<TransaccionPredioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransaccionPredioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaccionPredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
