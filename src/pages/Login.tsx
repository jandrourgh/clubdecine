import { Firestore } from "firebase/firestore";
import { query, collection, where, getDocs } from "firebase/firestore";

import React, { useCallback, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TUserData } from "../interfaces/userData";

const Login = ({ db }: { db : Firestore}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const onSubmit = useCallback(
    async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      setSubmitting(true)
      if (name!=="") {
        const q = query(collection(db, "users"), where("nombre", "==", name));

        const querySnapshot = await getDocs(q);
        setSubmitting(false)
        if(querySnapshot.empty){
          setName("")
          setError(true)
        } else {
          setError(false)
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const userData = doc.data() as TUserData
            localStorage.setItem("nombre", userData.nombre)
            localStorage.setItem("club", userData.club)
            localStorage.setItem("id", doc.id)
            navigate("/")
          });
        }
      }
    },
    [name, db, navigate]
  );

  return (
    <>
      <Row>
        <Col>
          <Form onSubmit={(evt) => onSubmit(evt)}>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(evt) => setName(evt.currentTarget.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={submitting}>
              {error? "Ese nombre no existe, intentar otra vez" : "Log in"}
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
