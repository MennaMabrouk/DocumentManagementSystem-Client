import { Component, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Item } from '../../item.interface';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaginationConfig } from '../../Enums/Pagination.enum';


@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatFormFieldModule
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss',
  providers: [KeyValuePipe]
})
export class ListingComponent implements OnChanges {

  @Input() data: Item[] = [];
  @Input() isShared: boolean = false;
  @Input() isAdmin: boolean = false;
  @Input() type: 'folder' | 'document' = 'folder';

  @Input() pageNumber: number = PaginationConfig.DefaultPageNumber;
  @Input() pageSize: number = PaginationConfig.DefaultPageSize;
  @Input() disableNextButton: boolean = false;

  @Output() folderSelected = new EventEmitter<number>;

  @Output() onUpdateFolder = new EventEmitter<Item>();
  @Output() onDeleteFolder = new EventEmitter<number>();

  @Output() onUpdateDocument = new EventEmitter<Item>();
  @Output() onDeleteDocument = new EventEmitter<number>();
  @Output() onPreviewDocument = new EventEmitter<number>();
  @Output() onDownloadDocument = new EventEmitter<number>();

  @Output() onPreviousPage = new EventEmitter<void>();
  @Output() onNextPage = new EventEmitter<void>();




  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<Item>;



  constructor(private keyValuePipe: KeyValuePipe) { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['data'] && changes['data'].currentValue && this.data.length > 0) {
      const keyValueArray = this.keyValuePipe.transform(this.data[0]);
      this.displayedColumns = keyValueArray.map(entry => entry.key);
      this.dataSource = new MatTableDataSource(this.data);
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }


  previousPage(): void {
    this.onPreviousPage.emit();
  }

  nextPage(): void {
    this.onNextPage.emit();
  }
}



