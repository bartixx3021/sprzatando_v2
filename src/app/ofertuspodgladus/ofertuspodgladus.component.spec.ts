import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertuspodgladusComponent } from './ofertuspodgladus.component';

describe('OfertuspodgladusComponent', () => {
  let component: OfertuspodgladusComponent;
  let fixture: ComponentFixture<OfertuspodgladusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertuspodgladusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfertuspodgladusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
