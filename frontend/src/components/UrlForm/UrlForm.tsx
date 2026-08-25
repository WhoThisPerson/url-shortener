import { useState } from "react";


function UrlForm() {

    const [url, setUrl] = useState("");

    return (
        <section>
            <h2>Enter a URL to shorten</h2>

            <form>
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
