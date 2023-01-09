// import libraries and dependencies
import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

// Component - receiving props from onthejob and passing item info and state (child to parrent)
const TubeLaserChronometer = ({companyTaktTime, setWorkerTaktTime}) => {

    // creating state
    const [time, setTime] = useState(companyTaktTime*60000)
    const [start, setStart] = useState(true)

    useEffect(() => {
        setWorkerTaktTime(time)
        let interval = null;
        if(start) {
            interval = setInterval(()=> {
                setTime(prevTime => prevTime - 10);
            },10)
        } else {
            clearInterval(interval)
        }
        return () => {
            clearInterval(interval)
        }
    },[time, start, setWorkerTaktTime])

    // stop chronometer
    const stopButton = () => {
        setStart(false)
    }
    // restart chronometer
    const startButton = () => {
        setStart(true)
    }

    return(
        <>   
        {/* chronometer starts at company's takt time, and decrease time until 0*/}
            { time > 0 ?
                <>
                    <Form.Label className='text-success'>TAKT TIME</Form.Label>
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
                </>
            :
            // chronometer restarts 0, and goes on until employee scan buil card*
                <>    
                    <Form.Label className='text-danger'>TAKT TIME</Form.Label>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Form.Control className="mt-3 times text-center text-danger "
                            type="text"
                            name="hours"
                            value={("0" + Math.floor((-time / 3600000) % 60)).slice(-2)}
                            disabled
                            />
                        </Col>
                        <Col>
                            <Form.Control className="mt-3 times text-center text-danger"
                            type="text"
                            name="minutes"
                            value={("0" + Math.floor((-time / 60000) % 60)).slice(-2)}
                            disabled
                            />
                        </Col>
                        <Col>
                            <Form.Control className="mt-3 times text-center text-danger"
                            type="text"
                            name="seconds"
                            value={("0" + Math.floor((-time / 1000) % 60)).slice(-2)}
                            disabled
                            />
                        </Col>
                        <Col></Col>
                    </Row>
                </>
            }           

            <Row>
                <Col>
                    <Button variant='secondary' className='mt-5 times-smaller' onClick={stopButton}>Stop for lunch</Button>
                </Col>
                <Col>
                    <Button variant='secondary' className='mt-5 times-smaller' onClick={startButton}>Return from lunch</Button>
                </Col>
            </Row>
        </>
    )
}

export default TubeLaserChronometer;