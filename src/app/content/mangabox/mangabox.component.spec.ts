import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaboxComponent } from './mangabox.component';

describe('MangaboxComponent', () => {
  let component: MangaboxComponent;
  let fixture: ComponentFixture<MangaboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangaboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
