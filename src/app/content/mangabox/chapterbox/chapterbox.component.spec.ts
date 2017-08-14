import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterboxComponent } from './chapterbox.component';

describe('ChapterboxComponent', () => {
  let component: ChapterboxComponent;
  let fixture: ComponentFixture<ChapterboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
