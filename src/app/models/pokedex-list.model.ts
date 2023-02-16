import { Type } from "./type.model";

export interface PokedexList {
  count:    number;
  next:     string;
  previous: null;
  results:  Result[];
}

export interface Result {
  name: string;
  url:  string;
  types?: Type[];
}
