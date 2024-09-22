import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VertalerComponent } from './vertaler.component';

describe('VertalerComponent', () => {
  let component: VertalerComponent;
  let fixture: ComponentFixture<VertalerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VertalerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VertalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
