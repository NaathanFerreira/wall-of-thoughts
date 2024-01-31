import { Component, OnInit } from '@angular/core';
import { ThoughtService } from '../thought.service';
import { IThought } from '../thought';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-thought',
  templateUrl: './delete-thought.component.html',
  styleUrls: ['./delete-thought.component.css']
})
export class DeleteThoughtComponent implements OnInit {

  thought: IThought = {
    id: 0,
    content: '',
    author: '',
    model: '',
    bookmarked: false
  }

  constructor(private thoughtService: ThoughtService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.thoughtService.getById(id).subscribe((thought) => {
      this.thought = thought
    })
  }

  deleteThought(){
    if(this.thought.id){
      this.thoughtService.delete(this.thought.id).subscribe(() => this.router.navigate(['/listThoughts']))
    }
  }

  cancel(){
    this.router.navigate(['/listThoughts'])
  }

}
