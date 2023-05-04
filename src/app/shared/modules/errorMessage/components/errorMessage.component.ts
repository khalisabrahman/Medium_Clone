import { Component, Input } from "@angular/core";

@Component({
  selector: "mc-error-message",
  templateUrl: "./errorMessage.component.html",
})
export class ErrorMessageComponent {
  @Input("message") messageProps: string = 'Something went wrong';
}
