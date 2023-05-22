import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingusComponent } from './rankingus.component';

describe('RankingusComponent', () => {
  let component: RankingusComponent;
  let fixture: ComponentFixture<RankingusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
