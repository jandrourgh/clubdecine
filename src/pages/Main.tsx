import { Firestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ClubData from "../components/ClubData";
import { TClubData } from "../interfaces/clubData";

const Main = ({
  db,
  clubData,
}: {
  db: Firestore;
  clubData: TClubData | undefined;
}) => {
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (shouldFetch) {
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  return (
    <Container>
      <ClubData data={clubData} db={db}></ClubData>
    </Container>
  );
};
export default Main;
