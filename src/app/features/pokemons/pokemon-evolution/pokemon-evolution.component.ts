import { DecimalPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NocommaPipe } from 'src/app/pipes/nocomma.pipe';
import { environment } from 'src/environments/environment';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.css']
})
export class PokemonEvolutionComponent implements OnChanges {
  @Input() pokemonEvol: string[] = [];
  pokemonEvolutionInfo: any[] = [];

  constructor(private pokemonSrv: PokemonService, private decimalPipe: DecimalPipe,
    private nocommapipe: NocommaPipe) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonEvol'].currentValue) {
      this.pokemonEvol?.forEach((element) => {
        this.getPokemon(element);
      });
      setTimeout(() => {
        this.pokemonEvolutionInfo.sort((a, b) => this.compareIdx(a.id, b.id));
        console.log(this.pokemonEvolutionInfo);
      }, 1000);


    }
  }

  getPokemon(pokemonName: string) {
    this.pokemonSrv.getPokemonByName(pokemonName).subscribe((res) => {
      const pokemonInfo = {
        id: res?.id,
        name: res.name,
        imageUrl: `${environment.imgUrl}${this.nocommapipe.transform(this.decimalPipe.transform(res?.id, "3.0-0"))}.png`,
        types: res.types
      }

      this.pokemonEvolutionInfo.push(pokemonInfo)
    });
  }

  compareIdx(a: number, b: number) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }

}
