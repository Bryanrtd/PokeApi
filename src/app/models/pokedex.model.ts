import { Ability } from './ability.model';
import { GameIndex } from './game-index.model';
import { Generation } from './generation.model';
import { HeldItem } from './held-item.model';
import { Move } from './move.model';
import { Species } from './species.model';
import { Sprites } from './sprites.model';
import { Stat } from './stat.model';
import { Type } from './type.model';

export interface Pokedex {
  abilities: Ability[];
  base_experience: number;
  forms: Species[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number | null;
  weakness: Generation[];
}
