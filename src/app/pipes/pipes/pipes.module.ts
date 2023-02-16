import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NocommaPipe } from '../nocomma.pipe';

@NgModule({
  declarations: [NocommaPipe],
  exports: [NocommaPipe],
  imports: [
    CommonModule]
})
export class PipesModule { }
