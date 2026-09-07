import type {ShortenedUrl} from "../../../../common/types/shortened-url";

type UrlTableRowProps = {
    url: ShortenedUrl;
    rowNumber: number;
    onDelete: (id: number) => void;
};

function UrlTableRow({ url, rowNumber, onDelete }: UrlTableRowProps) {
    return (
        <tr>
            <td>{rowNumber}</td>
            <td>{url.originalUrl}</td>
            <td>{url.shortCode}</td>
            <td>{url.clickCount}</td>
            <td><button>Copy</button></td>
            <td>
                <button onClick={() => onDelete(url.id)}>
                    Delete
                </button>
            </td>
            <td>{new Date(url.createdAt).toLocaleString()}</td>
        </tr>
    )
}

export default UrlTableRow;
