import { Generation } from "./generation.model";

export interface DamageRelations {
  double_damage_from: Generation[];
  double_damage_to:   Generation[];
  half_damage_from:   Generation[];
  half_damage_to:     Generation[];
  no_damage_from:     any[];
  no_damage_to:       any[];
}
