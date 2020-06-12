import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryAboutWakingComponent } from './story-about-waking.component';

describe('StoryAboutWakingComponent', () => {
  let component: StoryAboutWakingComponent;
  let fixture: ComponentFixture<StoryAboutWakingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryAboutWakingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryAboutWakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
