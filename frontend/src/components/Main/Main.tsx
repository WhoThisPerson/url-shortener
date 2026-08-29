import { useEffect, useState } from "react";
import axios from "axios";

import UrlForm from "../UrlForm/UrlForm";
import UrlTable from "../UrlTable/UrlTable";
import Pagination from "../Pagination/Pagination";

import type { ShortenedUrl } from "../../../../common/types/shortened-url";

function Main() {

    const [urls, setUrls] = useState<ShortenedUrl[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const urlsPerPage = 10
    const totalPages = Math.ceil(urls.length / urlsPerPage);

    useEffect(() => {
        axios.get("http://localhost:3000/")
        .then((response) => {
            setUrls(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
    }, []);

    return (
        <main>
            <UrlForm />
            <UrlTable/>
            {totalPages > 1 && (
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </main>
    );
}

export default Main;
