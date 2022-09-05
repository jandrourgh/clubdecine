import { ConfigurationResponse, MovieDb, MovieResponse } from "moviedb-promise";
import { useEffect, useMemo, useState } from "react";
import { Card, CardImg, Row } from "react-bootstrap";
import { TProposal } from "../interfaces/clubData";

const ProposalItem = ({ proposal }: { proposal: TProposal }) => {
  const moviedb = useMemo(
    () => new MovieDb(process.env.REACT_APP_THEMOVIEDB as string),
    []
  );
  const [movie, setMovie] = useState<MovieResponse | undefined>(undefined);
const [imgConfig, setImgConfig] = useState<ConfigurationResponse | undefined>(undefined)
  useEffect(() => {
    if (proposal.proposal) {
      moviedb.movieInfo({ id: proposal.proposal }).then((res) => {
        console.log(res);
        setMovie(res);
      });
      moviedb.configuration().then(res => {
        setImgConfig(res)
      })
    }
  }, [moviedb, proposal]);

  return (
    <Card className="bg-black text-white rounded-0" style={{ minHeight: 400 }}>
      {movie && imgConfig ? (
        <>
          <Card.ImgOverlay>{}</Card.ImgOverlay>
          {movie.backdrop_path && <Card.Img src={`${imgConfig.images.base_url}original${movie.backdrop_path}`}/>}
          <Row className="p-4">
            <h2>{movie.title}</h2>
            <h5>
            Propuesta por {proposal.nombre}
                </h5></Row>
            <Row className="p-4 pt-0">
            <p>
              {proposal.reason}
            </p>

            </Row>
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
