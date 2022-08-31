import { MovieResult } from 'moviedb-promise';
import React, { useState } from 'react'
import { Card, Row, Col, Button, Modal, ModalHeader, ModalBody, FormLabel, FormControl, Form, ModalFooter } from 'react-bootstrap'
const MovieData = ({data, baseURL, propose} : {data: MovieResult[]; baseURL: string; propose: (id:number, name:string )=>Promise<true|undefined>}) => {

    const [modal, setModal] = useState(false)
    const [name, setName] = useState("")
    const [reason, setReason] = useState("")
    const [id, setId] = useState(0)
    const handlePropose = (id: number, name:string) => {
        setModal(true)
        setId(id)
        setName(name)
    }

    return <Row>
        {
            data.map((movie, i)=> <Col lg={3} md={4} sm={6} xs={12}  key={i} className="p-3"><Card role="button" onClick={evt=>handlePropose(movie.id as number, movie.title as string)}  className="bg-black text-white rounded-0" >
                <Card.Header className="text-center">
                <h5>
                    {movie.title}  
                </h5>
                <span className="fw-light"><em>{`${movie.release_date?.slice(0, 4)}`}</em></span>   

                </Card.Header>
                {
                    movie.poster_path?<Card.Img src={`${baseURL}${movie.poster_path}`}>

                    </Card.Img> : <div className="p-3 text-center"> No hay imagen disponible :(
                    </div>
                }
                

            </Card></Col>)
        }
        <Modal show={modal} onHide={()=>setModal(false)}>
            <ModalBody className="bg-dark p-4">
                <Form>
                    <FormLabel>¿Por qué quieres proponer esta peli?</FormLabel>
                    <FormControl onChange={(evt) => setReason(evt.target.value)} type="textarea" value={reason}></FormControl>
                </Form>
                <Row className="pt-4 " >
                    <Col><Button onClick={()=>setModal(false)}variant="outline-danger">Cancelar</Button></Col>
                    <Col><Button onClick={async ()=>{
                        const res = await propose(id, reason)
                        if(res){
                            setModal(false)
                            setReason("")
                            setId(0)
                        }
                        }} disabled={reason === "" } variant="light">Proponer {name}</Button></Col>
                </Row>
            </ModalBody>
        </Modal>
    </Row>
}
export default MovieData