import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { TClubData, TProposal } from "../interfaces/clubData";
import ProposalItem from "./ProposalItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCreative } from "swiper/modules";
import { Container, Row, Button } from "react-bootstrap";
import styles from "./ClubData.module.scss";
import { useNavigate } from "react-router-dom";
import { ConfigurationResponse, MovieDb } from "moviedb-promise";

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
  const [imgConfig, setImgConfig] = useState<ConfigurationResponse | undefined>(
    undefined
  );
  useEffect(() => {
    const moviedb = new MovieDb(process.env.REACT_APP_THEMOVIEDB as string);
    moviedb.configuration().then((res) => {
      setImgConfig(res);
    });
  }, []);
  const router = useNavigate();
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

  return (
    <>
      {proposalsSorted && (
        <Row className="">
          <Swiper
            pagination={true}
            loop={true}
            modules={[Pagination, EffectCreative]}
            mousewheel={true}
            effect="creative"
            className={`p-0 min-vh-100 ${styles.swiper}`}
            creativeEffect={{
              prev: { opacity: 0, translate: ["-100%", 0, 0] },
              next: { opacity: 0, translate: ["100%", 0, 0] },
            }}
          >
            {imgConfig &&
              proposalsSorted.map((proposal, i) => (
                <SwiperSlide key={i}>
                  <ProposalItem proposal={proposal} imgConfig={imgConfig} />
                </SwiperSlide>
              ))}
          </Swiper>
          <Row
            className="position-absolute pe-0"
            style={{ bottom: 30, zIndex: 20 }}
          >
            <h1 className="d-flex pe-0 justify-content-between">
              {data?.nombre}{" "}
              <Button variant="light" onClick={() => router("/browse")}>
                Proponer
              </Button>
            </h1>{" "}
          </Row>
        </Row>
      )}
    </>
  );
};
export default ClubData;
