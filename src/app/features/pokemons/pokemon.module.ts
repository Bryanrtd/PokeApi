import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonService } from './services/pokemon.service';
import { PokedexListComponent } from './pokedex-list/pokedex-list.component';
import { PokemonThumbnailComponent } from './pokedex-list/pokemon-thumbnail/pokemon-thumbnail.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ScrollTrackerDirective } from 'src/app/directives/scroll-tracker.directive';
import { PokemonEvolutionComponent } from './pokemon-evolution/pokemon-evolution.component';
import { TypeBadgeComponent } from './type-badge/type-badge.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { KgToLbsPipe } from 'src/app/pipes/kg-to-lbs.pipe';
import { MetersToFtPipe } from 'src/app/pipes/meters-to-ft.pipe';
import { NocommaPipe } from 'src/app/pipes/nocomma.pipe';

@NgModule({
  declarations: [PokemonComponent, PokedexListComponent, PokemonThumbnailComponent, PokemonEvolutionComponent],
  imports: [CommonModule, PokemonRoutingModule, PipesModule, DirectivesModule, TypeBadgeComponent],
  providers: [PokemonService, NocommaPipe, KgToLbsPipe, MetersToFtPipe, DecimalPipe, ScrollTrackerDirective]
})
export class PokemonModule {}
