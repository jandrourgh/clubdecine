import {
  Firestore,
  query as firebaseQuery,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MovieData from "../components/MovieData";
import useConfig from "../hooks/useConfig";
import useFetch from "../hooks/useFetch";
import { TUserData } from "../interfaces/userData";
import { doc, updateDoc } from "firebase/firestore";
import ClubData from "../components/ClubData";
import { TClubData } from "../interfaces/clubData";
import { MovieResult } from "moviedb-promise";

const Main = ({ db }: { db: Firestore }) => {
  const [query, setQuery] = useState("");
  const [movieData, setMovieData] = useState<MovieResult[]>([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [shouldGetConfig, setShouldGetConfig] = useState(true);
  const [baseURL, setBaseURL] = useState("");
  const navigate = useNavigate();
  const [userData, setUserData] = useState<
    { club: string; nombre: string; id: string } | undefined
  >(undefined);
  const [clubData, setClubData] = useState<TClubData | undefined>(undefined);

  const [data] = useFetch(query, shouldFetch);
  const [config] = useConfig(shouldGetConfig);

  useEffect(() => {
  }, [userData]);

  useEffect(()=>{
  }, [clubData])

  useEffect(() => {
    const nombre = localStorage.getItem("nombre");
    const club = localStorage.getItem("club");
    const id = localStorage.getItem("id");
    const fetchClubData = async () => {
      const q = firebaseQuery(collection(db, "clubs"), where("id", "==", club));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setClubData(doc.data() as TClubData);
      });
    };
    if (!nombre || !club || !id) {
      navigate("/login");
    } else {
      const storageUserData: { club: string; nombre: string; id: string } = {
        club: club,
        nombre: nombre,
        id: id,
      };
      setUserData(storageUserData);
      fetchClubData();
    }
  }, [navigate, db]);

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

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    setShouldFetch(true);
    evt.preventDefault();
  };

  useEffect(() => {
    if (shouldFetch) {
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  useEffect(() => {
    if (data) {
      setMovieData(data);
    }
  }, [data]);

  const propose = async (id: number, reason:string) => {
    if (userData) {
      const userRef = doc(db, "users", userData.id);
      const res = await updateDoc(userRef, {
        proposal: id,
        reason: reason
      });
      setMovieData([]);
      setQuery("");
      return true
    }
  };

  return (
    <>
      <ClubData data={clubData} db={db}></ClubData>
      <Row className="p-3">
        <Form onSubmit={(evt) => handleSubmit(evt)}>
          <InputGroup>
          <Form.Control
            value={query}
            onChange={(evt) => setQuery(evt.currentTarget.value)}
          ></Form.Control>
          <Button type="submit" variant="dark bg-black">Buscar</Button>
          {
            movieData.length>0 && <Button onClick={()=>{
              setMovieData([])
              setQuery("")
            }} variant="danger">Limpiar</Button>
          }
          </InputGroup>
        </Form>

      </Row>
      <MovieData
        data={movieData}
        baseURL={baseURL}
        propose={propose}
      ></MovieData>
    </>
  );
};
export default Main;
