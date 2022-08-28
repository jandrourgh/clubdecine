import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
const MovieData = ({data, baseURL, propose} : {data: any; baseURL: string; propose: (id:number )=>void}) => {

    const handlePropose = (id: number) => {
        propose(id)
    }

    return <Row>
        {
            data.map((movie: any, i: number)=> <Col key={i}><Card>
                <Card.Header>
                    {movie.title}
                </Card.Header>
                <Card.Img src={`${baseURL}${movie.poster_path}`}>

                </Card.Img>
                <Card.Footer>
                    <Button onClick={evt=>handlePropose(movie.id)}>Proponer</Button>
                </Card.Footer>
            </Card></Col>)
        }
    </Row>
}
export default MovieData