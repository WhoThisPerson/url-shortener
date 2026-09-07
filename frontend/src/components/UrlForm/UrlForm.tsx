import { useState } from "react";

type UrlFormProps = {
    onSubmit: (url: string) => void;
};

function UrlForm({ onSubmit }: UrlFormProps) {

    const [url, setUrl] = useState("");

    return (
        <section>
            <h2>Enter a URL to shorten</h2>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(url);
                    setUrl("");
                }}
            >
                <input 
                    type="url" 
                    placeholder="Paste here..." 
                    required 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <button type="submit">Shorten</button>
            </form>
        </section>
    )
}

export default UrlForm;
