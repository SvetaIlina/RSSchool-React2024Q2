import { useSelector } from 'react-redux';
import { getData } from '../../service/formDataSlice';
import FormData from './formData';
import './formData.css';

export default function FormContainer() {
    const forms = useSelector(getData);
    const reversedForms = [...forms].reverse();

    return (
        <>
            {forms.length !== 0 && <h1>Latest data</h1>}
            <div className="form-container">
                {reversedForms.map((form, index) => {
                    return <FormData key={index} data={form} classes={`${index === 0 ? 'last' : ''}`} />;
                })}
            </div>
        </>
    );
}
