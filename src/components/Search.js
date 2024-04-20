import {
    BASE_API_URL,
    searchInputEl,
    searchFormEl,
    spinnerSearchEl,
    jobListSearchEl,
    numberEl,
    jobsAvilableEL
} from '../common.js';
import renderError from './Error.js';
import randerSpinner from './Spinner.js'
import renderJobList from './JobList.js';


const submitHandler =(e)=>{
    // prevent default behaviour 
    e.preventDefault()

    // user input text 
    const searchText = searchInputEl.value;
    console.log('search for, ', searchText)

    // form validation with regular expression /pattern here/
    const forbiddenPattern = /[0-9!@#$%^&*]/
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch){
        renderError('Your search should not contains numbers!');
        return;
    }

    // unfocus search
    searchInputEl.blur();

    // remove previous entered search text
    jobListSearchEl.innerHTML=''

    // render spinner 
    randerSpinner('search')

// 
    // fetch search results 
    fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
        .then(response => {
            if (!response.ok){
                console.log("Something is not okay. try again.")
                return;
            }
            return response.json()
        })
        .then(data =>{
            // only fetch the job items from data
             let { jobItems} = data;
             
             console.log(jobItems)
            
             //  remove spinner
             randerSpinner('search')

            //  render number of jobs
            numberEl.textContent= jobItems.length;
            
            // page footer
            jobsAvilableEL.textContent=`Total ${jobItems.length} jobs`;
            
            //  rnder job list in search job list
            renderJobList(jobItems)
        })
        // connection lost request - response cycle interrpted or rejected
        .catch(error => console.log(error));



};
searchFormEl.addEventListener('submit', submitHandler)
