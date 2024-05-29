import { ConfigurationResponse, MovieDb, MovieResponse } from "moviedb-promise";
import { useEffect, useMemo, useState } from "react";
import { Card, CardImg, Row, Button, Container } from "react-bootstrap";
import { TProposal } from "../interfaces/clubData";
import styles from "./ProposalItem.module.scss";

const ProposalItem = ({
  proposal,
  imgConfig,
}: {
  proposal: TProposal;
  imgConfig: ConfigurationResponse;
}) => {
  const [movie, setMovie] = useState<MovieResponse | undefined>(undefined);

  useEffect(() => {
    if (proposal.proposal) {
      const moviedb = new MovieDb(process.env.REACT_APP_THEMOVIEDB as string);
      moviedb.movieInfo({ id: proposal.proposal }).then((res) => {
        setMovie(res);
      });
    }
  }, [proposal]);

  return (
    <Card
      className="bg-black text-white rounded-0"
      style={{
        height: "100%",
      }}
    >
      {movie && imgConfig ? (
        <>
          <div
            className={styles.overlay}
            style={{
              backgroundImage: `url(${imgConfig?.images.base_url}original${movie?.poster_path})`,
            }}
          ></div>
          {movie.backdrop_path && (
            <Card.Img
              className={styles.image}
              src={`${imgConfig.images.base_url}original${movie.backdrop_path}`}
            />
          )}
          <Container className={`${styles.cardBody} pt-3`}>
            <Row>
              <h2>
                <a
                  className="link-light text-decoration-none"
                  target="_blank"
                  href={`http://imdb.com/title/` + movie.imdb_id}
                  rel="noreferrer"
                >
                  {movie.original_title}
                </a>
              </h2>

              <h5>Propuesta por {proposal.nombre} </h5>
            </Row>
            <Row className="pt-0">
              <p>{proposal.reason}</p>
            </Row>
          </Container>
        </>
      ) : (
        <Card.Body className="d-flex justify-content-center align-items-center p-5">
          {proposal.nombre} todavía no ha propuesto una peli
        </Card.Body>
      )}
    </Card>
  );
};
export default ProposalItem;
