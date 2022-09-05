import { TProposal } from "./clubData";

export interface TUserData {
    nombre: string,
    club: string,
    admin?: boolean,
    proposal: string,
    hasWatched: boolean,
}