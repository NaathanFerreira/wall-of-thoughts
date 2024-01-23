import { Component, OnInit } from '@angular/core';
import { IThought } from '../thought';
import { ThoughtService } from '../thought.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-thought',
  templateUrl: './create-thought.component.html',
  styleUrls: ['./create-thought.component.css']
})
export class CreateThoughtComponent implements OnInit {

  thought: IThought = {
    content: '',
    author: '',
    model: 'model1'
  }

  constructor(private thoughtService: ThoughtService, private router: Router) { }

  ngOnInit(): void {
  }

  createThought() {
    this.thoughtService.create(this.thought).subscribe(() => {
      this.router.navigate(['/listThoughts'])
    })
  }

}
