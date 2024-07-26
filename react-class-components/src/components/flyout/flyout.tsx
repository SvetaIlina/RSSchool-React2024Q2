import { useSelector } from 'react-redux';
import { clearSelectedItems, getNumberOfSelectedItems, getSelectedItemsDetails } from '../../utils/selectedItemlSlice';
import './flyout.css';
import { useDispatch } from 'react-redux';
import DownloadLink from './downloadLink/downLoadLink';

export default function Flyout() {
    const dispatch = useDispatch();
    const selectedItems = useSelector(getSelectedItemsDetails);
    const numberOfItems = useSelector(getNumberOfSelectedItems);
    if (!numberOfItems) {
        return null;
    }

    const handleClearAll = () => dispatch(clearSelectedItems());

    return (
        <div className="flyout">
            <p className="flyout-description">
                You have {numberOfItems} favorite character{numberOfItems > 1 ? 's' : ''}
            </p>
            <div className="btn-container">
                <button onClick={handleClearAll} className="flyout-btn  flyout-btn__unselect">
                    Unselect all
                </button>
                <button className="flyout-btn flyout-btn__download">
                    <DownloadLink items={selectedItems} />
                </button>
            </div>
        </div>
    );
}
