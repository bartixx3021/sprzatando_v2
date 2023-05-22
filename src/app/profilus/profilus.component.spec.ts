import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilusComponent } from './profilus.component';

describe('ProfilusComponent', () => {
  let component: ProfilusComponent;
  let fixture: ComponentFixture<ProfilusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
