const catFactsListElement = document.querySelector('.factList')

// Clean up the fact list elements first
catFactsListElement.innerHTML = ''

function makeCatFactTemplate(text){
    return `<div class="factItem">
    
                <div class="factDesription">${text}</div>
            </div>`

}

/**
 * Fetches a random cat fact from the API.
 * @returns {Promise<string>} A Promise that resolves with the cat fact or rejects with an error.
 */
function getCatFact() {

    return new Promise((resolve, reject) => {
        fetch('https://catfact.ninja/fact')
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .then(data => {
                catFactsListElement.innerHTML += makeCatFactTemplate(data.fact)
            })
            .catch(error => {
            reject(error);
            });
        });
    }
/**
   * Fetches and logs multiple cat facts to the console.
   * @param {number} numberOfCalls - The number of cat facts to fetch.
   */
async function getCatFacts(numberOfCalls) {
    const fetchPromises = Array.from({ length: numberOfCalls }, getCatFact);

    try {
        await Promise.all(fetchPromises);
    } catch (error) {
        console.error('Error fetching cat facts:', error);
    }
}

// Call the function to get 5 cat facts
const numberOfFacts = 5
getCatFacts(numberOfFacts);