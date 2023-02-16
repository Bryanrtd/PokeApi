import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Characteristics } from 'src/app/models/characteristics.model';
import { Generation } from 'src/app/models/generation.model';
import { Pokedex } from 'src/app/models/pokedex.model';
import { Type } from 'src/app/models/type.model';
import { Types } from 'src/app/models/types.model';
import { NocommaPipe } from 'src/app/pipes/nocomma.pipe';
import { environment } from 'src/environments/environment';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {

  pokemonName: string = "";
  pokemonData!: Pokedex;
  pokemonImg: string = "";
  pokemonCharacteristics?: Characteristics;
  pokemonCharacteristicsDescription?: string;

  constructor(private pokemonSrv: PokemonService, private route: ActivatedRoute, private decimalPipe: DecimalPipe,
    private nocommapipe: NocommaPipe) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pokemonName = params["id"];
      this.getPokemonByName();
    });
  }


  getPokemonByName() {
    this.pokemonSrv.getPokemonByName(this.pokemonName).subscribe((res) => {
      console.log(res);

      this.pokemonData = res;
      this.getPokemonImgUrl();
      this.getPokemonWeakness();
      this.getPokemonsCharacteristics();
    });
  }

  getPokemonImgUrl(){
      this.pokemonImg = `${environment.imgUrl}${this.nocommapipe.transform(this.decimalPipe.transform(this.pokemonData?.id,"3.0-0"))}.png`
  }

  getPokemonWeakness(){
    this.pokemonData.weakness = [];
    this.pokemonData?.types.forEach((type: Type) => {
      this.pokemonSrv.getCustomUrl(type.type.url).subscribe((res: Types) => {
        this.pokemonData.weakness?.push(...res.damage_relations.double_damage_from);
        this.pokemonData.weakness = [...new Set(this.pokemonData.weakness)];
      });
    });
  }

  getPokemonsCharacteristics(){
    this.pokemonSrv.getPokemonCharacteristics(this.pokemonData?.id).subscribe((characteristics) => {
      this.pokemonCharacteristics = characteristics;
      this.pokemonCharacteristicsDescription =  this.pokemonCharacteristics.descriptions.filter((x) => x.language.name === 'es')[0].description
    })
  }
}
