import { Component, Input, OnInit } from '@angular/core';
import { IThought } from '../thought';

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
    model: ''
  }


  constructor() { }

  ngOnInit(): void {
  }

  getCardWidth(): string {
    if(this.thought.content.length >= 256){
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

}
