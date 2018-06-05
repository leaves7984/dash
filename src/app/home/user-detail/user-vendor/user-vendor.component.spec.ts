import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVendorComponent } from './user-vendor.component';

describe('UserVendorComponent', () => {
  let component: UserVendorComponent;
  let fixture: ComponentFixture<UserVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
