import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestusComponent } from './testus.component';

describe('TestusComponent', () => {
  let component: TestusComponent;
  let fixture: ComponentFixture<TestusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
