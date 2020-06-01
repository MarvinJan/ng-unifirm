import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ConfirmModule } from "ng-unifirm";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ConfirmModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
