// import dependencies and libraries
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// build component that creates a standard layout
const MainLayout = (props) => {
    return(
        <Container>
            {props.children} {/* must pass props to all the children under this component */}
            <ToastContainer/>
        </Container>
    )
}

// export component
export default MainLayout