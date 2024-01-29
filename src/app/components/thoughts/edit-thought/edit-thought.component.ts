import { Component, OnInit } from '@angular/core';
import { IThought } from '../thought';
import { ThoughtService } from '../thought.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-thought',
  templateUrl: './edit-thought.component.html',
  styleUrls: ['./edit-thought.component.css'],
})
export class EditThoughtComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private thoughtService: ThoughtService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.thoughtService.getById(id).subscribe((thought) => {
      this.form = this.formBuilder.group({
        id: [thought.id],
        content: [
          thought.content,
          Validators.compose([
            Validators.required,
            // don't allow empty spaces
            Validators.pattern(/(.|\s)*\S(.|\s)*/),
          ]),
        ],
        author: [
          thought.author,
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        model: [thought.model],
      });
    });
  }

  editThought() {
    this.thoughtService
      .edit(this.form.value)
      .subscribe(() => this.router.navigate(['/listThoughts']));
  }

  cancel() {
    this.router.navigate(['/listThoughts']);
  }

  enableButton(): string {
    if (this.form.valid) {
      return 'botao';
    }
    return 'botao__desabilitado';
  }
}
