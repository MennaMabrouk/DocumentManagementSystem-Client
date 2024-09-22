import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from '../../item.interface';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatTableModule],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss',
  providers: [KeyValuePipe]
})
export class ListingComponent implements OnInit, OnChanges {

  @Input() data: Item[] = [];
  displayedColumns: string[] = [];

  constructor(private keyValuePipe: KeyValuePipe) {}

  ngOnInit(): void {
    // Initial setup or pre-data logic can go here
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("The data:",this.data);
    if (changes['data'] && this.data.length > 0) {
      const keyValueArray = this.keyValuePipe.transform(this.data[0]);
      this.displayedColumns = keyValueArray.map(entry => entry.key);
      // console.log("The displayedcolumns (key):", this.displayedColumns);
    }
  }
}
