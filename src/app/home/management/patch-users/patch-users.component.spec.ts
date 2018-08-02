import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchUsersComponent } from './patch-users.component';

describe('PatchUsersComponent', () => {
  let component: PatchUsersComponent;
  let fixture: ComponentFixture<PatchUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatchUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatchUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
