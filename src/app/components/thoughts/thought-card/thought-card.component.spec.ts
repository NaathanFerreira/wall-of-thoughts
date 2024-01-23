import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoughtCardComponent } from './thought-card.component';

describe('ThoughtCardComponent', () => {
  let component: ThoughtCardComponent;
  let fixture: ComponentFixture<ThoughtCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThoughtCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThoughtCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
