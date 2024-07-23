import { useSelector } from 'react-redux';
import { clearSelectedItems, getNumberOfSelectedItems } from '../../utils/selectedItemlSlice';
import './flyout.css';
import { useDispatch } from 'react-redux';

export default function Flyout() {
    const dispatch = useDispatch();
    const numberOfItems = useSelector(getNumberOfSelectedItems);
    if (!numberOfItems) {
        return null;
    }

    const handleClearAll = () => dispatch(clearSelectedItems());
    const handleDownload = () => console.log(123);

    return (
        <div className="flyout">
            <p className="flyout-description">
                You have {numberOfItems} favorite character{numberOfItems > 1 ? 's' : ''}
            </p>
            <div className="btn-container">
                <button onClick={handleClearAll} className="flyout-btn  flyout-btn__unselect">
                    Unselect all
                </button>
                <button onClick={handleDownload} className="flyout-btn flyout-btn__download">
                    Download
                </button>
            </div>
        </div>
    );
}
