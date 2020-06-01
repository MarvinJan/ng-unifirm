# ng-unifirm

Simple library for universal ( app-wide ) use modal window of action confirmation.

## Installation

add ng-unifirm to your app dependencies inside package.json

## Usage

Add ConfirmModule import to your AppModule:

```javascript
import { ConfirmModule } from "ng-unifirm";
```

Inside your app entry html file ( app.component.html by default ) add

```html
<ng-unifirm></ng-unifirm>
```

Then use @Confirm() decorator before any method in your app, to call a modal on every said method execution. After user makes a decision in the modal it will either call the method or do nothing based on if the action was approved or declined respectively.
