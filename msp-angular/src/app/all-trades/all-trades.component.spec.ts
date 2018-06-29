import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTradesComponent } from './all-trades.component';

describe('AllTradesComponent', () => {
  let component: AllTradesComponent;
  let fixture: ComponentFixture<AllTradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
