import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionerListComponent } from './receptioner-list.component';

describe('ReceptionerListComponent', () => {
  let component: ReceptionerListComponent;
  let fixture: ComponentFixture<ReceptionerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
