import { Component, OnInit } from '@angular/core';
import { IThought } from '../thought';
import { ThoughtService } from '../thought.service';

@Component({
  selector: 'app-list-thoughts',
  templateUrl: './list-thoughts.component.html',
  styleUrls: ['./list-thoughts.component.css'],
})
export class ListThoughtsComponent implements OnInit {
  thoughtsList: IThought[] = [];
  currentPage: number = 1;
  hasMoreThoughts: boolean = true;
  filter: string = '';

  constructor(private thoughtService: ThoughtService) {}

  ngOnInit(): void {
    this.thoughtService.list(this.currentPage, this.filter).subscribe((thoughtsList) => {
      this.thoughtsList = thoughtsList;
    });
  }

  loadMoreThoughts() {
    this.thoughtService.list(++this.currentPage, this.filter).subscribe((thoughtsList) => {
      this.thoughtsList.push(...thoughtsList);
      if (!thoughtsList.length) {
        this.hasMoreThoughts = false;
      }
    });
  }

  searchThought() {
    this.hasMoreThoughts = true
    this.currentPage = 1

    this.thoughtService.list(this.currentPage, this.filter).subscribe((thoughtsList) => {
      this.thoughtsList = thoughtsList
    });
  }
}
