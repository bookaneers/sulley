import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Modal, Form, Row, Col, Alert, Button }  from 'react-bootstrap'

////////////////////////////// SOCKET //////////////////////////////
import { io } from 'socket.io-client'

import { GiNestEggs } from 'react-icons/gi'
import { GiNestBirds } from 'react-icons/gi'

import { addItemToOneDuler, addEmployeeToProcess, dispatchInOneDuler, changeDepartmentInOneDuler } from '../../../store/reducers/oneduler'
import { updateOrderInDulers } from '../../../store/thunks/dulers'
import { validateEmployee } from '../../../store/thunks/employees'

////////////////////////////// SOCKET //////////////////////////////
const socket = io('http://localhost:5002', { upgrade: false, transports: ['websocket'] })

const NestingDispatch = (props) => {

    const oneduler = useSelector((state) => state.oneduler)
    const dispatch = useDispatch()

    // creating state
    const [show, setShow] = useState(false) // state to show modal

    const [findName, setFindName] = useState(false) // state to find employee's name
    const [error,setError] = useState([false, '']) // state to display employee's name's error
    const [workerInfo, setWorkerInfo] = useState(false) // state to show employee's info

    const [scanBuildCard, setScanBuildCard] = useState(false) // state to scan build card and start task
    const [wrongCard, setWrongCard] = useState(false) // state to display card scan error

    const [message, setMessage] = useState(false)
    const [confirm, setConfirm] = useState(false)

    // define variable to read the DOM
    const scanIdInput = useRef()
    const verifyBuildCardInput = useRef()

    ////////////////////////////// SOCKET //////////////////////////////
    const sendUpdate1 = (oneduler) => {
        socket.emit('send_update', {message: 'Successful update', room: 'nesting'});
    }

    const sendUpdate2 = (oneduler) => {
        socket.emit('send_update', {message: 'Successful update', room: 'nesting'});
        socket.emit('send_update', {message: 'Successful update', room: oneduler.oneItem.department});
    }

    // error message 1
    const handleCloseError = () => {
        setWrongCard(false)
        setScanBuildCard(true)
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
            .then((response)=>{ // activate toasts to SUCCESS or ERROR

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
        if (props.item.status === 'queue') {
            const verifyBuildCardValue = verifyBuildCardInput.current.value
            if (verifyBuildCardValue.toUpperCase() !== oneduler.oneItem.qrCode.toUpperCase()) {
                setScanBuildCard(false)
                setWrongCard(true)
            } else {
                dispatch(dispatchInOneDuler('wip'))
                setScanBuildCard(false)
                setFindName(false)
                setConfirm(true)
                setWorkerInfo(false)
                setMessage(true)
            }
        } else {
            const verifyBuildCardValue = verifyBuildCardInput.current.value
            if (verifyBuildCardValue.toUpperCase() !== oneduler.oneItem.qrCode.toUpperCase()) {
                setScanBuildCard(false)
                setWrongCard(true)
            } else {
                dispatch(changeDepartmentInOneDuler())
                setScanBuildCard(false)
                setFindName(false)
                setConfirm(true)
                setWorkerInfo(false)
                setMessage(true)
            }
        }
    }

    const handleConfirm = () => {
        dispatch(updateOrderInDulers(oneduler))
        setShow(false)
        setFindName(false)
        setError(false)
        setWorkerInfo(false)
        setWrongCard(false)
        setScanBuildCard(false)
        setConfirm(false)
        setMessage(false)
        if (oneduler.oneItem.status === 'wip') { sendUpdate1(oneduler) }
        else { sendUpdate2(oneduler) }
    }
    // close page/component
    const handleClose = () => {
        setShow(false)
        setFindName(false)
        setError(false)
        setWorkerInfo(false)
        setWrongCard(false)
        setScanBuildCard(false)
        setConfirm(false)
        setMessage(false)
    }

    return (
        <>
            { props.item.status === 'queue' ?
                <GiNestEggs onClick={handleShow} className='modal-icon' size='35' />
            :
                <GiNestBirds onClick={handleShow} className='modal-icon' size='35' />
            }

            <Modal show={show} onHide={handleClose} size="xl" backdrop="static">

                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">
                        <Row className='piece-info'>
                            <Col md="auto">Cell: {props.item.status}</Col>
                            <Col md="auto">Part Number: {props.item.partNumber} </Col>
                            <Col md="auto">Quantity: {props.item.quantity}</Col>
                            <Col md="auto">QR Code: {props.item.qrCode.slice(-4)}</Col>
                        </Row>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-3">
                        { findName ?
                            <>
                                <Form.Control
                                className='mt-3 times-smaller'
                                type="text"
                                placeholder="Scan your employee batch"
                                name="scanid"
                                ref={scanIdInput}
                                autoFocus
                                />
                                { error[0] ?
                                    <Alert className='mt-3 alert-message'>
                                        {error[1]}
                                    </Alert>
                                :null}
                                <Button onClick={handleSearch} className='mt-3 times-smaller' variant="primary" type="button">
                                    Find employee
                                </Button>
                            </>
                        :null}

                        { workerInfo ?
                            <>
                                <Form.Control
                                className='mt-3 times-smaller'
                                type='text'
                                name="name"
                                defaultValue={oneduler.oneItem.processes[oneduler.oneItem.currentProcess].employeeName}
                                disabled={true}
                                />
                            </>
                        :null }

                        { scanBuildCard ?
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
                        :null}

                        { wrongCard ?
                            <>
                                <div className="d-grid gap-2">
                                    <Button onClick={handleCloseError} variant="danger" size="xxxl" className="mt-5 dumbass">
                                            Wrong Build Card
                                            <br/>
                                            Please scan the correct card.
                                    </Button>
                                </div>
                            </>
                        :null}

                        { message ?
                            <h3 className='text-center'>PROCESS IS COMPLETED</h3>
                        :null}

                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    { confirm ?
                        <Button variant="primary" onClick={handleConfirm}>
                            Moving on to the next process
                        </Button>
                    :null}

                    <Button variant="secondary" onClick={handleClose} type="button">
                        Cancel
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NestingDispatch
