// import libraries and dependencies
import React,{ useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Row, Col } from "react-bootstrap"

////////////////////////////// SOCKET //////////////////////////////
import { io } from 'socket.io-client'

import { TiDelete, TiEdit } from 'react-icons/ti';
import { GiSave } from 'react-icons/gi';
import { RiArrowDownCircleFill, RiArrowUpCircleFill } from 'react-icons/ri';

//import components and functions
import { fetchLasers, deleteJobInLasers, 
    updateJobInLasers, updateJobOrderInLasers, updateJobOrderInLasers2} from '../../../store/thunks/lasers';

////////////////////////////// SOCKET //////////////////////////////
const socket = io('http://localhost:5002', { upgrade: false, transports: ['websocket'] })

const FridayNotCompleted = () => {

    const jobs = useSelector((state) => state.lasers.tasks.jobs);

    const [changeJob, setChangeJob] = useState(null)
    const dispatch = useDispatch()

    ////////////////////////////// SOCKET //////////////////////////////
    const [fetchData, setFetchData] = useState(true)

    socket.emit('room', 'friday-not-completed')
    socket.on('received_update', (data) => {
        setFetchData(true)
    })

    ////////////////////////////// SOCKET //////////////////////////////
    const sendUpdate = () => {
        socket.emit('send_update', {message: 'Successful update', room: 'friday-not-completed'});
        setFetchData(true)
    }

    useEffect(()=>{
        dispatch(fetchLasers({}))
        setFetchData(false)
    }, [dispatch, fetchData])

    const typeInput = useRef();
    const programInput = useRef();
    const materialInput = useRef();
    const sizeInput = useRef();
    const taktInput = useRef();
    const statusInput = useRef();
    const notesInput = useRef();
    const dotwInput = useRef();

    const moveUpOnDeck = (indexToBeMovedUp, indexInfo) => {

        if (indexToBeMovedUp === 0 ) return
        const moveUpOnDeckObj = {}
        moveUpOnDeckObj['firstIndex'] = indexInfo;
        for (let i = indexToBeMovedUp - 1 ; i >= 0; i-- ) {
            if ((jobs[i].status !== 'completed' && jobs[i].status !== 'completed-late') && jobs[i].dayOfTheWeek === 5) {
                moveUpOnDeckObj['secondIndex'] = jobs[i];
                break;
            }
        }
        console.log('moveUpOnDeckObj : ', moveUpOnDeckObj)
        dispatch(updateJobOrderInLasers(moveUpOnDeckObj))
        dispatch(updateJobOrderInLasers2(moveUpOnDeckObj))
        sendUpdate()
    }

    const moveDownOnDeck = (indexToBeMovedDown, indexInfo) => {

        if (indexToBeMovedDown === jobs.length - 1 ) return
        const moveDownOnDeckObj = {}
        moveDownOnDeckObj['firstIndex'] = indexInfo;
        for (let i = indexToBeMovedDown + 1 ; i < jobs.length; i++ ) {
            if ((jobs[i].status !== 'completed' && jobs[i].status !== 'completed-late') && jobs[i].dayOfTheWeek === 5) {
                moveDownOnDeckObj['secondIndex'] = jobs[i];
                break;
            }
        }
        console.log('moveDownOnDeckObj : ', moveDownOnDeckObj)
        dispatch(updateJobOrderInLasers(moveDownOnDeckObj))
        dispatch(updateJobOrderInLasers2(moveDownOnDeckObj))
        sendUpdate()
    }

    const updateJob = (index) => {
        setChangeJob(index)
    }

    const saveJob = ((idToBeUpdated) => {
        // define const to obtain inputs form the DOM
        let typeValue = typeInput.current.value;
        let programValue = programInput.current.value;
        let materialValue = materialInput.current.value;
        let sizeValue = sizeInput.current.value;
        let taktValue = taktInput.current.value;
        let statusValue = statusInput.current.value;
        let notesValue = notesInput.current.value;
        let dotwValue = dotwInput.current.value;
        dispatch(updateJobInLasers({
            'id': idToBeUpdated,
            'type':typeValue,
            'program':programValue,
            'material':materialValue,
            'size':sizeValue,
            'takt':taktValue,
            'status':statusValue,
            'notes':notesValue,
            'dayOfTheWeek': dotwValue
        }))
        setChangeJob(null)
        sendUpdate()
    })

    const deleteJob = ((idToBeDeleted) => {
        dispatch(deleteJobInLasers(idToBeDeleted))
        sendUpdate()
    })

    return (

        <div className="d-grid gap-2 mt-5 mb-5">
            <Row className='grid-lasers-bw text-center'>
                <Col>ON DECK</Col>
            </Row>       
            <Row className='display-row-lp-hopper-titles text-center'>
                <Col className='icons-in-line-left'>
                    <RiArrowUpCircleFill size="25" className="ms-5 ms-5 modal-icon" opacity="0.0" disabled/>
                    <RiArrowDownCircleFill size="25" className="ms-5 ms-5 modal-icon" opacity="0.0" disabled/>
                </Col>
                <Col>type</Col>
                <Col>program</Col>
                <Col>material</Col>
                <Col>size</Col>
                <Col>takt</Col>
                <Col>status</Col>
                <Col>notes</Col>
                <Col>dotw</Col>
                <Col className='icons-in-line-right'>
                    <GiSave size="25" className="ms-5 ms-5 modal-icon" opacity="0.0" disabled/>
                    <TiEdit size="25" className="ms-5 ms-5 modal-icon" opacity="0.0" disabled/>
                    <TiDelete size="25" className="ms-5 ms-5 modal-icon" opacity="0.0" disabled/>
                </Col>
            </Row>     
            { jobs ?
                <>
                    { changeJob === null ?
                        jobs.map((job, index) => (
                            ((job.status !== 'completed' && job.status !== 'completed-late') && job.dayOfTheWeek === 5) ?
                                <Row className='display-row-lp-hopper-items text-center' key={job._id}>
                                    <Col className='icons-in-line-left'>
                                        <RiArrowUpCircleFill onClick={() => moveUpOnDeck(index, job)} size="25" color='green' className="ms-5 ms-5 modal-icon"/>
                                        <RiArrowDownCircleFill onClick={() => moveDownOnDeck(index, job)} size="25" color='green' className="ms-5 ms-5 modal-icon"/>
                                    </Col>
                                    <Col>{job.type}</Col>
                                    <Col>{job.program}</Col>
                                    <Col>{job.material}</Col>
                                    <Col>{job.size}</Col>
                                    <Col>{job.takt}</Col>
                                    <Col>{job.status}</Col>
                                    <Col>{job.notes}</Col>
                                    <Col>{job.dayOfTheWeek}</Col>
                                    <Col className='icons-in-line-right'>
                                        <GiSave size="25" className="ms-5 modal-icon" opacity="0.0" disabled/>
                                        <TiEdit onClick={() => updateJob(index)} size="25" color='blue' className="ms-5 modal-icon"/>
                                        <TiDelete onClick={() => deleteJob(job._id)} size="25" color='red' className="ms-5 modal-icon"/>                                   
                                    </Col>
                                </Row>                 
                            :null
                        ))
                    :
                        jobs.map((job, index)=>(
                            ((job.status !== 'completed' && job.status !== 'completed-late') && job.dayOfTheWeek === 5) ?
                                changeJob === index ?
                                    <Row className='display-row-lp-hopper-items' key={job._id}>
                                        <Col className='icons-in-line-left'>
                                            <RiArrowUpCircleFill size="25" className="ms-5 ms-5 modal-icon"  opacity="0.0" disabled/>
                                            <RiArrowDownCircleFill size="25" className="ms-5 ms-5 modal-icon"  opacity="0.0" disabled/>
                                        </Col>
                                        <Col className='display-col-lp-hopper'>
                                            <select
                                                id="type" 
                                                name="type"
                                                defaultValue= {job.type}
                                                ref={typeInput}
                                                >
                                                <option value="">Choose...</option>
                                                <option value="carry-over-program">Carry Over Program</option>
                                                <option value="maintenance">Maintenance</option>
                                                <option value="morning-meeting">Morning Meeting</option>
                                                <option value="night-run">Night Run</option>
                                                <option value="program-to-run">Program to Run</option>
                                            </select>
                                        </Col>
                                        <Col className='display-col-lp-hopper'>
                                            <input 
                                            name="program"
                                            defaultValue= {job.program}
                                            ref={programInput}
                                            />
                                        </Col>
                                        <Col className='display-col-lp-hopper'>
                                            <select
                                                id="material" 
                                                name="material"
                                                defaultValue= {job.material}
                                                ref={materialInput}
                                                >
                                                <option value="">Choose...</option>
                                                <option value=".030-SS">.030-SS</option>
                                                <option value=".030-SS-FH">.030-SS-FH</option>
                                                <option value=".048-A36">.048-A36</option>
                                                <option value=".048-SS">.048-SS</option>
                                                <option value=".048-SS-#4">.048-SS-#4</option>
                                                <option value=".050-AL">.050-AL</option>
                                                <option value=".063-A36">.063-A36</option>
                                                <option value=".075-A36">.075-A36</option>
                                                <option value=".090-AL">.090-AL</option>
                                                <option value=".105-A36">.105-A36</option>
                                                <option value=".105-SS">.105-SS</option>
                                                <option value=".105-SS-4X8">.105-SS-4X8</option>
                                                <option value=".120-MS-60X120">.120-MS-60X120</option>
                                                <option value=".120-A36">.120-A36</option>
                                                <option value=".125-AL">125-AL</option>
                                                <option value=".125-AL-CUSTOM">.125-AL-CUSTOM</option>
                                                <option value=".135-A36">.135-A36</option>
                                                <option value=".188-A36">188-A36</option>
                                                <option value=".188-AL">.188-AL</option>
                                                <option value=".188-GR80">.188-GR80</option>
                                                <option value=".188-SS">.188-SS</option>
                                                <option value=".250-A36">.250-A36</option>
                                                <option value=".250-GR80">.250-GR80</option>
                                                <option value=".375-A36">.375-A36</option>
                                                <option value=".375-A36-4X8">.375-A36-4X8</option>
                                                <option value=".375-A36-5X10">.375-A36-5X10</option>
                                                <option value=".375-AL">.375-AL</option>
                                                <option value=".375-GR80">.375-GR80</option>
                                                <option value=".500-A36">.500-A36</option>
                                                <option value=".500-A36-4X8">.500-A36-4X8</option>
                                                <option value=".500-A36-5X10">.500-A36-5X10</option>
                                                <option value="NA">NA</option>
                                            </select>
                                        </Col>
                                        <Col className='display-col-lp-hopper'>
                                            <input 
                                            name="size"
                                            defaultValue= {job.size}
                                            ref={sizeInput}
                                            />
                                        </Col>
                                        <Col className='display-col-lp-hopper'>
                                            <input 
                                            name="takt"
                                            defaultValue= {job.takt}
                                            ref={taktInput}
                                            />
                                        </Col>
                                        <Col className='display-col-lp-hopper'>
                                            <select
                                                id="status" 
                                                name="status"
                                                defaultValue= {job.status}
                                                ref={statusInput}
                                                >
                                                <option value="">Choose...</option>
                                                <option value="completed">Completed</option>
                                                <option value="completed-late">Completed Late</option>
                                                <option value="in-progress">In Progress</option>
                                                <option value="late">Late</option>
                                                <option value="on-deck">On Deck</option>
                                                <option value="reset">Reset</option>
                                                <option value="scheduled">Scheduled</option>
                                            </select>
                                        </Col>
                                        <Col className='display-col-lp-hopper'>
                                            <input 
                                            name="notes"
                                            defaultValue= {job.notes}
                                            ref={notesInput}
                                            />
                                        </Col>
                                        <Col className='display-col-lp-hopper'>
                                            <input 
                                            name="dayoftheweek"
                                            defaultValue= {job.dayOfTheWeek}
                                            ref={dotwInput}
                                            />
                                        </Col>
                                        <Col className='icons-in-line-right'>
                                            <GiSave onClick={() => saveJob(job._id)} size="25" color="green" className="ms-5 modal-icon"/>
                                            {/* <TiEdit size="25" color='blue' className="ms-5 modal-icon" opacity="0.0" disabled/>
                                            <TiDelete size="25" color='red' className="ms-5 modal-icon" opacity="0.0" disabled/>                                    */}
                                        </Col>
                                    </Row>          
                                :
                                    <Row className='display-row-lp-hopper-items text-center' key={job._id}>
                                        <Col className='icons-in-line-left'>
                                            <RiArrowUpCircleFill size="25" className="ms-5 ms-5 modal-icon"  opacity="0.0" disabled/>
                                            <RiArrowDownCircleFill size="25" className="ms-5 ms-5 modal-icon"  opacity="0.0" disabled/>
                                        </Col>
                                        <Col>{job.type}</Col>
                                        <Col>{job.program}</Col>
                                        <Col>{job.material}</Col>
                                        <Col>{job.size}</Col>
                                        <Col>{job.takt}</Col>
                                        <Col>{job.status}</Col>
                                        <Col>{job.notes}</Col>
                                        <Col>{job.dayOfTheWeek}</Col>
                                        <Col className='icons-in-line-right'>
                                            <GiSave size="25" color="green" className="ms-5 modal-icon" opacity="0.0" disabled/>
                                            <TiEdit size="25" color='blue' className="ms-5 modal-icon" opacity="0.0" disabled/>
                                            <TiDelete size="25" color='red' className="ms-5 modal-icon" opacity="0.0" disabled/>                                   
                                        </Col>
                                    </Row>   
                            :null
                        ))
                    }
                </>
            :null}
        </div>
    )
}

export default FridayNotCompleted