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
  @Input() whoIsThatPokemon: boolean = false;
  @Input() whoIsThatPokemonList: {list?: string[], answer?: string} | null = null;
  pokemonNumber: string | null = "0";
  originalImgUrl: string = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"
  imgUrl: string = ""

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["pokemon"].currentValue) {
      const number = this.pokemon?.url.replace("https://pokeapi.co/api/v2/pokemon/","").replace("/","") ?? null;
      this.pokemonNumber = number
      if (this.pokemon !== null) {
        this.imgUrl = `${this.originalImgUrl}${this.decimalPipe.transform(this.pokemonNumber,"3.0-0")}.png`
      }
    }
    if (changes["whoIsThatPokemonList"]?.currentValue){
      this.whoIsThatPokemon = true;
    }

  }

  goToPokemonDescription(){
    this.router.navigate([this.pokemon?.name], {relativeTo: this.activatedRoute})
  }

  answerQuestion(pokemonName: string){
    this.whoIsThatPokemon = false
    return this.whoIsThatPokemonList?.answer === pokemonName;
  }

  filterValues(arr: any[], key: string){
    return [...new Map(arr.map((item: any) => [item[key], item])).values()];
  }

  getValues(arr: any[], key: string){
    return arr.filter(
      (thing, index, self) => index === self.findIndex((t) => t[key] === thing[key])
    )
  }
}
