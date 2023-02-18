import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrusComponent } from './registrus.component';

describe('RegistrusComponent', () => {
  let component: RegistrusComponent;
  let fixture: ComponentFixture<RegistrusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
