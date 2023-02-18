import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginusComponent } from './loginus.component';

describe('LoginusComponent', () => {
  let component: LoginusComponent;
  let fixture: ComponentFixture<LoginusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
