import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonService } from './services/pokemon.service';
import { PokedexListComponent } from './pokedex-list/pokedex-list.component';
import { PokemonThumbnailComponent } from './pokedex-list/pokemon-thumbnail/pokemon-thumbnail.component';
import { NocommaPipe } from 'src/app/pipes/nocomma.pipe';
import { PipesModule } from 'src/app/pipes/pipes/pipes.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ScrollTrackerDirective } from 'src/app/directives/scroll-tracker.directive';

@NgModule({
  declarations: [PokemonComponent, PokedexListComponent, PokemonThumbnailComponent],
  imports: [CommonModule, PokemonRoutingModule, PipesModule, DirectivesModule],
  providers: [PokemonService, NocommaPipe, DecimalPipe, ScrollTrackerDirective]
})
export class PokemonModule {}
