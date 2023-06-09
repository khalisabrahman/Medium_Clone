import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ArticleInputInterface } from "src/app/shared/types/articleInput.interface";
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";

@Component({
  selector: "./mc-article-form",
  templateUrl: "./articleForm.component.html",
  styleUrls: ["./articleForm.component.scss"],
})
export class ArticleFormComponent implements OnInit {
  @Input("initialValues") initialValuesProps: ArticleInputInterface;
  @Input("isSubmitting") isSubmittingProps: boolean;
  @Input("errors") errorsProps: BackendErrorsInterface | null;

  @Output("articleSubmit") articleSubmitEvent =
    new EventEmitter<ArticleInputInterface>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      title: this.initialValuesProps.title,
      description: this.initialValuesProps.description,
      body: this.initialValuesProps.body,
      tagList: this.initialValuesProps.tagList.join(' '), // convert the array of tags to 1 string
    });
  }

  onSubmit(): void {
    this.articleSubmitEvent.emit(this.form.value);
  }
}
