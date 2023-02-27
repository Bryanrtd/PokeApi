import { DecimalPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from 'src/app/models/pokedex-list.model';

@Component({
  selector: 'app-pokemon-thumbnail',
  templateUrl: './pokemon-thumbnail.component.html',
  styleUrls: ['./pokemon-thumbnail.component.css'],
  providers: [DecimalPipe]
})
export class PokemonThumbnailComponent implements OnChanges {

  constructor(private decimalPipe: DecimalPipe, private router: Router, private activatedRoute: ActivatedRoute){

  }

  @Input() pokemon?: Result;
  pokemonNumber: string | null = "0";
  imgUrl: string = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["pokemon"].currentValue) {
      const number = this.pokemon?.url.replace("https://pokeapi.co/api/v2/pokemon/","").replace("/","") ?? null;
      this.pokemonNumber = number
      if (this.pokemon !== null) {
        this.imgUrl = `${this.imgUrl}${this.decimalPipe.transform(this.pokemonNumber,"3.0-0")}.png`
      }
    }
  }

  goToPokemonDescription(){
    this.router.navigate([this.pokemon?.name], {relativeTo: this.activatedRoute})
  }


}
