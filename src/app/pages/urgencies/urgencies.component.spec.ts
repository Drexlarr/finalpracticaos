import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgenciesComponent } from './urgencies.component';

describe('UrgenciesComponent', () => {
  let component: UrgenciesComponent;
  let fixture: ComponentFixture<UrgenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrgenciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
