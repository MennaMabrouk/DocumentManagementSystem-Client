import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDirectoriesComponent } from './shared-directories.component';

describe('SharedDirectoriesComponent', () => {
  let component: SharedDirectoriesComponent;
  let fixture: ComponentFixture<SharedDirectoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedDirectoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedDirectoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
