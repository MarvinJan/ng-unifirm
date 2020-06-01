import { NgModule, Injector } from "@angular/core";
import { ConfirmComponent } from "./confirm.component";
import { ConfirmService } from "./confirm.service";
import { takeUntil, take } from "rxjs/operators";
import { CommonModule } from "@angular/common";

// @dynamic
@NgModule({
  declarations: [ConfirmComponent],
  imports: [CommonModule],
  exports: [ConfirmComponent],
})
export class ConfirmModule {
  static injector: Injector;

  constructor(private injector: Injector) {
    ConfirmModule.injector = injector;
  }
}

export function Confirm(message?: string) {
  return function (target: Object, key, descriptor: PropertyDescriptor) {
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, key);
    }

    const original = descriptor.value;

    descriptor.value = function (...args) {
      const confirmService = ConfirmModule.injector.get(ConfirmService);

      if (confirmService) {
        confirmService.displayModal(message);
        confirmService.modalResult
          .pipe(takeUntil(confirmService.modalState), take(1))
          .subscribe((result) => (!result ? null : original.apply(this, args)));
      }
      return null;
    };

    return Object.defineProperty(target, key, descriptor);
  };
}
