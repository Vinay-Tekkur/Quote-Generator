const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const count = 10;

function showSpinningLoader(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeSpinningLoader(){
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}


async function getQuote(){
    showSpinningLoader();
    const proxyUrl = 'https://radiant-fjord-30763.herokuapp.com/';
    const quoteUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

    try{
        const response = await fetch(proxyUrl + quoteUrl);
        const data = await response.json();
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }

        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        removeSpinningLoader();
    }catch(error){
        if(count){
            getQuote();
            count--;
        }
    }
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} -- ${author}`;
    window.open(twitterUrl, '_blank');
}

twitterButton.addEventListener('click', tweetQuote);
newQuoteButton.addEventListener('click', getQuote)

getQuote();