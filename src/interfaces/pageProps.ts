import { Firestore } from "firebase/firestore";
import { TClubData } from "./clubData";

export interface PageProps {
  db: Firestore;
  clubData: TClubData;
}
