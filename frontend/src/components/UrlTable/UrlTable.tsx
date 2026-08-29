import UrlTableRow from '../UrlTableRow/UrlTableRow';

import type { ShortenedUrl } from '../../../../common/types/shortened-url';

type UrlTableProps = {
    urls: ShortenedUrl[];
}

function UrlTable() {

    const urls = [
        {
            id: 1,
            shortCode: "abc123",
            originalUrl: "https://google.com",
            clickCount: 12,
            createdAt: new Date()
        },
        {
            id: 2,
            shortCode: "xyz789",
            originalUrl: "https://github.com",
            clickCount: 5,
            createdAt: new Date()
        },
        {
            id: 3,
            shortCode: "qwe456",
            originalUrl: "https://example.com",
            clickCount: 2,
            createdAt: new Date()
        },
        {
            id: 4,
            shortCode: "qwe456",
            originalUrl: "https://example.com",
            clickCount: 2,
            createdAt: new Date()
        },
        {
            id: 5,
            shortCode: "qwe456",
            originalUrl: "https://example.com",
            clickCount: 2,
            createdAt: new Date()
        },
        {
            id: 6,
            shortCode: "qwe456",
            originalUrl: "https://example.com",
            clickCount: 2,
            createdAt: new Date()
        }
    ];
    return (
        <section>
            <h2>All URLs</h2>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Original Link</th>
                        <th>Shortened Link</th>
                        <th>Click Count</th>
                        <th>Copy</th>
                        <th>Delete</th>
                        <th>Created At</th>
                    </tr>
                </thead>

                <tbody>
                    {urls.map((url, index) => (
                        <UrlTableRow 
                            key={url.id}
                            rowNumber={index + 1}
                            url={url}
                        />
                    ))}
                </tbody>

            </table>

        </section>
    )
}

export default UrlTable;
