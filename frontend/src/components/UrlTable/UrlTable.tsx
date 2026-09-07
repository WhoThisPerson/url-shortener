import UrlTableRow from '../UrlTableRow/UrlTableRow';

import type { ShortenedUrl } from '../../../../common/types/shortened-url';

type UrlTableProps = {
    urls: ShortenedUrl[];
    startIndex: number;
    onDelete: (id: number) => void;
};

function UrlTable({ urls, startIndex, onDelete }: UrlTableProps) {

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
                            url={url}
                            rowNumber={startIndex + index + 1}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>

            </table>

        </section>
    )
}

export default UrlTable;
