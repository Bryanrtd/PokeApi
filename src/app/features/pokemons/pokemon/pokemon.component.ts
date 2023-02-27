import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Characteristics } from 'src/app/models/characteristics.model';
import { Pokedex } from 'src/app/models/pokedex.model';
import { PokemonSpecie } from 'src/app/models/pokemon-specie.model';
import { Type } from 'src/app/models/type.model';
import { Types } from 'src/app/models/types.model';
import { NocommaPipe } from 'src/app/pipes/nocomma.pipe';
import { environment } from 'src/environments/environment';
import { PokemonService } from '../services/pokemon.service';
import { AbilityData } from "src/app/models/ability-data.model";
import { Stats } from 'src/app/models/stats.model';
import { Chain, EvolutionChain } from 'src/app/models/evolution-chain.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit, OnDestroy {

  pokemonName: string = "";
  pokemonData!: Pokedex;
  pokemonImg: string = "";
  pokemonCharacteristics?: Characteristics;
  pokemonCharacteristicsDescription?: string;
  pokemonSpecie?: PokemonSpecie;
  pokemonCategory: string = "";
  actualLanguage: string = "";
  evolChain = new Map();
  evolChainArr: string[] = [];

  languageSuscription$?: Subscription;

  constructor(private pokemonSrv: PokemonService, private route: ActivatedRoute, private decimalPipe: DecimalPipe,
    private nocommapipe: NocommaPipe) {

  }
  ngOnDestroy(): void {
    this.languageSuscription$?.unsubscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pokemonName = params["id"];
      this.getPokemonByName();
    });


    this.languageSuscription$ = this.pokemonSrv.languageSubject.subscribe((lang) => {
      this.actualLanguage = lang;
    });
  }


  getPokemonByName() {
    this.pokemonSrv.getPokemonByName(this.pokemonName).subscribe((res) => {
      console.log(res);

      this.pokemonData = res;
      this.getPokemonImgUrl();
      this.getPokemonWeakness();
      this.getPokemonSpecieInfo();

      this.pokemonData.height *= 0.1;
      this.pokemonData.weight *= 0.1;
      this.pokemonData.abilities.forEach((x) => {
        this.getAbilityData(x.ability.url, x.ability.name);
      });
      this.pokemonData.types.forEach((x) => {
        x.type.original_name = x.type.name;
        this.getPokemonTypeDescription(x.type.url, x.type.name);
      })
      this.pokemonData.stats.forEach((x) => {
        this.getStats(x.stat.url, x.stat.name);
      })

    });
  }

  getPokemonImgUrl() {
    this.pokemonImg = `${environment.imgUrl}${this.nocommapipe.transform(this.decimalPipe.transform(this.pokemonData?.id, "3.0-0"))}.png`
  }

  getPokemonWeakness() {
    this.pokemonData.weakness = [];
    this.pokemonData?.types.forEach((type: Type) => {
      this.pokemonSrv.getCustomUrl(type.type.url).subscribe((res: Types) => {
        this.pokemonData.weakness?.push(...res.damage_relations.double_damage_from);
        this.pokemonData.weakness = [...new Set(this.pokemonData.weakness)];
        this.pokemonData.weakness.forEach((x, idx) => {
          if (x.name === type.type.name) {
            this.pokemonData.weakness.splice(idx, 1);
          }
          x.original_name = x.name;
          this.getPokemonWeaknessDescription(x.url, x.name);
        });
      });
    });
  }

  // getPokemonsCharacteristics() {
  //   this.pokemonSrv.getPokemonCharacteristics(this.pokemonData?.id).subscribe((characteristics) => {
  //     this.pokemonCharacteristics = characteristics;
  //   })
  // }

  getPokemonSpecieInfo() {
    this.pokemonSrv.getCustomUrl(this.pokemonData.species.url).subscribe((res: PokemonSpecie) => {
      if (res) {
        console.log(res);
        this.pokemonSpecie = res;
        this.pokemonCharacteristicsDescription = this.pokemonSpecie.flavor_text_entries
          .filter((x) => this.actualLanguage.toLowerCase().includes(x.language.name.toLowerCase()))[0].flavor_text;
        this.getPokemonCategory();
        this.getEvolutionChain(res.evolution_chain.url);
      }
    });
  }

  getPokemonCategory() {
    this.pokemonCategory = this.pokemonSpecie?.genera.filter((x) => this.actualLanguage.toLowerCase().includes(x.language.name.toLowerCase()))[0].genus ?? ""
  }

  getAbilityData(url: string, abilityName: string) {
    this.pokemonSrv.getCustomUrl(url).subscribe((res: AbilityData) => {
      const idx = this.pokemonData.abilities.findIndex((x) => x.ability.name === abilityName);
      if (idx > -1) {
        this.pokemonData.abilities[idx].ability.name = res.names
          .filter((x) => this.actualLanguage.toLowerCase().includes(x.language.name.toLowerCase()))[0].name ?? "";
      }
    });
  }

  getPokemonTypeDescription(url: string, typeName: string) {
    this.pokemonSrv.getCustomUrl(url).subscribe((res: Types) => {
      const idx = this.pokemonData.types.findIndex((x) => x.type.name === typeName);
      if (idx > -1) {
        this.pokemonData.types[idx].type.name = res.names
          .filter((x) => this.actualLanguage.toLowerCase().includes(x.language.name.toLowerCase()))[0].name ?? "";

      }
    });
  }

  getPokemonWeaknessDescription(url: string, typeName: string) {
    this.pokemonSrv.getCustomUrl(url).subscribe((res: Types) => {
      const idx = this.pokemonData.weakness.findIndex((x) => x.name === typeName);
      if (idx > -1) {
        this.pokemonData.weakness[idx].name = res.names
          .filter((x) => this.actualLanguage.toLowerCase().includes(x.language.name.toLowerCase()))[0].name ?? "";
      }
    });
  }

  getStats(url: string, statName: string) {
    this.pokemonSrv.getCustomUrl(url).subscribe((res: Stats) => {
      const idx = this.pokemonData.stats.findIndex((x) => x.stat.name === statName);
      if (idx > -1) {
        this.pokemonData.stats[idx].stat.name = res.names
          .filter((x) => this.actualLanguage.toLowerCase().includes(x.language.name.toLowerCase()))[0].name ?? "";
      }
    });
  }

  getEvolutionChain(url: string) {
    this.pokemonSrv.getCustomUrl(url).subscribe((res: EvolutionChain) => {
      this.getEvolChainMap(res.chain);
      this.evolChain.forEach((x) => {
        this.evolChainArr.push(x)
      });
    });
  }

  hasEvolution(chain: Chain): boolean {
    return chain.evolves_to.length > 0;
  }

  getEvolChainMap(chain: Chain){
    for (const key in chain) {
      if (Object.prototype.hasOwnProperty.call(chain, key)) {
        this.evolChain.set(chain.species.name, chain.species.name);
        if(this.hasEvolution(chain)){
          this.getEvolChainMap(chain.evolves_to[0])
        }
      }
    }
  }


}
