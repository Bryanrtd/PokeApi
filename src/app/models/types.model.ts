import { DamageRelations } from "./damage-relations.model";
import { Generation } from "./generation.model";

export interface Types {
  damage_relations:      DamageRelations;
  game_indices:          GameIndex[];
  generation:            Generation;
  id:                    number;
  move_damage_class:     Generation;
  moves:                 Generation[];
  name:                  string;
  names:                 Name[];
  past_damage_relations: any[];
  pokemon:               Pokemon[];
}


export interface GameIndex {
  game_index: number;
  generation: Generation;
}

export interface Name {
  language: Generation;
  name:     string;
}

export interface Pokemon {
  pokemon: Generation;
  slot:    number;
}
