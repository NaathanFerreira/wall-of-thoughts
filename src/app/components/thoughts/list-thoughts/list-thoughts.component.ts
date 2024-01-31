import { Component, OnInit } from '@angular/core';
import { IThought } from '../thought';
import { ThoughtService } from '../thought.service';
import { Router } from '@angular/router';

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
  bookmarked: boolean = false;
  bookmarkedList: IThought[] = [];
  title: string = 'Meu mural'


  constructor(private thoughtService: ThoughtService, private router: Router) {}

  ngOnInit(): void {
    this.thoughtService
      .list(this.currentPage, this.filter, this.bookmarked)
      .subscribe((thoughtsList) => {
        this.thoughtsList = thoughtsList;
      });
  }

  loadMoreThoughts() {
    this.thoughtService
      .list(++this.currentPage, this.filter, this.bookmarked)
      .subscribe((thoughtsList) => {
        this.thoughtsList.push(...thoughtsList);
        if (!thoughtsList.length) {
          this.hasMoreThoughts = false;
        }
      });
  }

  searchThought() {
    this.hasMoreThoughts = true;
    this.currentPage = 1;

    this.thoughtService
      .list(this.currentPage, this.filter, this.bookmarked)
      .subscribe((thoughtsList) => {
        this.thoughtsList = thoughtsList;
      });
  }

  getBookmarked() {
    this.title = "Meus favoritos"
    this.bookmarked = true;
    this.hasMoreThoughts = true;
    this.currentPage = 1;

    this.thoughtService
      .list(this.currentPage, this.filter, this.bookmarked)
      .subscribe((thoughtsList) => {
        this.thoughtsList = thoughtsList;
        this.bookmarkedList = thoughtsList;
      });
  }

  reloadComponent() {
    this.title = "Meu mural"
    this.bookmarked = false
    this.currentPage = 1

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
