import { Component, OnInit } from '@angular/core';
import { PokedexList, Result } from 'src/app/models/pokedex-list.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.css']
})
export class PokedexListComponent implements OnInit {

  result: PokedexList = { count: 0, next: "", previous: null, results: [] };
  tempPokedexList: Result[] = [];
  loadMore: boolean = false;

  constructor(private pokemonSrv: PokemonService) {
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getPokedexList();
  }

  getPokedexList() {
    this.pokemonSrv.getPokemonList(25).subscribe((res) => {
      this.result = res;
      this.tempPokedexList.push(...res.results);
      this.tempPokedexList.forEach(pokemon => this.getPokemonType(pokemon.name, pokemon));
    });

  }

  cargarMas(event: any) {
    this.loadMore = true;
    if (event) {
      if (this.result.results.length <= this.result.count) {
        this.pokemonSrv.getPokemonListLoadMore(this.result?.next).subscribe((res) => {
          if (res) {
            this.result = res;
            this.tempPokedexList.push(...res.results);
            this.tempPokedexList.forEach(pokemon => this.getPokemonType(pokemon.name, pokemon));
          }
        });
      }
    }
  }

  getPokemonType(pokemonName: string, result: Result) {
    this.pokemonSrv.getPokemonByName(pokemonName).subscribe((res) => {
      console.log(res);
      if (res) {
        result.types = res.types;
      }
    });
  }
}
