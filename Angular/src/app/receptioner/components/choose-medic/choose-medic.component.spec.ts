import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMedicComponent } from './choose-medic.component';

describe('ChooseMedicComponent', () => {
  let component: ChooseMedicComponent;
  let fixture: ComponentFixture<ChooseMedicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseMedicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
