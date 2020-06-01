import { Component, OnInit, Input } from "@angular/core";
import { Subject } from "rxjs";
import { ConfirmService, ModalState } from "./confirm.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "ng-unifirm",
  template: `
    <div class="custom ng-unifirm ng-unifirm__overlay" *ngIf="modalActive">
      <div class="ng-unifirm ng-unifirm__wrapper">
        <div class="ng-unifirm ng-unifirm__content">
          <ng-container *ngIf="!!modalText; else defaultText">{{
            modalText
          }}</ng-container>
          <ng-template #defaultText>{{ default }}</ng-template>
        </div>
        <div class="ng-unifirm ng-unifirm__controls">
          <button
            class="ng-unifirm ng-unifirm__control-button"
            (click)="confirmService.result(true)"
          >
            {{ confirm }}
          </button>
          <button
            class="ng-unifirm ng-unifirm__control-button"
            (click)="confirmService.result(false)"
          >
            {{ decline }}
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./confirm.component.css"],
})
export class ConfirmComponent implements OnInit {
  @Input() default: string = "Are you sure?";
  @Input() confirm: string = "Yes";
  @Input() decline: string = "No";

  private destroyed: Subject<void> = new Subject();

  modalText: string = null;
  modalActive: boolean = false;

  constructor(public confirmService: ConfirmService) {}

  ngOnInit() {
    this.confirmService.modalState
      .pipe(takeUntil(this.destroyed))
      .subscribe(this.changeAndShowModal);
    console.log(this.default);
  }

  ngOnDestroy() {
    this.destroyed.next();
  }

  changeAndShowModal = (cfg: ModalState) => {
    this.modalText = cfg.text;
    this.modalActive = cfg.displayed;
  };

  result(result: boolean) {
    this.confirmService.result(result);
  }
}
