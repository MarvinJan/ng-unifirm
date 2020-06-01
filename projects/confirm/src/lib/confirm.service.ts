import { Injectable } from "@angular/core";
import { Subject, Observable, combineLatest } from "rxjs";
import { map } from "rxjs/operators";

export interface ModalState {
  text: string;
  displayed: boolean;
}

@Injectable({
  providedIn: "root",
})
export class ConfirmService {
  private modalTextValue: Subject<string> = new Subject();
  private modalResultVal: Subject<boolean> = new Subject();
  private modalDisplayedValue: Subject<boolean> = new Subject();

  public modalResult: Observable<boolean> = this.modalResultVal.asObservable();

  public modalState: Observable<ModalState> = combineLatest([
    this.modalTextValue,
    this.modalDisplayedValue,
  ]).pipe(
    map(([text, displayed]) => {
      return { text, displayed };
    })
  );

  displayModal(val?: string) {
    this.modalTextValue.next(val);
    this.modalDisplayedValue.next(true);
  }

  hideModal() {
    this.modalDisplayedValue.next(false);
  }

  result(result: boolean) {
    this.modalResultVal.next(result);
    this.modalDisplayedValue.next(false);
  }

  constructor() {}
}
