export interface Stats {
  affecting_moves:   AffectingMoves;
  affecting_natures: AffectingMoves;
  characteristics:   any[];
  game_index:        number;
  id:                number;
  is_battle_only:    boolean;
  move_damage_class: AffectingMoves;
  name:              string;
  names:             Name[];
}

export interface AffectingMoves {
}

export interface Name {
  language: Language;
  name:     string;
}

export interface Language {
  name: string;
  url:  string;
}
