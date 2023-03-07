import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "pokedex",
    loadChildren: () => import("./features/pokemons/pokemon.module").then(m => m.PokemonModule)
  },
  { path: '',   redirectTo: '/pokedex', pathMatch: 'full' },
  { path: '**', redirectTo: '/pokedex' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
