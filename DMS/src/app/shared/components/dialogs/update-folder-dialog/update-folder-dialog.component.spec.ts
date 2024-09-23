import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFolderDialogComponent } from './update-folder-dialog.component';

describe('UpdateFolderDialogComponent', () => {
  let component: UpdateFolderDialogComponent;
  let fixture: ComponentFixture<UpdateFolderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFolderDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFolderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
