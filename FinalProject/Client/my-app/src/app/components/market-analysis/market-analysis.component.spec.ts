import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketAnalysisComponent } from './market-analysis.component';

describe('MarketAnalysisComponent', () => {
  let component: MarketAnalysisComponent;
  let fixture: ComponentFixture<MarketAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
