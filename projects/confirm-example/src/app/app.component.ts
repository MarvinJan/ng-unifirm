import { Component } from "@angular/core";
import { Confirm } from "ng-unifirm";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "confirm-example";

  @Confirm() test() {
    alert("test successful")!;
  }
}
