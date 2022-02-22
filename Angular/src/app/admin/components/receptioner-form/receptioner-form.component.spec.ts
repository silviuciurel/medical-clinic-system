import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionerFormComponent } from './receptioner-form.component';

describe('ReceptionerFormComponent', () => {
  let component: ReceptionerFormComponent;
  let fixture: ComponentFixture<ReceptionerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
