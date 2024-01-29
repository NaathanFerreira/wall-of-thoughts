import { Component, OnInit } from '@angular/core';
import { IThought } from '../thought';
import { ThoughtService } from '../thought.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-thought',
  templateUrl: './create-thought.component.html',
  styleUrls: ['./create-thought.component.css'],
})
export class CreateThoughtComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private thoughtService: ThoughtService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      content: [
        '',
        Validators.compose([
          Validators.required,
          // don't allow empty spaces
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      author: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      model: ['model1'],
    });
  }

  createThought() {
    console.log(this.form.get('author')?.errors);
    if (this.form.valid) {
      this.thoughtService.create(this.form.value).subscribe(() => {
        this.router.navigate(['/listThoughts']);
      });
    }
  }

  enableButton(): string {
    if (this.form.valid) {
      return 'botao';
    }
    return 'botao__desabilitado';
  }
}
