// import libraries and dependencies
import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"

////////////////////////////// SOCKET //////////////////////////////
import { io } from 'socket.io-client'

import { Modal, Form, Row, Col, Alert, Button } from 'react-bootstrap'
import { GrUserWorker } from 'react-icons/gr'

//import components and functions
import PressBrakeChronometer from './timers/chronometer'
import TaktTimeLeftOver from './timers/takttimeleftover'

import { addItemToOneDuler, addEmployeeToProcess, addEmployeeTaktTime } from '../../../store/reducers/oneduler'
import { updateOrderInDulers } from '../../../store/thunks/dulers'
import { validateEmployee } from '../../../store/thunks/employees'

////////////////////////////// SOCKET //////////////////////////////
const socket = io('http://localhost:5002', { upgrade: false, transports: ['websocket'] })

const TubeLaserOnthejob = (props) => {

    const oneduler = useSelector((state) => state.oneduler)
    const dispatch = useDispatch()

    // creating state
    const [show, setShow] = useState(false) // state to show modal

    const [findName, setFindName] = useState(false) // state to find employee's name
    const [error, setError] = useState([false, '']) // state to display employee's name's error
    const [workerInfo, setWorkerInfo] = useState(false) // state to show employee's info

    const [scanBuildCard, setScanBuildCard] = useState(false) // state to scan build card and start task
    const [wrongCard, setWrongCard] = useState(false) // state to display card scan error

    const [clock, setClock] = useState(false) // state to display chronometer

    const [scanBuildCard2, setScanBuildCard2] = useState(false) // state to scan build card and stop task
    const [wrongCard2, setWrongCard2] = useState(false) // state to display card scan error

    // holds the company's takt time from the database
    const [companyTaktTime, setCompanyTaktTime] = useState(0)

    // holds employee's takt time from the chronometer component
    const [workerTaktTime, setWorkerTaktTime] = useState(0)

    const [confirm, setConfirm] = useState(false)

    const [leftOver, setLeftOver] = useState(false)

    // define variable to read the DOM
    const scanIdInput = useRef()
    const verifyBuildCardInput = useRef()
    const verifyBuildCardInput2 = useRef()

    ////////////////////////////// SOCKET //////////////////////////////
    const sendUpdate = (oneduler) => {
    socket.emit('send_update', {message: 'Successful update', room: 'tube-laser'});
    socket.emit('send_update', {message: 'Successful update', room: oneduler.oneItem.department});
}

    // error message 1
    const handleCloseError = () => {
        setWrongCard(false)
        setScanBuildCard(true)
    }

    // error message 1
    const handleCloseError2 = () => {
        setWrongCard2(false)
        setScanBuildCard2(true)
    }

    // function to show the modal
    const handleShow = () => {
        dispatch(addItemToOneDuler(props.item))
        setShow(true)
        setFindName(true)
    }

    // verify if employee is in the database
    const handleSearch = () => {
        setError([false, '']) //get ready of the error messages

        // define const to obtain inputs form the DOM
        const scanIdValue = scanIdInput.current.value;

        // define const to hold result form validatePartInput function
        const validatePart = validateScanId(scanIdValue);

        if (validatePart) {
            dispatch(validateEmployee(scanIdValue))
                .unwrap()
                .then((response) => { // activate toasts to SUCCESS or ERROR

                    if (response.result === 'not-found') {
                        setError([true, 'Employee not found in database. Try again.'])
                    }
                    else {
                        dispatch(addEmployeeToProcess(response.data))
                        setFindName(false)
                        setWorkerInfo(true)
                        setScanBuildCard(true)
                    }
                })
        }
    }

    // define function to validate errors
    const validateScanId = (scanIdValue) => {
        if (scanIdValue === '') {
            setError([true, 'Must scan employee batch'])
            return false
        }
        return true
    }

    const handleBuildCard = () => {
        const verifyBuildCardValue = verifyBuildCardInput.current.value
        if (verifyBuildCardValue.toUpperCase() !== oneduler.oneItem.qrCode.toUpperCase()) {
            setScanBuildCard(false)
            setWrongCard(true)
        } else {
            setCompanyTaktTime((oneduler.oneItem.processes[oneduler.oneItem.currentProcess].setupTime) +
                (oneduler.oneItem.processes[oneduler.oneItem.currentProcess].cycleTime * oneduler.oneItem.quantity))
            setScanBuildCard(false)
            setFindName(false)
            setClock(true)
            setClock(true)
            setScanBuildCard2(true)
        }
    }

    const handleBuildCard2 = () => {
        const verifyBuildCardValue2 = verifyBuildCardInput2.current.value
        if (verifyBuildCardValue2.toUpperCase() !== oneduler.oneItem.qrCode.toUpperCase()) {
            setScanBuildCard2(false)
            setWrongCard2(true)
        } else {
            dispatch(addEmployeeTaktTime((companyTaktTime * 60000) - workerTaktTime))
            setClock(false)
            setScanBuildCard2(false)
            openLeftOverTime(workerTaktTime)
        }
    }

    const openLeftOverTime = (workerTaktTime) => {
        setLeftOver(true)
        setTimeout(() => closeLeftOverTime(), workerTaktTime)
    }

    const closeLeftOverTime = () => {
        setLeftOver(false)
        setConfirm(true)
    }

    const handleConfirm = () => {
        const popUp = "toolbar=yes,scrollbars=yes,resizable=yes,top=900,left=400,width=900,height=900"
        window.open("https://inventive.fetchcore-cloud.com/startrobot/#/workflows", "_blank", popUp)
        dispatch(updateOrderInDulers(oneduler))
        setShow(false)
        setFindName(false)
        setError(false)
        setWorkerInfo(false)
        setWrongCard(false)
        setScanBuildCard(false)
        setClock(false)
        setScanBuildCard2(false)
        setWrongCard2(false)
        setConfirm(false)
        ////////////////////////////// SOCKET //////////////////////////////
        sendUpdate(oneduler)
    }
    // close page/component
    const handleClose = () => {
        setShow(false)
        setFindName(false)
        setError(false)
        setWorkerInfo(false)
        setWrongCard(false)
        setScanBuildCard(false)
        setClock(false)
        setScanBuildCard2(false)
        setWrongCard2(false)
        setConfirm(false)
    }

    return (
        <>
            <GrUserWorker onClick={handleShow} className='modal-icon' size='35' />

            <Modal show={show} onHide={handleClose} size="xl" backdrop="static">

                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">
                        <Row>
                            <Col md="auto">Cell: {props.item.status}</Col>
                            <Col md="auto">Part Number: {props.item.partNumber} </Col>
                            <Col md="auto">Quantity: {props.item.quantity}</Col>
                            <Col md="auto">QR Code: {props.item.qrCode.slice(-4)}</Col>
                        </Row>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-3">
                        {findName ?
                            <>
                                <Form.Control
                                    className='mt-3 times-smaller'
                                    type="text"
                                    placeholder="Scan your employee batch"
                                    name="scanid"
                                    ref={scanIdInput}
                                    autoFocus
                                />
                                {error[0] ?
                                    <Alert className='mt-3 alert-message'>
                                        {error[1]}
                                    </Alert>
                                    : null}
                                <Button onClick={handleSearch} className='mt-3 times-smaller' variant="primary" type="button">
                                    Find employee
                                </Button>
                            </>
                            : null}

                        {workerInfo ?
                            <>
                                <Form.Control
                                    className='mt-3 times-smaller'
                                    type='text'
                                    name="name"
                                    defaultValue={oneduler.oneItem.processes[oneduler.oneItem.currentProcess].employeeName}
                                    disabled={true}
                                />
                            </>
                            : null}

                        {scanBuildCard ?
                            <>
                                <Form.Control className="mt-3 times-smaller"
                                    type="text"
                                    placeholder="Scan BUILD CARD to start..."
                                    name="scantostart"
                                    ref={verifyBuildCardInput}
                                    autoFocus
                                />
                                <Button onClick={handleBuildCard} className='mt-3 times-smaller' variant="danger" type="button">
                                    Enter
                                </Button>
                            </>
                            : null}

                        {wrongCard ?
                            <>
                                <div className="d-grid gap-2">
                                    <Button onClick={handleCloseError} variant="danger" size="xxxl" className="mt-5 dumbass">
                                        Wrong Build Card
                                        <br />
                                        Please scan the correct card.
                                    </Button>
                                </div>
                            </>
                            : null}

                        {clock ?
                            <>
                                <Row className="text-center h1 mt-5">
                                    <Col>
                                        <Form.Label className="purple-text">SETUP TIME</Form.Label>
                                    </Col>

                                    <Col>
                                        <Form.Label className="purple-text">CYCLE TIME</Form.Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            className='text-center mt-3 times purple-text'
                                            type='text'
                                            name="setup-time"
                                            bg="warning"
                                            defaultValue={oneduler.oneItem.processes[oneduler.oneItem.currentProcess].setupTime}
                                            disabled={true}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            className='text-center mt-3 times purple-text'
                                            type='text'
                                            name="cycle-time"
                                            defaultValue={oneduler.oneItem.processes[oneduler.oneItem.currentProcess].cycleTime * oneduler.oneItem.quantity}
                                            disabled={true}
                                        />
                                    </Col>
                                </Row>

                                <Row className='text-center h1 mt-5'>
                                    <Col>
                                        <PressBrakeChronometer {...{ companyTaktTime, setWorkerTaktTime }} />
                                    </Col>
                                </Row>
                            </>
                            : null}


                        {scanBuildCard2 ?
                            <>
                                <Form.Control className="mt-5 times-smaller"
                                    type="text"
                                    placeholder="Scan BUILD CARD once again to end process..."
                                    name="scantostart"
                                    ref={verifyBuildCardInput2}
                                    autoFocus
                                />
                                <Button onClick={handleBuildCard2} className='mt-3 times-smaller' variant="danger" type="button">
                                    Enter
                                </Button>
                            </>

                            : null}

                        {wrongCard2 ?
                            <>
                                <div className="d-grid gap-2">
                                    <Button onClick={handleCloseError2} variant="danger" size="xxxl" className="mt-3 dumbass">
                                        Wrong Build Card
                                        <br />
                                        Please scan the correct card.
                                    </Button>
                                </div>
                            </>
                            : null}


                        {leftOver ?
                            <>
                                <Row className='text-center h1 mt-5'>
                                    <Col>
                                        <TaktTimeLeftOver {...{ workerTaktTime }} />
                                    </Col>
                                </Row>
                            </>
                            : null}


                        {confirm ?
                            <>
                                <Row className="text-center h1 mt-5 purple-text">
                                    <Col>
                                        <Form.Label>ORIGINAL TAKT TIME</Form.Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            className='text-center mt-3 times purple-text'
                                            type='text'
                                            name="takt-time"
                                            bg="warning"
                                            defaultValue={companyTaktTime}
                                            disabled={true}
                                        />
                                    </Col>
                                </Row>


                                <Row className="text-center h1 mt-5 purple-text">
                                    <Col>
                                        <Form.Label>YOUR TAKT TIME</Form.Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            className='text-center mt-3 times purple-text'
                                            type='text'
                                            name="takt-time"
                                            bg="warning"
                                            defaultValue={oneduler.oneItem.processes[oneduler.oneItem.currentProcess - 1].employeeTaktTime}
                                            disabled={true}
                                        />
                                    </Col>
                                </Row>
                            </>
                            : null}
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    {confirm ?
                        <Button variant="primary" onClick={handleConfirm}>
                            Please, confirm task has been completed
                        </Button>
                        : null}

                    <Button variant="secondary" onClick={handleClose} type="button">
                        Cancel
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TubeLaserOnthejob