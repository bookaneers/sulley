import React, { useState, useRef, useEffect } from 'react'
import { Row, Col, Form, Button, Alert } from 'react-bootstrap'

// import { Modal, Form, Row, Col, Alert, Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'

////////////////////////////// SOCKET //////////////////////////////
import { io } from 'socket.io-client'

////////////////////////////// SOCKET //////////////////////////////
const socket = io('http://localhost:5002', { upgrade: false, transports: ['websocket'] })

// Component - receiving props from onthejob and passing item info and state (child to parrent)
const CallRecut = ({setRecut, setOnTheJobView, setChronoView, setPullTheRopeView,
    setResolveBtn, setRedTeamBtn, setReworkBtn, setWorkerRopeTime, setTaktTime, 
    setStartTaktTime, setTime, setStartRopeTime, setWorkerTaktTime, setShowModal, props}) => {

    // creating state
    const [showRecut, setShowRecut] = useState(false) // state to show modal

    const [error, setError] = useState([false, '']) // state to display employee's name's error

    const [arrayDept, setArrayDept] = useState([])
    const [arrayTypes, setArrayTypes] = useState([])

    const [blamedDeptInput, setBlamedDeptInput] = useState('')
    const [defectType, setDefectType] = useState('')
    const [partsToBeCuted, setPartsToBeCuted] = useState([])
    let partArray = structuredClone(partsToBeCuted)

    const [showNotes, setShowNotes] = useState(false)
    const [showFlow, setShowFlow] = useState(false)
    const [showParts, setShowParts] = useState(false)

    const [disableAddNotes, setDisableAddNotes] = useState(false)
    const [disableAddParts, setDisableAddParts] = useState(false)

    const [newFlow, setNewFlow] = useState([])

    useEffect(() => {
        // setArrayDept(getBlamed())
        // setArrayTypes(getTypesOfDefects())
    }, [])

    // define variable to read the DOM
    const resonForDefectInput = useRef()

    const partToBeRecutedInput = useRef()
    const qtyPartToBeRecutedInput = useRef()

    const getBlamed = () => {
        const blamedDepartment = []
        let blamed = ''
        for (let i = 0; i < props.item.processes.length; i++) {
            if (props.item.processes[i].process === 'laser') { blamed = '1'}
            if (props.item.processes[i].process === 'press-brake') { blamed = '2'}
            if (props.item.processes[i].process === 'tube-laser') { blamed = '3'}
            if (props.item.processes[i].process === 'tube-bender') { blamed = '4'}
            if (props.item.processes[i].process === 'saw') { blamed = '5'}
            if (props.item.processes[i].process === 'mill') { blamed = '6'}
            if (props.item.processes[i].process === 'lathe') { blamed = '7'}
            if (props.item.processes[i].process === 'welding') { blamed = '8'}
            if (props.item.processes[i].process === 'robot-welding') { blamed = '9'}
            if (props.item.processes[i].process === 'powder-coating') { blamed = '10'}
            if (props.item.processes[i].process === 'sew-shop') { blamed = '11'}
            if (props.item.processes[i].process === 'hardware') { blamed = '12'}
            if (props.item.processes[i].process === 'final-assembly') { blamed = '13'}
            if (props.item.processes[i].process === 'packaging') { blamed = '14'}
            if (props.item.processes[i].process === 'shipping') { blamed = '15'}
            if (props.item.processes[i].process !== 'scheduler' && (props.item.processes[i].process !== 'nesting')) {
                blamedDepartment.push({'id': i + 1, blamedProcessId: blamed, 'name':props.item.processes[i].process })
            }
        }
        return blamedDepartment
    }

    const typesOfDefect = [
        {id:'1', blamedId:'1', name:'laser-defect-01'},
        {id:'2', blamedId:'1', name:'laser-defect-02'},
        {id:'3', blamedId:'2', name:'pb-defect-01'},
        {id:'4', blamedId:'2', name:'pb-defect-02'},
        {id:'5', blamedId:'3', name:'tl-defect-01'},
        {id:'6', blamedId:'3', name:'tl-defect-02'},
        {id:'7', blamedId:'4', name:'tb-defect-01'},
        {id:'8', blamedId:'4', name:'tb-defect-02'},
        {id:'9', blamedId:'5', name:'saw-defect-01'},
        {id:'10', blamedId:'5', name:'saw-defect-02'},
        {id:'11', blamedId:'6', name:'mill-defect-01'},
        {id:'12', blamedId:'6', name:'mill-defect-02'},
        {id:'13', blamedId:'7', name:'lathe-defect-01'},
        {id:'14', blamedId:'7', name:'lathe-defect-02'},
        {id:'15', blamedId:'8', name:'welding-defect-01'},
        {id:'16', blamedId:'8', name:'welding-defect-02'},        
        {id:'17', blamedId:'9', name:'rw-defect-01'},
        {id:'18', blamedId:'9', name:'rw-defect-02'},
        {id:'19', blamedId:'10', name:'pc-defect-01'},
        {id:'20', blamedId:'10', name:'pc-defect-02'},
        {id:'21', blamedId:'11', name:'ss-defect-01'},        
        {id:'22', blamedId:'11', name:'ss-defect-02'},
        {id:'23', blamedId:'12', name:'hardware-defect-01'},
        {id:'24', blamedId:'12', name:'hardware-defect-02'},
        {id:'25', blamedId:'13', name:'fa-defect-01'},
        {id:'26', blamedId:'13', name:'fa-defect-02'},
        {id:'27', blamedId:'14', name:'packaging-defect-01'},
        {id:'28', blamedId:'14', name:'packaging-defect-02'},
        {id:'29', blamedId:'15', name:'shipping-defect-01'},
        {id:'30', blamedId:'15', name:'shipping-defect-02'}
    ]      

    const handleRecut = () => {
        setArrayDept(getBlamed())
        setOnTheJobView(false)
        setChronoView(false)
        setPullTheRopeView(false)
        setShowRecut(true)

        setStartRopeTime(false)
        setTaktTime(0)
        setStartTaktTime(false)
        setTime(0)

        // setWorkerTaktTime(0)
        // setWorkerRopeTime(0)

        setResolveBtn(false)
        setRedTeamBtn(false)

        setReworkBtn(false)

        ////////////////////////////// SOCKET //////////////////////////////
        socket.emit('send_update', {status: props.item.status, color: 'green', room: 'press-brake-dashboard'});
    }


    ////////////////////////////// BLAIMED TEAM //////////////////////////////
    const handleBlamed = (id) => {
        // setArrayTypes([])
        if (id !== '0' ) { 
            for (let i = 0; i < arrayDept.length; i++) {
                if (arrayDept[i].blamedProcessId === id) {
                    setBlamedDeptInput(arrayDept[i].name)
                    setArrayTypes(typesOfDefect.filter(x => x.blamedId === arrayDept[i].blamedProcessId))
                }
            }
        }
    }

    const handleType = (id) => {
        if (id !== '0') {
            setShowNotes(true)
            setDefectType(arrayTypes[id].name)            
        } else {
            setShowNotes(true)
        }
    }

    ////////////////////////////// NOTES //////////////////////////////
    const handleNotes = () => {
        const resonForDefectValue = resonForDefectInput.current.value;
        validateNotes(resonForDefectValue)
    }

    const enableNotesChange = () => {
        setDisableAddNotes(true)
    }

    // define function to validate errors
    const validateNotes = (reason) => {
        if (reason === '') {
            setError([true, 'Must enter defect description'])
            setShowFlow(false)
            return false
        }
        setError([false, ''])
        setShowParts(true)
        setDisableAddNotes(false)
        return true
    }

    ////////////////////////////// ADD PARTS //////////////////////////////
    const addPartsToBeRecuted = (e) => {

        e.preventDefault()
        let partToBeRecutedValue = partToBeRecutedInput.current.value
        let qtyPartToBeRecutedValue = qtyPartToBeRecutedInput.current.value

        if (partToBeRecutedValue !== '' && qtyPartToBeRecutedValue > 0) {
            partArray.push({'part':partToBeRecutedValue, 'qty': qtyPartToBeRecutedValue})
        }

        // clean const values
        partToBeRecutedInput.current.value = '';
        qtyPartToBeRecutedInput.current.value = '';

        setPartsToBeCuted(partArray)
    }

    const doneAddingParts = () => {

        partToBeRecutedInput.current.value = '';
        qtyPartToBeRecutedInput.current.value = '';
        setShowFlow(true)
        setDisableAddParts(false)
        handleNewflow()
    }

    const enablePartsChange = () => {
        setDisableAddParts(true)
    }

    ////////////////////////////// FLOW //////////////////////////////

    const handleNewflow = () => {
        const newFlowArray = []
        props.item.processes.forEach((process, index) => {
            if (index !== 0) {
                newFlowArray.push({'processID': process.processID, 
                    'process': process.process,
                    'recutTime': 0,
                    'employeeName': '',
                    'employeeID': '',
                    'skipFlow': false
                })
            }
        })
        setNewFlow(newFlowArray)
        // console.log(newFlowArray)
    }



    const handleChange = (e) => {
 
        let newFlowArray2 = structuredClone(newFlow)
        console.log('before', newFlowArray2)

        for (let i = 0; i < newFlowArray2.length; i++) {
            if (newFlowArray2[i].process === e.target.value) { 
                
                if (newFlowArray2[i].skipFlow === false) {
                    newFlowArray2[i].skipFlow = true
                } else {
                    newFlowArray2[i].skipFlow = false
                }
            }
        }
        console.log('after', newFlowArray2)
        setNewFlow(newFlowArray2)

        console.log(newFlow)

        // dispatch(changeProcessPriorityInOneDuler({index: e.target.value}))
    }

    return(
        <>   
            { showRecut ?
                <>
                    <Modal.Body>
                        <Form.Group className="mb-2 text-primary">
                            <Row className='mb-3'> 
                                <h5>Starting a RECUT process...</h5>
                                <h5>Please call the TEAM LEAD where defect occured and together enter the information below</h5>
                            </Row>
                            <Row>
                                <Col>
                                    <select id='array-blamed' className='form-control defect-cascading' onChange={(e) => handleBlamed(e.target.value)}>
                                        <option value='0'>Select team where defect occured</option>
                                        {
                                            arrayDept && arrayDept !== undefined ?
                                            arrayDept.map((dept, index) => {
                                                return(
                                                    <option key={index} value={dept.id}>{dept.name}</option>
                                                )
                                            })
                                        : 'No department found'}
                                    </select>                               
                                </Col>
                                <Col>
                                    <select id='array-types' className='form-control defect-cascading' onChange={(e) => handleType(e.target.value)}>
                                        <option value='0'>Select type of defect</option>
                                        {
                                            arrayTypes && arrayTypes !== undefined ?
                                            arrayTypes.map((type, index) => {
                                                return(
                                                    <option key={index} value={index}>{type.name}</option>
                                                )
                                            })
                                        : 'No type of defect found'}
                                    </select>  
                                </Col>
                            </Row>
                            <Row>
                                { showNotes ?
                                    <>
                                        <Col xs={10}>
                                            <input
                                                className='mt-3 form-control defect-notes'
                                                type="text"
                                                maxLength="100"
                                                placeholder="Describe defect..."
                                                name="notes"
                                                ref={resonForDefectInput}
                                                autoFocus
                                                required
                                                onChange={enableNotesChange}
                                            />

                                            { error[0] ?
                                                <Alert className='mt-2 alert-message'>
                                                    {error[1]}
                                                </Alert>
                                            : null}
                                        </Col>
                                        { disableAddNotes ?
                                            <Col xs={2}>
                                                <Button onClick={handleNotes} size='sm' className='mt-3 times-smaller' variant="primary" type="button">
                                                    Add notes
                                                </Button>
                                            </Col>
                                        :
                                            <Col xs={2}>
                                                <Button size='sm' className='mt-3 times-smaller' variant="secondary" type="button">
                                                    Add notes
                                                </Button>
                                            </Col>
                                        }
                                    </>
                                :null}
                            </Row>
                            <Row>

                                { showParts ?
                                    <>
                                        <Row className='mt-3'> 
                                            <h5>List of parts to be recuted</h5>
                                        </Row>

                                        { partArray.map((item, index) => (
                                            <Row key={index}>
                                                <>
                                                    <Col className="ms-5 me-5 mt-3 form-control defect-notes text-center">
                                                        {item.part}
                                                    </Col>
                                                    <Col className="mt-3 form-control defect-notes text-center">
                                                        {item.qty}
                                                    </Col>
                                                </>
                                            </Row>
                                        ))}
                                       
                                        <Row>
                                            <Col xs={5}>
                                                <input
                                                    className='mt-3 form-control defect-notes'
                                                    type="text"
                                                    maxLength="15"
                                                    placeholder="Enter part # to be recuted"
                                                    name="partToBeRecuted"
                                                    ref={partToBeRecutedInput}
                                                    required
                                                    onChange={enablePartsChange}
                                                />
                                            </Col>
                                            <Col xs={1}>
                                                <input
                                                    className='mt-3 form-control defect-notes'
                                                    type="number"
                                                    min="0"
                                                    max="99"
                                                    placeholder="Qty"
                                                    name="qtyPartToBeRecuted"
                                                    ref={qtyPartToBeRecutedInput}
                                                    required
                                                />
                                            </Col>


                                            { disableAddParts ?
                                                <Col xs={6}>
                                                    <Button onClick={(e)=> addPartsToBeRecuted(e)} className='ms-2 me-2 mt-3' variant="primary" type="button">
                                                        Add part to be recuted
                                                    </Button>
                                                    <Button onClick={(e)=> doneAddingParts(e)} className='ms-2 me-2 mt-3' variant="danger" type="button">
                                                        Done adding parts
                                                    </Button>
                                                </Col>
        
                                            : 
                                                <Col xs={6}>
                                                    <Button className='ms-2 me-2 mt-3' variant="secondary" type="button">
                                                        Add part to be recuted
                                                    </Button>
                                                    <Button className='ms-2 me-2 mt-3' variant="secondary" type="button">
                                                        Done adding parts
                                                    </Button>
                                                </Col>
                                            }
                                        </Row>
                                    </>
                                    
                                :null}
                            </Row>  
                            <Row>
                                { showFlow ?
                                    <>
                                        <div className="mb-3 defect-check mt-5">

                                            <h5>Build new flow of teams for the RECUT piece</h5>     
                                            { props.item.processes.map((process, index) => (
                                                index !== 0 ?
                                                    <div key={index}  className="defect-checkbox mt-3">
                                                        <input
                                                        className="me-2"
                                                        type="checkbox"
                                                        label={process.process}
                                                        value={process.process}
                                                        onClick={e => {handleChange(e)}} 
                                                        ></input>
                                                        <span>{process.process}</span>
                                                    </div>
                                                :null
                                            ))}
                                        </div>
                                    </>
                                :null}
                            </Row>
                            <Row></Row>
                            <Row></Row>
                        </Form.Group>
                    </Modal.Body>
                </>
            :
                <Button variant='warning' className='mt-5 times-smaller fw-bold' onClick={handleRecut}>RECUT</Button>
            }
        </>
    )
}

export default CallRecut;