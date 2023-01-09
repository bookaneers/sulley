// import libraries and dependencies
import React, { useState, useEffect } from 'react'
import { Row, Col, Form } from 'react-bootstrap'

import PullTheRope from './pulltherope'

// Component - receiving props from onthejob and passing item info and state (child to parrent)
const PressBrakeChronometer = ({ setRecut, setRework, setScanBuildCard2, setOnTheJobView, setWorkerRopeTime, 
    companyTaktTime, setWorkerTaktTime, setShowModal, props }) => {

    // creating state
    const [taktTime, setTaktTime] = useState(companyTaktTime*60000)
    const [startTaktTime, setStartTaktTime] = useState(true)
    const [chronoView, setChronoView] = useState(true)

    useEffect(() => {
        setWorkerTaktTime(taktTime)
        let interval = null;
        if(startTaktTime) {
            interval = setInterval(()=> {
                setTaktTime(prevTime => prevTime - 10);
            },10)
        } else {
            clearInterval(interval)
        }
        return () => {
            clearInterval(interval)
        }
    },[taktTime, startTaktTime, setWorkerTaktTime])

    return(
        <>   
            { chronoView ?
                <>
                    { taktTime > 0 ?
                        <>
                            <Form.Label className='text-success mt-3'>TAKT TIME</Form.Label>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Control className="times text-center text-success"
                                    type="text"
                                    name="hours"
                                    value={("0" + Math.floor((taktTime / 3600000) % 60)).slice(-2)}
                                    disabled
                                    />
                                </Col>
                                <Col>
                                    <Form.Control className="times text-center text-success"
                                    type="text"
                                    name="minutes"
                                    value={("0" + Math.floor((taktTime / 60000) % 60)).slice(-2)}
                                    disabled
                                    />
                                </Col>
                                <Col>
                                    <Form.Control className="times text-center text-success"
                                    type="text"
                                    name="seconds"
                                    value={("0" + Math.floor((taktTime / 1000) % 60)).slice(-2)}
                                    disabled
                                    />
                                </Col>
                                <Col></Col>
                            </Row>
                        </>
                    :
                        // chronometer restarts 0, and goes on until employee scan buil card*
                        <>    
                            <Form.Label className='text-danger mt-3'>TAKT TIME</Form.Label>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form.Control className="times text-center text-danger "
                                    type="text"
                                    name="hours"
                                    value={("0" + Math.floor((-taktTime / 3600000) % 60)).slice(-2)}
                                    disabled
                                    />
                                </Col>
                                <Col>
                                    <Form.Control className="times text-center text-danger"
                                    type="text"
                                    name="minutes"
                                    value={("0" + Math.floor((-taktTime / 60000) % 60)).slice(-2)}
                                    disabled
                                    />
                                </Col>
                                <Col>
                                    <Form.Control className="times text-center text-danger"
                                    type="text"
                                    name="seconds"
                                    value={("0" + Math.floor((-taktTime / 1000) % 60)).slice(-2)}
                                    disabled
                                    />
                                </Col>
                                <Col></Col>
                            </Row>
                        </>
                    }   
                </>
            :null}
        
            <Col>
                <PullTheRope {...{ setRecut, setRework, setScanBuildCard2, setOnTheJobView, setChronoView, 
                setWorkerRopeTime, setTaktTime, setStartTaktTime, setWorkerTaktTime, setShowModal, props }}/>
            </Col>
        </>
    )
}

export default PressBrakeChronometer;