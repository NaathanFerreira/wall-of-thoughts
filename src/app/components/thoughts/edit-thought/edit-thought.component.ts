import { Component, OnInit } from '@angular/core';
import { IThought } from '../thought';
import { ThoughtService } from '../thought.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-thought',
  templateUrl: './edit-thought.component.html',
  styleUrls: ['./edit-thought.component.css']
})
export class EditThoughtComponent implements OnInit {

  thought: IThought = {
    id: 0,
    content: '',
    author: '',
    model: ''
  }
  constructor(private thoughtService: ThoughtService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.thoughtService.getById(id).subscribe((thought) => {
      this.thought = thought
    })
  }

  editThought(){
    this.thoughtService.edit(this.thought).subscribe(() => this.router.navigate(['/listThoughts']))
  }

  cancel() {
    this.router.navigate(['/listThoughts'])
  }

}
