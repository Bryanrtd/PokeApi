import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Pokedex } from 'src/app/models/pokedex.model';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { PokedexList } from 'src/app/models/pokedex-list.model';
import { Characteristics } from 'src/app/models/characteristics.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private httpClient: HttpClient) {
    this.getUserLocale("es");
  }

  languageSubject: Subject<string> = new BehaviorSubject<string>("");

  getUserLocale(defaultValue: string) {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      this.languageSubject.next(defaultValue);
    }

    const wn = window.navigator as any;
    let lang = wn.languages ? wn.languages[0] : defaultValue;
    lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
    this.languageSubject.next(lang);
  }

  getLanguageId(){
    return this.languageSubject;
  }

  getPokemonByName(name: string): Observable<Pokedex> {
    return this.httpClient.get(`${environment.pokeapiurl}pokemon/${name}`)
      .pipe((res: any) => res);
  }

  getPokemonList(limit: number = 10, offset: number = 0): Observable<PokedexList> {
    return this.httpClient.get(`${environment.pokeapiurl}pokemon/?limit=${limit}&offset=${offset}`)
      .pipe((res: any) => res)
  }

  getPokemonListLoadMore(url: string = ""): Observable<PokedexList> {
    if (url) {
      return this.httpClient.get(url)
        .pipe((res: any) => res)
    } else {
      return new Observable().pipe(
        map((res) => {
          return { count: 0, next: "", previous: null, results: [] } as PokedexList;
        }))
    }
  }

  getCustomUrl(url: string = ""): Observable<any> {
    return this.httpClient.get(url)
      .pipe((res: any) => res)
  }

  getPokemonCharacteristics(id: number): Observable<Characteristics> {
    return this.httpClient.get(`${environment.pokeapiurl}characteristic/${id}`)
      .pipe((res: any) => res);
  }
}
