import { useState } from "react";

import type {ShortenedUrl} from "../../../../common/types/shortened-url";

type UrlTableRowProps = {
    url: ShortenedUrl;
    rowNumber: number;
    onDelete: (id: number) => void;
};

function UrlTableRow({ url, rowNumber, onDelete }: UrlTableRowProps) {

    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(
                `http://localhost:3000/${url.shortCode}`
            );

            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy text: ", error);
        }
    }

    return (
        <tr>
            <td>{rowNumber}</td>
            <td>{url.originalUrl}</td>
            <td>
                <a
                    href={`http://localhost:3000/${url.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  {url.shortCode}  
                </a>

            </td>
            <td>{url.clickCount}</td>
            <td>
                <button onClick={handleCopy}>
                    {copied ? "Copied!" : "Copy"}
                </button>
            </td>
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
