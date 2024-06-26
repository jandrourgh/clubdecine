import { MovieResult } from "moviedb-promise";
import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormLabel,
  FormControl,
  Form,
  ModalFooter,
  Image,
} from "react-bootstrap";
const MovieData = ({
  data,
  baseURL,
  propose,
}: {
  data: MovieResult[];
  baseURL: string;
  propose: (id: number, name: string) => Promise<true | undefined>;
}) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [id, setId] = useState(0);
  const handlePropose = (id: number, name: string) => {
    setModal(true);
    setId(id);
    setName(name);
  };

  return (
    <Row>
      {data.map((movie, i) => (
        <Col
          lg={3}
          md={4}
          sm={6}
          xs={12}
          key={i}
          className="my-2"
          style={{
            backgroundImage: `url(${baseURL}${movie.backdrop_path})`,
            backgroundSize: "contain",
          }}
        >
          <Row
            xs={12}
            onClick={(evt) =>
              handlePropose(movie.id as number, movie.title as string)
            }
            style={{ backdropFilter: `blur(10px) brightness(50%)` }}
            className="text-white rounded-0"
          >
            <Col className="text-center p-2">
              <p>
                <b>{movie.original_title}</b> <br />{" "}
                <i className="tw-light">{movie.title}</i>
              </p>
              <span className="fw-light">
                <em>{`${movie.release_date?.slice(0, 4)}`}</em>
              </span>
            </Col>
            <Col xs={6} className="d-flex p-0">
              {movie.poster_path ? (
                <Image
                  style={{ width: "100%" }}
                  className="rounded-0"
                  src={`${baseURL}${movie.poster_path}`}
                ></Image>
              ) : (
                <div className="p-3 text-center">
                  {" "}
                  No hay imagen disponible :(
                </div>
              )}
            </Col>
          </Row>
        </Col>
      ))}
      <Modal show={modal} onHide={() => setModal(false)}>
        <ModalBody className="bg-dark p-4">
          <Form>
            <FormLabel>¿Por qué quieres proponer esta peli?</FormLabel>
            <FormControl
              onChange={(evt) => setReason(evt.target.value)}
              style={{ height: 100 }}
              as="textarea"
              value={reason}
            ></FormControl>
          </Form>
          <Row className="pt-4 ">
            <Col>
              <Button onClick={() => setModal(false)} variant="outline-danger">
                Cancelar
              </Button>
            </Col>
            <Col>
              <Button
                onClick={async () => {
                  const res = await propose(id, reason);
                  if (res) {
                    setModal(false);
                    setReason("");
                    setId(0);
                  }
                }}
                disabled={reason === ""}
                variant="light"
              >
                {Boolean(name.toLowerCase().match(/barbie/gm))
                  ? `Quiero seguir torturando a mis amigues`
                  : `Proponer ${name}`}
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Row>
  );
};
export default MovieData;
