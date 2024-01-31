import { Component, Input, OnInit } from '@angular/core';
import { IThought } from '../thought';
import { ThoughtService } from '../thought.service';

@Component({
  selector: 'app-thought-card',
  templateUrl: './thought-card.component.html',
  styleUrls: ['./thought-card.component.css']
})
export class ThoughtCardComponent implements OnInit {

  @Input() thought: IThought = {
    id: 0,
    content: '',
    author: '',
    model: '',
    bookmarked: false
  }

  @Input() bookmarkedList: IThought[] = []

  constructor(private thoughtService: ThoughtService) { }

  ngOnInit(): void {
  }

  getCardWidth(): string {
    if(this.thought.content.length >= 256){
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  changeBookmarkIcon():string {
    if(this.thought.bookmarked) return 'ativo'
    return 'inativo'
  }

  updateBookmark() {
    this.thoughtService.changeBookmark(this.thought).subscribe(() => {
      this.bookmarkedList.splice(this.bookmarkedList.indexOf(this.thought), 1)
    })
  }
}
