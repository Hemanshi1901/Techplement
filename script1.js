document.getElementById("randomQuoteBtn").addEventListener("click", getRandomQuote);
document.getElementById("searchQuoteBtn").addEventListener("click", searchQuote);

function getRandomQuote() {
    fetch("https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random")
        .then(response => response.json())
        .then(data => {
            const quote = data[0];
            document.getElementById("quoteText").innerText = `"${quote.q}"`;
            document.getElementById("quoteAuthor").innerText = `- ${quote.a}`;
        })
        .catch(error => {
            document.getElementById("quoteText").innerText = "Unable to fetch quote.";
            document.getElementById("quoteAuthor").innerText = "";
            console.error("Error fetching quote:", error);
        });
}

function searchQuote() {
    const author = document.getElementById("authorInput").value;
    fetch(`https://cors-anywhere.herokuapp.com/https://api.quotable.io/quotes?author=${author}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("API error, could not fetch quotes");
            }
            return response.json();
        })
        .then(data => {
            if (data.results.length > 0) {
                const quote = data.results[0];
                document.getElementById("quoteText").innerText = `"${quote.content}"`;
                document.getElementById("quoteAuthor").innerText = `- ${quote.author}`;
            } else {
                document.getElementById("quoteText").innerText = "No quotes found for this author.";
                document.getElementById("quoteAuthor").innerText = "";
            }
        })
        .catch(error => {
            document.getElementById("quoteText").innerText = "Unable to search for quotes.";
            document.getElementById("quoteAuthor").innerText = "";
            console.error("Error searching quote:", error);
        });
}

