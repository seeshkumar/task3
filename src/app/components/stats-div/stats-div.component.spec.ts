import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsDivComponent } from './stats-div.component';

describe('StatsDivComponent', () => {
  let component: StatsDivComponent;
  let fixture: ComponentFixture<StatsDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsDivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
