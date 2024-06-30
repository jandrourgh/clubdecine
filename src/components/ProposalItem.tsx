import { ConfigurationResponse, MovieDb, MovieResponse } from "moviedb-promise";
import { useEffect, useMemo, useState } from "react";
import { Card, CardImg, Row, Button, Container, Badge } from "react-bootstrap";
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
      moviedb
        .movieInfo({ id: proposal.proposal, language: "es" })
        .then((res) => {
          setMovie(res);
        });
    }
  }, [proposal]);

  return (
    <Card className="bg-black text-white rounded-0 d-flex flex-column h-100 border-0">
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
          <Container
            className={`${styles.cardBody} pt-3 d-flex flex-column h-100 flex-shrink-1 ${styles.textBg}`}
          >
            <div className="">
              <Row>
                <h2>{movie.original_title}</h2>
                <h3>
                  {movie.title !== movie.original_title && (
                    <i className="fw-lighter me-3">{movie.title}</i>
                  )}
                  <a
                    className="link-dark text-decoration-none badge text-bg-warning text-dark"
                    target="_blank"
                    href={`http://imdb.com/title/` + movie.imdb_id}
                    rel="noreferrer"
                  >
                    {/* <img src={imdb_logo} alt={`${movie.title} logo`} /> */}
                    IMDb
                  </a>
                </h3>
              </Row>
              <Row>
                <h5>Propuesta por {proposal.nombre} </h5>
              </Row>
            </div>
            <Row
              className={`pt-0 flex-grow-1 overflow-scroll mb-4`}
              style={{ height: "20px" }}
            >
              <div>
                <p>{proposal.reason}</p>
              </div>
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
