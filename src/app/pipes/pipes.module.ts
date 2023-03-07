import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KgToLbsPipe } from './kg-to-lbs.pipe';
import { MetersToFtPipe } from './meters-to-ft.pipe';
import { NocommaPipe } from './nocomma.pipe';

@NgModule({
  declarations: [NocommaPipe, KgToLbsPipe, MetersToFtPipe],
  exports: [NocommaPipe, KgToLbsPipe, MetersToFtPipe],
  imports: [
    CommonModule]
})
export class PipesModule { }
