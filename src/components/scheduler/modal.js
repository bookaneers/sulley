// import libraries and dependencies
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"

////////////////////////////// SOCKET //////////////////////////////
import { io } from 'socket.io-client'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { ImRocket } from 'react-icons/im'

//import components and functions
import { addItemToOneDuler, changeDepartmentInOneDuler } from '../../store/reducers/oneduler'
import { updateOrderInDulers } from '../../store/thunks/dulers'

////////////////////////////// SOCKET //////////////////////////////
const socket = io('http://localhost:5002', { upgrade: false, transports: ['websocket'] })

const SchedulerModal = (props) => {

    const oneduler = useSelector((state) => state.oneduler)
    const dispatch = useDispatch()

    const [show, setShow] = useState(false)

////////////////////////////// SOCKET //////////////////////////////
    const sendUpdate = (oneduler) => {
        socket.emit('send_update', {message: 'Successful update', room: 'scheduler'});
        socket.emit('send_update', {message: 'Successful update', room: oneduler.oneItem.department});
    }

    const handleShow = () => {      
        dispatch(addItemToOneDuler(props.item))
        setShow(true)
        let newDepartment = ''
        props.item.processes.map((process) => (
            props.item.department === process.process ?            
                (process.processID !== props.item.processes.length + 1) ?
                    newDepartment = props.item.processes[process.processID + 1].process
                :null
            :null 
        ))
        dispatch(changeDepartmentInOneDuler(newDepartment))
    }    

    const handleConfirm = () => {
        dispatch(updateOrderInDulers(oneduler))
        dispatch(addItemToOneDuler({}))
        // this fetcher is read the updated database
        setShow(false)
////////////////////////////// SOCKET //////////////////////////////
        sendUpdate(oneduler)
    }

    const handleClose = () => {
        dispatch(addItemToOneDuler({}))
        setShow(false)
    }

    return (
        <>
            <ImRocket onClick={handleShow} className='modal-icon' size='35'/>
     
            <Modal show={show} onHide={handleClose} size="lg" backdrop="static"> 

                <Modal.Header  closeButton>
                    <Modal.Title>You are about to launch  ...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 >Part number: {props.item.partNumber}</h4>
                    <h5>from</h5>
                    <h4>order number: {props.item.salesOrder}</h4>
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

export default SchedulerModal