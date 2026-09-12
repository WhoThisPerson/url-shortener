import { useEffect, useState } from "react";
import axios from "axios";

import UrlForm from "../UrlForm/UrlForm";
import UrlTable from "../UrlTable/UrlTable";
import Pagination from "../Pagination/Pagination";
import { HTTP_STATUS } from "../../../../common/constants/http-status.js";

import type { ShortenedUrl } from "../../../../common/types/shortened-url";

// Global API URL from Vite environment variables
const API_URL = import.meta.env.VITE_API_URL;

function Main() {

    const [urls, setUrls] = useState<ShortenedUrl[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const urlsPerPage = 10
    const totalPages = Math.ceil(urls.length / urlsPerPage);

    const indexOfLastUrl = currentPage * urlsPerPage;
    const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
    const currentUrls = urls.slice(indexOfFirstUrl, indexOfLastUrl);

    useEffect(() => {
        axios.get(`${API_URL}/api/urls`)
        .then((response) => {
            setUrls(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
    }, []);

    async function handleCreateUrl(url: string) {
        try {
            const response = await axios.post(`${API_URL}/api/urls`, {
                originalUrl: url
            });

            // Proper response status of 201
            if (response.status === HTTP_STATUS.CREATED) {
                setUrls((currentUrls) => [...currentUrls, response.data]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDeleteUrl(id: number) {

        try {
            const response = await axios.delete(`${API_URL}/api/urls/${id}`);
            
            //Proper response status of 204
            if (response.status === HTTP_STATUS.NO_CONTENT) {
                setUrls((currentUrls) => currentUrls.filter((url) => url.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main>
            <UrlForm onSubmit={handleCreateUrl}/>
            <UrlTable urls={currentUrls} startIndex={indexOfFirstUrl} onDelete={handleDeleteUrl} />
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
