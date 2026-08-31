import { useState } from "react";

function UrlForm({ onSubmit }: { onSubmit: (url: string) => void}) {

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
