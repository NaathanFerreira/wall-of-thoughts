import { Component, OnInit } from '@angular/core';
import { IThought } from '../thought';
import { ThoughtService } from '../thought.service';

@Component({
  selector: 'app-list-thoughts',
  templateUrl: './list-thoughts.component.html',
  styleUrls: ['./list-thoughts.component.css']
})
export class ListThoughtsComponent implements OnInit {

  thoughtsList: IThought[] = []

  constructor(private thoughtService: ThoughtService) { }

  ngOnInit(): void {
    this.thoughtService.list().subscribe((thoughtsList) => {
      this.thoughtsList = thoughtsList
    })
  }

}
