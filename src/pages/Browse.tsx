import { Button, Container, Form, InputGroup, Navbar } from "react-bootstrap";
import MovieData from "../components/MovieData";
import { Firestore, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MovieResult } from "moviedb-promise";
import useFetch from "../hooks/useFetch";
import { PageProps } from "../interfaces/pageProps";
import { TStorageData } from "../interfaces/userData";
import useConfig from "../hooks/useConfig";
import { ChevronLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export const Browse = ({
  db,
  userData,
}: {
  db: Firestore;
  userData: TStorageData | undefined;
}) => {
  const [movieData, setMovieData] = useState<MovieResult[]>([]);
  const [query, setQuery] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [baseURL, setBaseURL] = useState("");
  const [shouldGetConfig, setShouldGetConfig] = useState(true);

  const [config] = useConfig(shouldGetConfig);
  const router = useNavigate();
  useEffect(() => {
    if (shouldGetConfig) {
      setShouldGetConfig(false);
    }
  }, [shouldGetConfig]);

  useEffect(() => {
    if (config) {
      setBaseURL(`${config.images.base_url}original`);
    }
  }, [config]);

  const [data] = useFetch(query, shouldFetch);

  useEffect(() => {
    if (data) {
      setMovieData(data);
    }
  }, [data]);

  const propose = async (id: number, reason: string) => {
    if (userData) {
      const userRef = doc(db, "users", userData.id);
      const res = await updateDoc(userRef, {
        proposal: id,
        reason: reason,
      });
      setMovieData([]);
      setQuery("");
      return true;
    }
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    setShouldFetch(true);
    evt.preventDefault();
  };

  return (
    <Container>
      <Navbar className="bg-black">
        <span className="py-2" onClick={() => router("/")}>
          <ChevronLeft /> Volver
        </span>
      </Navbar>
      <Form className="" onSubmit={(evt) => handleSubmit(evt)}>
        <InputGroup>
          <Form.Control
            value={query}
            onChange={(evt) => setQuery(evt.currentTarget.value)}
          ></Form.Control>
          <Button type="submit" variant="dark bg-black">
            Buscar
          </Button>
          {movieData.length > 0 && (
            <Button
              onClick={() => {
                setMovieData([]);
                setQuery("");
              }}
              variant="danger"
            >
              Limpiar
            </Button>
          )}
        </InputGroup>
      </Form>
      <MovieData
        data={movieData}
        baseURL={baseURL}
        propose={propose}
      ></MovieData>
    </Container>
  );
};
