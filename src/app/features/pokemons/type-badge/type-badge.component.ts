import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type Sizes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

@Component({
  selector: 'app-type-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './type-badge.component.html',
  styleUrls: ['./type-badge.component.css']
})
export class TypeBadgeComponent  {

  @Input() type: {name: string; originalName?: string} | null = null;
  @Input() badgeSize: Sizes = "h6";

}
