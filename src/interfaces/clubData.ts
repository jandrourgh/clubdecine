import { TMovie } from "./movie"
import { TUserData } from "./userData"

export interface clubData {
    proposals: TProposal[]
    toWatch: TProposal
    watched: TProposal[]
    users: TUserData[]
}

export interface TProposal {
    user: string,
    movie: TMovie
}


export interface TClubData {
    nombre: string;
    id: string;
  }
  