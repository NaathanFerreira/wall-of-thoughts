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

  constructor(private thoughtService: ThoughtService) {}

  ngOnInit(): void {
    this.thoughtService.list(this.currentPage).subscribe((thoughtsList) => {
      this.thoughtsList = thoughtsList;
    });
  }

  loadMoreThoughts() {
    this.thoughtService.list(++this.currentPage).subscribe((thoughtsList) => {
      this.thoughtsList.push(...thoughtsList);
      if(!thoughtsList.length) {
        this.hasMoreThoughts = false
      }
    });
  }
}
