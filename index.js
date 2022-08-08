//  Function that will fetch data from the omdb api. weh pass the keyword to this function when we call it.
// we returned the search result from this function, since this is an async function it will return a promise will the returned value as promiseResult
const fetchdata = async (searchKeyword)=>{
    let searchURL = `http://www.omdbapi.com/?apikey=33e7e6c6&s=${searchKeyword}`;
    const response = await fetch(searchURL);
    const data = await response.json();

    if(data.Error){
        return [];
    }
    console.log(data);
    return data.Search;
};


const input = document.querySelector('input');

// general purpose debounce function. that take a callback function and return another function that set the debounce functionality on the callback function we passed. if we call the returned function again and again, it will only execute the callback once 1 second has been passed since we last called the returned function 
const debounce = (func, delay = 1000)=>{
    let timeoutID;
    return (...args)=>{
        if(timeoutID){
            clearTimeout(timeoutID);
        }
        timeoutID=setTimeout(()=>{
            func.apply(null,args);
        },delay);
    };
};  

// a function when called will call the fetchdata function with the argument as input text value.
const onInput = async event =>{
        const movies = await fetchdata(event.target.value);   
        for(let movie of movies){
            const div  = document.createElement('div');
            div.classList.add('search-item-style');
            div.innerHTML = `
                <img src="${movie.Poster}" class = "search-image-style">
                <div>
                    <h4>${movie.Title}</h4>
                    <h5>${movie.Year}</h5>
                </div>
                
            `;
            document.querySelector('.search-results-items').appendChild(div);
        }
};
// attached eventListner to input
input.addEventListener('input',debounce(onInput,500));