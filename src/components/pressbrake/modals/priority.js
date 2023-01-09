// import libraries and dependencies
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"

////////////////////////////// SOCKET //////////////////////////////
import { io } from 'socket.io-client'

import { Form, Button, Modal } from 'react-bootstrap'
import { BiArrowToTop } from 'react-icons/bi'

import { addItemToOneDuler } from '../../../store/reducers/oneduler'
import { changeProcessPriorityInOneDuler} from '../../../store/reducers/oneduler'

import { updateOrderInDulers } from '../../../store/thunks/dulers'

////////////////////////////// SOCKET //////////////////////////////
const socket = io('http://localhost:5002', { upgrade: false, transports: ['websocket'] })

const PressBrakePriority = (props) => {

    // calling reducers
    const oneduler = useSelector((state) => state.oneduler)
    const dispatch = useDispatch()

    // creating state
    const [show, setShow] = useState(false)

    ////////////////////////////// SOCKET //////////////////////////////
    const sendUpdate = () => {
        socket.emit('send_update', {message: 'Successful update', room: 'press-brake'});
    }

    // function to show all processes for this item and to change on the priority of 
    // the processes
    const handleShow = () => {
        dispatch(addItemToOneDuler(props.item))
        setShow(true)
    } 

    // function to change priority status in an item
    const handleChange = (e) => {
        dispatch(changeProcessPriorityInOneDuler({index: e.target.value}))
    }

    // function to confirm the changes made to the processes priority
    const handleConfirm = () => {
        dispatch(updateOrderInDulers(oneduler));
        setShow(false)
        sendUpdate()
    }

    // close page/component
    const handleClose = () => {
        setShow(false)
    }

    return (
        <>
            <BiArrowToTop onClick={handleShow} className='modal-icon' size='35' />

            <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
                <Modal.Header  closeButton>
                    <Modal.Title>Need to prioritise any of the following processes?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            { props.item.processes.map((process) => (
                                props.item.currentProcess > process.processID  ?
                                // in case process has already being processed
                                    (process.priority) ? 
                                        <Form.Check key={process.processID}
                                        checked
                                        label={process.process}
                                        value={process.processID}
                                        disabled
                                        />
                                    :
                                        <Form.Check key={process.processID}
                                        label={process.process}
                                        value={process.processID}
                                        disabled
                                        />
                                :
                                // in case process has NOT being processed yet
                                    (process.priority) ? 
                                        <Form.Check key={process.processID}
                                        defaultChecked
                                        label={process.process}
                                        value={process.processID}
                                        onClick={handleChange} 
                                        />
                                    :
                                        <Form.Check key={process.processID}
                                        label={process.process}
                                        value={process.processID}
                                        onClick={handleChange} 
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

export default PressBrakePriority