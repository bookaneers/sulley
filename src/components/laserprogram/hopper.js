// import libraries and dependencies
import {Tabs, Tab  } from "react-bootstrap"

import MondayNotCompleted from './monday/notcompleted'
import MondayCompleted from './monday/completed'

import TuesdayNotCompleted from './tuesday/notcompleted'
import TuesdayCompleted from './tuesday/completed'

import WednesdayNotCompleted from './wednesday/notcompleted'
import WednesdayCompleted from './wednesday/completed'

import ThursdayNotCompleted from './thursday/notcompleted'
import ThursdayCompleted from './thursday/completed'

import FridayNotCompleted from './friday/notcompleted'
import FridayCompleted from './friday/completed'

// Component
const LaserProgramsHopper = () => {
    return(

        <div className='tabulation mt-5'>

            <Tabs
            defaultActiveKey="profile"
            id="tabs"
            className="mb-3 tabs"
            >

                <Tab eventKey="monday" title="Monday">
                    <MondayNotCompleted/>
                    <MondayCompleted/>
                </Tab>

                <Tab eventKey="tuesday" title="Tuesday">
                    <TuesdayNotCompleted/>
                    <TuesdayCompleted/>
                </Tab>

                <Tab eventKey="wednesday" title="Wednesday">
                    <WednesdayNotCompleted/>
                    <WednesdayCompleted/>
                </Tab>

                <Tab eventKey="thursday" title="Thursday">
                    <ThursdayNotCompleted/>
                    <ThursdayCompleted/>
                </Tab>

                <Tab eventKey="friday" title="Friday" className="tab-item">
                    <FridayNotCompleted/>
                    <FridayCompleted/>
                </Tab>

            </Tabs>
        </div>
    
    )
}
export default LaserProgramsHopper