import { convertToCSV } from '../../../services/services';
import { SwapiPerson } from '../../../types/type';
import styles from './downloadLink.module.css';

interface DownloadLinkProps {
    items: SwapiPerson[];
}

export default function DownloadLink({ items }: DownloadLinkProps) {
    const csvContent = convertToCSV(items);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
    const objUrl = URL.createObjectURL(blob);

    return (
        <a className={styles.downloadLink} href={objUrl} download={`${items.length}_starwars_characters.csv`}>
            Download
        </a>
    );
}
