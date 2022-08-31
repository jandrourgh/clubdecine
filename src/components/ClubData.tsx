import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Carousel, CarouselItem, Col, Container, Row } from "react-bootstrap";
import { TClubData, TProposal } from "../interfaces/clubData";
import ProposalItem from "./ProposalItem";



const ClubData = ({
  data,
  db,
}: {
  data: TClubData | undefined;
  db: Firestore;
}) => {
  const [proposals, setProposals] = useState<
    | TProposal[]
    | undefined
  >(undefined);
  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        const q = query(collection(db, "users"), where("club", "==", data.id));
        const querySnapshot = await getDocs(q);
        const results: TProposal[] = [];
        querySnapshot.forEach((doc) => {
          results.push(
            doc.data() as TProposal
          );
        });
        return results;
      }
    };
    fetchData().then((data) => setProposals(data));
  }, [data, db]);

  return (
    <Container fluid>
      <Row>
        <h1>{data?.nombre}</h1>
      </Row>
      {proposals && (
        <Row><Carousel>
          {proposals.map((proposal, i) => (
            <CarouselItem key={i}><ProposalItem proposal={proposal}/></CarouselItem>
          ))}
        </Carousel></Row>
      )}
    </Container>
  );
};
export default ClubData;
