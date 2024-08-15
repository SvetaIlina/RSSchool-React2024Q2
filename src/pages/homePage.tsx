import { NavLink } from 'react-router-dom';

export default function HomePage() {
    return (
        <div>
            <NavLink to={'/uncontrolled'}>uncontroled</NavLink>
            <br />
            <NavLink to={'/reactHookForm'}>RHF</NavLink>
        </div>
    );
}
