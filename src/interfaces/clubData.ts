import { TMovie } from "./movie"
import { TUserData } from "./userData"

export interface clubData {
    proposals: TProposal[]
    toWatch: TProposal
    watched: TProposal[]
    users: TUserData[]
}

export interface TProposal {
    proposal?: number;
    reason?: string;
    nombre: string;
    club: string;
    admin?: boolean;
  }


export interface TClubData {
    nombre: string;
    id: string;
  }
  