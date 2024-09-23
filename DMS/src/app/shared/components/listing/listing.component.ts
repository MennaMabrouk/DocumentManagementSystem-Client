import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Item } from '../../item.interface';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FolderModel } from '../../../features/folder/folder.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatTableModule,
    MatIconModule
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss',
  providers: [KeyValuePipe]
})
export class ListingComponent implements OnInit, OnChanges {

  @Input() data: Item[] = [];
  // @Input() context! :  'workspace' | 'shared';
  @Output() onUpdateFolder = new EventEmitter<number>();
  @Output() onDeleteFolder = new EventEmitter<number>();


  displayedColumns: string[] = [];

  constructor(private keyValuePipe: KeyValuePipe) {}

  ngOnInit(): void {
    // Initial setup or pre-data logic can go here
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("The data:",this.data);
    if (changes['data']  && changes['data'].currentValue&& this.data.length > 0) {
      const keyValueArray = this.keyValuePipe.transform(this.data[0]);
      this.displayedColumns = keyValueArray.map(entry => entry.key);
      // console.log("The displayedcolumns (key):", this.displayedColumns);
    }
    else 
    {
        this.displayedColumns = [];
    }
  }

  triggerUpdateFolder(folderId: number): void {
    this.onUpdateFolder.emit(folderId);  
  }

  triggerDeleteFolder(folderId: number): void {
    this.onDeleteFolder.emit(folderId);  
  }


}
