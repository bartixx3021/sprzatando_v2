import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertusComponent } from './ofertus.component';

describe('OfertusComponent', () => {
  let component: OfertusComponent;
  let fixture: ComponentFixture<OfertusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfertusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
