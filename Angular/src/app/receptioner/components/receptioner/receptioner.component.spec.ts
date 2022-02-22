import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionerComponent } from './receptioner.component';

describe('ReceptionerComponent', () => {
  let component: ReceptionerComponent;
  let fixture: ComponentFixture<ReceptionerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
