import type {ShortenedUrl} from "../../../../common/types/shortened-url";

function UrlTableRow({url, rowNumber}: {url: ShortenedUrl, rowNumber: number}) {
    return (
        <tr>
            <td>{rowNumber}</td>
            <td>{url.originalUrl}</td>
            <td>{url.shortCode}</td>
            <td>{url.clickCount}</td>
            <td><button>Copy</button></td>
            <td><button>Delete</button></td>
            <td>{url.createdAt.toLocaleString()}</td>
        </tr>
    )
}

export default UrlTableRow;
