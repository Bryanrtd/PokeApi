import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollTrackerDirective } from './scroll-tracker.directive';

@NgModule({
  declarations: [ScrollTrackerDirective],
  exports: [ScrollTrackerDirective],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
