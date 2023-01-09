import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"

////////////////////////////// SOCKET //////////////////////////////
import { io } from 'socket.io-client'

import { Form, Button, Modal } from 'react-bootstrap'
import { MdAssignmentTurnedIn } from 'react-icons/md'

import { addItemToOneDuler } from '../../../store/reducers/oneduler'
import { assignCell } from '../../../store/reducers/oneduler'

import { updateOrderInDulers } from '../../../store/thunks/dulers'

////////////////////////////// SOCKET //////////////////////////////
const socket = io('http://localhost:5002', { upgrade: false, transports: ['websocket'] })

const TubeBenderCell = (props) => {

    // calling reducers
    const oneduler = useSelector((state) => state.oneduler)
    const dispatch = useDispatch()

    // creating state
    const [show, setShow] = useState(false)

    ////////////////////////////// SOCKET //////////////////////////////
    const sendUpdate = () => {
        socket.emit('send_update', {message: 'Successful update', room: 'tube-bender'});
    }

    // function to show all processes for this item and to change the location of 
    // the processes - from hopper to cells
    const handleShow = () => {
        dispatch(addItemToOneDuler(props.item))
        setShow(true)
    }

    // function to change location of an item
    const handleChange = (e) => {
        dispatch(assignCell(e.target.value))
    }

    const handleConfirm = () => {
        dispatch(updateOrderInDulers(oneduler));
        setShow(false)
        sendUpdate()
    }

    const handleClose = () => {
        setShow(false)
    }

    return (
        <>
            <MdAssignmentTurnedIn onClick={handleShow} className='modal-icon' size='35' />

            <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
                <Modal.Header  closeButton>
                    <Modal.Title>Please select cell...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group  className="mb-3">
                            { ['queue', 'tb-01'].map((cell, index) => (

                                props.item.status === cell ?
                                    <Form.Check key={index}
                                    type="radio"
                                    defaultChecked
                                    name="radio"
                                    label={cell}
                                    value={cell}
                                    onChange={handleChange} 
                                    />
                                :
                                    <Form.Check key={index}
                                    type="radio"
                                    name="radio"
                                    label={cell}
                                    value={cell}
                                    onChange={handleChange} 
                                    />
                                ))
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        CONFIRM
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TubeBenderCell