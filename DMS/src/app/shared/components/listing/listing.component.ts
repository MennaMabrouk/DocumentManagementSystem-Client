import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Item } from '../../item.interface';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss',
  providers: [KeyValuePipe]
})
export class ListingComponent implements OnChanges {

  @Input() data: Item[] = [];
  @Input() isShared : boolean = false;
  @Input() isAdmin  : boolean   = false;
  @Input() type: 'folder' | 'document' = 'folder';

  @Output() folderSelected = new EventEmitter<number>;

  @Output() onUpdateFolder = new EventEmitter<Item>();
  @Output() onDeleteFolder = new EventEmitter<number>();

  @Output() onUpdateDocument = new EventEmitter<Item>();
  @Output() onDeleteDocument = new EventEmitter<number>();
  @Output() onPreviewDocument= new EventEmitter<number>();
  @Output() onDownloadDocument= new EventEmitter<number>();



  displayedColumns: string[] = [];

  constructor(private keyValuePipe: KeyValuePipe) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("The data:",this.data);

    if (changes['data'] && changes['data'].currentValue && this.data.length > 0) {
      const keyValueArray = this.keyValuePipe.transform(this.data[0]);
      this.displayedColumns = keyValueArray.map(entry => entry.key);
      // console.log("The displayedcolumns (key):", this.displayedColumns);
    }
    else {
      this.displayedColumns = [];
    }
  }




  triggerUpdate(item: Item): void {

    if (this.type === 'folder') {
      this.onUpdateFolder.emit(item);
    }
    else if (this.type === 'document') {
      this.onUpdateDocument.emit(item);
    }

  }

  triggerDelete(item: Item): void {

    if (this.type === 'folder') {
      this.onDeleteFolder.emit(item['FolderId']);
    }
    else if (this.type === 'document') {
      this.onDeleteDocument.emit(item['DocumentId']);
    }
  }


  selectFolder(folderId: number) {
    this.folderSelected.emit(folderId); //for documents api
  }

  previewDocument(documentId: number): void {
    this.onPreviewDocument.emit(documentId); //for document id 
  }

  downloadDocument(documentId: number): void {
    this.onDownloadDocument.emit(documentId); //for document id 
  }
}



