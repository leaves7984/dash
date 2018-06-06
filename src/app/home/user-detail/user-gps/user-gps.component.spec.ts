import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGpsComponent } from './user-gps.component';

describe('UserGpsComponent', () => {
  let component: UserGpsComponent;
  let fixture: ComponentFixture<UserGpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
