import {createUrl, resolveShortURL, getAllUrls, deleteURL} from "../src/services/url.services.js";

console.log("=== Creating URLs ===");

const google = createUrl("https://google.com");
const github = createUrl("https://github.com");

console.log(google);
console.log(github);

console.log("\n=== All URLs ===");
console.log(getAllUrls());

console.log("\n=== Resolve first URL ===");
console.log(resolveShortURL(google.shortUrl));

console.log("\n=== After Click ===");
console.log(getAllUrls());

console.log("\n=== Delete first URL ===");
console.log(deleteURL(google.id));

console.log("\n=== Remaining URLs ===");
console.log(getAllUrls());
