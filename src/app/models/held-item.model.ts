import { Species } from './species.model';
import { VersionDetail } from './version-detail.model';

export interface HeldItem {
  item: Species;
  version_details: VersionDetail[];
}
