import { TProposal } from "./clubData";

export interface TUserData {
  nombre: string;
  id: string;
  club: string;
  admin?: boolean;
  proposal: string;
  hasWatched: boolean;
}
export interface TStorageData {
  club: string;
  nombre: string;
  id: string;
}
