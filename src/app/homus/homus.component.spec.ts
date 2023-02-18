import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomusComponent } from './homus.component';

describe('HomusComponent', () => {
  let component: HomusComponent;
  let fixture: ComponentFixture<HomusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
