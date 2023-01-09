// import libraries and dependencies
import React, { useState, useEffect } from 'react'
import { Row, Col, Form } from 'react-bootstrap'

const TaktTimeLeftOver = ({workerTaktTime}) => {

    // creating state
    const [time, setTime] = useState(workerTaktTime)

    useEffect(() => {
        setInterval(()=> {
            setTime(prevTime => prevTime - 10);
        },10)
    },[])

    return (
        <>
            <Row >
                <Col className="mt-3 times text-center text-success">
                    LEFT OVER TAKT TIME
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <Form.Control className="mt-3 times text-center text-success"
                    type="text"
                    name="hours"
                    value={("0" + Math.floor((time / 3600000) % 60)).slice(-2)}
                    disabled
                    />
                </Col>
                <Col>
                    <Form.Control className="mt-3 times text-center text-success"
                    type="text"
                    name="minutes"
                    value={("0" + Math.floor((time / 60000) % 60)).slice(-2)}
                    disabled
                    />
                </Col>
                <Col>
                    <Form.Control className="mt-3 times text-center text-success"
                    type="text"
                    name="seconds"
                    value={("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                    disabled
                    />
                </Col>
                <Col></Col>
            </Row>
            <Row>
            </Row>
            <Row>
                <Col className="mt-3 times text-center text-success">
                    Congrats! you got some extra time.
                </Col>
            </Row>
            <Row>
                <Col className="mt-3 times text-center text-success">
                    Please take this oportunity to: 
                </Col>
            </Row>
            <Row>
                <Col className="mt-3 times text-center text-success">
                    * use the restroom
                    * stretch your muscles
                    * or improve this process
                </Col>
            </Row>

        </>
    )
}

export default TaktTimeLeftOver

