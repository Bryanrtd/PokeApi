import { Species } from './species.model';
import { VersionGroupDetail } from './version-group-detail.model';

export interface Move {
  move: Species;
  version_group_details: VersionGroupDetail[];
}
