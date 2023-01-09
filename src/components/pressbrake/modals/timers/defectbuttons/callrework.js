import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

// import { Modal, Form, Row, Col, Alert, Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'

// Component - receiving props from onthejob and passing item info and state (child to parrent)
const CallRework = ({props}) => {

    // creating state
    const [show, setShow] = useState(false) // state to show modal

    const recut = () => {
        setShow(true)
    }

    const handleConfirm = () => {
    }

    const handleClose = () => {
        setShow(false)
    }

    return(
        <>   
            <Button variant='warning' className=' mt-5 times-smaller fw-bold' onClick={recut}>REWORK</Button>

            <Modal show={show} onHide={handleClose} size="l" backdrop="static">

                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">
                        <Row className='piece-info'>
                            <Col md="auto">Cell: {props.item.status}</Col>
                            <Col md="auto">Part Number: {props.item.partNumber} </Col>
                            <Col md="auto">Quantity: {props.item.quantity}</Col>
                            <Col md="auto">QR Code: {props.item.qrCode.slice(-4).toUpperCase()}</Col>
                        </Row>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-2">
                        
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
    
                    <Button variant="primary" onClick={handleConfirm}>
                        Please, confirm task has been completed
                    </Button>


                    <Button variant="secondary" onClick={handleClose} type="button">
                        Cancel
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CallRework;