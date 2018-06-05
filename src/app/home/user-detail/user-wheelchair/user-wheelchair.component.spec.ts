import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWheelchairComponent } from './user-wheelchair.component';

describe('UserWheelchairComponent', () => {
  let component: UserWheelchairComponent;
  let fixture: ComponentFixture<UserWheelchairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWheelchairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWheelchairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
