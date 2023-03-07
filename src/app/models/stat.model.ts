import { Species } from './species.model';

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
  color?: string;
}
