import { Species } from "./species.model";

export interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}
