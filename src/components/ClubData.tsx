import {
  collection,
  Firestore,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
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
  const [proposals, setProposals] = useState<TProposal[] | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        const q = query(collection(db, "users"), where("club", "==", data.id));
        const querySnapshot = await getDocs(q);
        const results: TProposal[] = [];
        querySnapshot.forEach((doc) => {
          results.push(doc.data() as TProposal);
        });
        return results;
      }
    };
    fetchData().then((data) => setProposals(data));
  }, [data, db]);

  const proposalsSorted = useMemo(
    () =>
      proposals
        ?.sort((a, b) =>
          a.hasOwnProperty("admin") ? -1 : b.hasOwnProperty("admin") ? 1 : 0
        )
        .filter((proposal) => proposal.proposal !== undefined),
    [proposals]
  );

  const noProposed = useMemo(
    () => proposals?.filter((proposal) => proposal.proposal),
    [proposals]
  );

  return (
    <>
      <Row>
        <h1>{data?.nombre}</h1>
      </Row>
      {proposalsSorted && (
        <Row>
          <Carousel interval={null}>
            {proposalsSorted.map((proposal, i) => (
              <CarouselItem key={i}>
                <ProposalItem proposal={proposal} />
              </CarouselItem>
            ))}
          </Carousel>
        </Row>
      )}
    </>
  );
};
export default ClubData;
