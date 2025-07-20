import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HevoColorFontComponent } from './hevo-color-font.component';

describe('HevoColorFontComponent', () => {
  let component: HevoColorFontComponent;
  let fixture: ComponentFixture<HevoColorFontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HevoColorFontComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HevoColorFontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
