import { TFormData } from '../../types/types';
import './formData.css';

interface FormDataProps {
    data: TFormData;
    classes: string;
}

export default function FormData({ data, classes }: FormDataProps) {
    return (
        <div className={`${classes ? classes : ''} form-data`}>
            <ul>
                <li className="data-item">Name: {data.name}</li>
                <li className="data-item">Age: {data.age} y.o</li>
                <li className="data-item">Email: {data.email}</li>
                <li className="data-item">Gender: {data.gender}</li>
                <li className="data-item">Country: {data.country}</li>
                <li className="data-item">{data.acceptTC ? 'The term and conditions are accepted' : ''}</li>
                <li className="data-item">Password: {data.password}</li>
                <li className="data-item">Password confirm: {data.confirm}</li>
            </ul>
            <div className="image-container">
                <img className="data-item-img" src={data.file} />
            </div>
        </div>
    );
}
