import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

////////////////////////////// SOCKET //////////////////////////////
import { io } from 'socket.io-client'

import CallRecut from './defectbuttons/callrecut'
import CallRework from './defectbuttons/callrework'

////////////////////////////// SOCKET //////////////////////////////
const socket = io('http://localhost:5002', { upgrade: false, transports: ['websocket'] })

// Component - receiving props from onthejob and passing item info and state (child to parrent)
const PullTheRope = ({setRecut, setRework, setScanBuildCard2, setOnTheJobView, setChronoView, 
    setWorkerRopeTime, setTaktTime, setStartTaktTime, setWorkerTaktTime, setShowModal, props}) => {

    const [time, setTime] = useState(0)
    const [startRopeTime, setStartRopeTime] = useState(false)
    const [pulling, setPulling] = useState(false)
    const [yellowMessage, setYellowMessage] = useState(true)
    const [redMessage, setRedMessage] = useState(false)
    const [callRedTeam, setCallRedTeam] = useState(false)

    const [pullTheRopeView, setPullTheRopeView] = useState(true)
    const [resolveBtn, setResolveBtn] = useState(false)
    const [redTeamBtn, setRedTeamBtn] = useState(false)
    const [recutBtn, setRecutBtn] = useState(false)
    const [reworkBtn, setReworkBtn] = useState(false)

    useEffect(() => {
        setWorkerRopeTime(time)
        let interval = null;
        if(startRopeTime) {
            interval = setInterval(()=> {
                setTime(prevTime => prevTime + 10);
            },10)
            if (time === 30000) {
                setRedMessage(true)
                setYellowMessage(false)
                setCallRedTeam(false)
                ////////////////////////////// SOCKET //////////////////////////////
                socket.emit('send_update', {status: props.item.status, color: 'red', room: 'press-brake-dashboard'});
            }
            if (time === 90000) {
                setRedMessage(false)
                setYellowMessage(false)
                setCallRedTeam(true)
            }
        } else {
            clearInterval(interval)
        }
        return () => {
            clearInterval(interval)
        }
    },[time, startRopeTime, props.item.status, setWorkerRopeTime])

    const pullTheRope = () => {
        // setScanBuildCard2(false)
        setPulling(true)
        setYellowMessage(true)
        setRedMessage(false)
        setStartRopeTime(true)
        setResolveBtn(true)
        setRedTeamBtn(true)
        setRecutBtn(true)
        setReworkBtn(true)
        setScanBuildCard2(false)
        ////////////////////////////// SOCKET //////////////////////////////
        socket.emit('send_update', {status: props.item.status, color: 'yellow', room: 'press-brake-dashboard'});
    }

    const resolved = () => {
        // setScanBuildCard2(true)
        setPulling(false)
        setYellowMessage(true)
        setRedMessage(false)
        setCallRedTeam(false)
        setStartRopeTime(false)
        setTime(time)
        setWorkerRopeTime(false)
        setResolveBtn(false)
        setRedTeamBtn(false)
        setRecutBtn(false)
        setReworkBtn(false)
        setScanBuildCard2(true)
        ////////////////////////////// SOCKET //////////////////////////////
        socket.emit('send_update', {status: props.item.status, color: 'green', room: 'press-brake-dashboard'});
    }

    const escalate = () => {
        setYellowMessage(false)
        setRedMessage(false)
        setCallRedTeam(true)
        ////////////////////////////// SOCKET //////////////////////////////
        socket.emit('send_update', {status: props.item.status, color: 'red', room: 'press-brake-dashboard'});
    }

    return(
        <> 
            { pullTheRopeView ?
                <>
                    <Row>   
                        { !pulling ? 
                            <Col>
                                <Button variant='warning' className='mt-5 times-smaller' onClick={pullTheRope}>Pull the rope</Button>
                            </Col>
                        :
                            <>
                                <Form.Label className='text-warning mt-5'>ROPE HAS BEEN PULLED</Form.Label>
                                <Row>
                                    <Col></Col>
                                    <Col>
                                        <Form.Control className="times text-center text-warning bg-black"
                                        type="text"
                                        name="hours"
                                        value={("0" + Math.floor((time / 3600000) % 60)).slice(-2)}
                                        disabled
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control className="times text-center text-warning bg-black"
                                        type="text"
                                        name="minutes"
                                        value={("0" + Math.floor((time / 60000) % 60)).slice(-2)}
                                        disabled
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control className="times text-center text-warning bg-black"
                                        type="text"
                                        name="seconds"
                                        value={("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                                        disabled
                                        />
                                    </Col>
                                    <Col></Col>
                                </Row>

                                <Row className="mt-3 times text-center times-smaller">
                                    { yellowMessage ?
                                        <Col>
                                            Stopping is Good! 
                                            A call to your fellow team members has been sent.
                                            Turn your <span className='text-warning'> ANDON </span> light to <span className='text-warning'> YELLOW </span>.
                                        </Col>
                                    :null}

                                    { redMessage ?
                                        <Col>
                                            Ten minutes has passed! 
                                            A call to your Team Lead has been sent.
                                            Turn your <span className='text-danger'> ANDON </span> light to <span className='text-danger'> RED </span>.
                                        </Col>
                                    :null}
                                    { callRedTeam ?
                                        <Col>
                                            <span className='text-danger'> RED TEAM </span> has been called.  
                                            Please prepare for their arrival.
                                        </Col>
                                    :null}
                                </Row >
                            </>  
                        }
                    </Row>
                </>
            :null}
            <Row>
                    { resolveBtn ?
                        <Col>
                            <Button variant='success' className='mt-5 times-smaller' onClick={resolved}>Resolve</Button>
                        </Col>
                    :null}
                    { redTeamBtn ?
                        <Col>
                            <Button variant='danger' className='mt-5 times-smaller' onClick={escalate}>Red Team</Button>
                        </Col>
                    :null}
                    { recutBtn ?
                        <Col>
                            <CallRecut {...{setRecut, setOnTheJobView, setChronoView, setPullTheRopeView,
                            setResolveBtn, setRedTeamBtn, setReworkBtn, setWorkerRopeTime, setTaktTime, 
                            setStartTaktTime, setTime, setStartRopeTime, setWorkerTaktTime, setShowModal, props}}/>
                        </Col>
                    :null}
                    { reworkBtn ?
                        <Col>
                            <CallRework {...{setRecut, setRework, setOnTheJobView, setChronoView, setPullTheRopeView,
                            setWorkerRopeTime, setWorkerTaktTime, setShowModal, props}}/>
                        </Col>
                    :null}
            </Row>
        </>
    )
}

export default PullTheRope;