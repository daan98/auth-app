import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HeroInterface } from '../../interfaces';

@Component({
  selector: 'heroes-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
  ]
})
export class ConfirmDialogComponent {

  constructor(
    private dialogRef : MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : HeroInterface
  ) {}

  public onClickConfirm() : void {
    this.dialogRef.close(true);
  }

  public onClickCancel() : void {
    this.dialogRef.close(false);
  }
}
