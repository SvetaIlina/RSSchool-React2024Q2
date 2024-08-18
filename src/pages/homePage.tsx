import { NavLink } from 'react-router-dom';
import FormContainer from '../components/formData/formContainer';

export default function HomePage() {
    return (
        <>
            <div className="nav-bar">
                <NavLink className="nav-link" to={'/uncontrolled'}>
                    Create form using uncontrolled components
                </NavLink>
                <NavLink className="nav-link" to={'/reactHookForm'}>
                    Create form using React Hook Form
                </NavLink>
            </div>
            <FormContainer />
        </>
    );
}
