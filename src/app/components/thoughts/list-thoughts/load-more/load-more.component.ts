import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.css']
})
export class LoadMoreComponent implements OnInit {

  @Input() hasMoreThoughts: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
