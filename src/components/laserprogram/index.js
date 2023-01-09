import React,{ useRef } from 'react';
import {Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Row, Col } from "react-bootstrap"
import { showToast } from '../../utils/tools'

// import components and functions
import LaserProgramsHopper from './hopper'

// function to add the new item in the database
import { fetchLasers, addTaskToLasers } from '../../store/thunks/lasers';

const LaserProgram = () => {

    // define distach const to be use to add data to the database
    const dispatch = useDispatch();

    const typeInput = useRef();
    const programInput = useRef();
    const materialInput = useRef();
    const sizeInput = useRef();
    const taktInput = useRef();
    const statusInput = useRef();
    const notesInput = useRef();

    const handleSubmit = (e) => {
        e.preventDefault()

        // define const to obtain inputs form the DOM
        let typeValue = typeInput.current.value;
        let programValue = programInput.current.value;
        let materialValue = materialInput.current.value;
        let sizeValue = sizeInput.current.value;
        let taktValue = taktInput.current.value;
        let statusValue = statusInput.current.value;
        let notesValue = notesInput.current.value;
        let dayOfTheWeekValue = new Date().getDay();

        if (programValue !== '' && statusValue !== '') {

            dispatch(addTaskToLasers(
                {'type' : typeValue,
                'program' : programValue,
                'material' : materialValue,
                'size' : sizeValue,
                'takt' : taktValue,
                'status' : statusValue,
                'notes' : notesValue,
                'releaseDate' : Date.now() - 7*60*60*1000,
                'dayOfTheWeek' : dayOfTheWeekValue
                }
            ))
            .unwrap()
            .then((response) => {
                if (response.result === 'added'){
                    showToast('SUCCESS', 'New task was added')
                    dispatch(fetchLasers({}))
                    handleCancel(e)
                } else {
                    showToast('ERROR', 'Action not completed')
                }
            })
        }
        handleCancel(e)
    }

    const handleCancel = (e) => {
        e.preventDefault();
        typeInput.current.value = '';
        programInput.current.value = '';
        materialInput.current.value = '';
        sizeInput.current.value = '';
        taktInput.current.value = '';
        statusInput.current.value = '';
        notesInput.current.value = '';
    }

    return(
        <div className="d-grid gap-2 mt-5">
            <Row className='grid-lasers text-center'>
                <Col>LASER PROGRAMS TASKS</Col>
            </Row>
            <div className="row">
                <Form.Group className="mt-3"> 
                    <div className="display-row-lp-index text-left">
                        <Form.Select ref={typeInput} className="laser-form" defaultValue="">
                            <option value="">Choose...</option>
                            <option value="carry-over-program">Carry Over Program</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="morning-meeting">Morning Meeting</option>
                            <option value="night-run">Night Run</option>
                            <option value="program-to-run">Program to Run</option>
                        </Form.Select>
                        <Form.Control
                            className="flow"
                            placeholder="Program"
                            type='string'
                            name="program"
                            ref={programInput}
                        />
                        <Form.Select ref={materialInput} className="laser-form" defaultValue="">
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
                        </Form.Select>
                        <Form.Control
                            className="flow"
                            placeholder="Size"
                            type='string'
                            name="size"
                            ref={sizeInput}
                        />
                        <Form.Control
                            className="flow"
                            placeholder="Takt"
                            type='string'
                            name="takt"
                            ref={taktInput}
                        />
                        <Form.Select ref={statusInput} className="laser-form" defaultValue="Type">
                            <option value="">Choose...</option>
                            <option value="completed">Completed</option>
                            <option value="completed-late">Completed Late</option>
                            <option value="in-progress">In Progress</option>
                            <option value="late">Late</option>
                            <option value="on-deck">On Deck</option>
                            <option value="reset">Reset</option>
                            <option value="scheduled">Scheduled</option>
                        </Form.Select>
                        <Form.Control
                            className="flow"
                            placeholder="Notes"
                            type='string'
                            name="notes"
                            ref={notesInput}
                        />
                    </div>
                </Form.Group>
            </div>
            <div className="row">
                <div className="col text-center">
                    <Button onClick={(e)=> handleSubmit(e)} className='btn-primary mt-4 me-3' variant="primary" type="button">
                        Add Entry
                    </Button>
                    <Button onClick={(e)=> handleCancel(e)} className="btn-primary mt-4 ms-3 " variant='danger' type="reset"> 
                        Cancel Entry 
                    </Button>
                </div>
            </div>
            <LaserProgramsHopper/>
        </div>
    )
}

export default LaserProgram