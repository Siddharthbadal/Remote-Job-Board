import {
    BASE_API_URL,
    state,
    searchInputEl,
    searchFormEl,
    spinnerSearchEl,
    jobListSearchEl,
    numberEl,
    jobsAvilableEL, 
    getData,
    sortingBtnRecentEl,
    sortingBtnRelevantEl
} from '../common.js';
import renderError from './Error.js';
import randerSpinner from './Spinner.js'
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';


const submitHandler = async (e)=>{
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

    // reset sorting buttons 
    sortingBtnRecentEl.classList.remove('sorting__button--active');
    sortingBtnRelevantEl.classList.add('sorting__button--active');

    // render spinner 
    randerSpinner('search')

    // fetch search results 
    try{
        // getData from commonjs 
        const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`)
        
        // extract job items from data
            let { jobItems} = data;
            // console.log(jobItems)

            // update state
            state.searchJobItems = jobItems;
            
            // reset pagination buttons when search again in same session
            state.currentPage = 1;
            renderPaginationButtons();
       

            //  remove spinner
            randerSpinner('search')

        //  render number of jobs on page footer
        numberEl.textContent= jobItems.length;
        // insert  in page footer
        jobsAvilableEL.textContent=`Total ${jobItems.length} jobs`;
        
       

        //  render job list in search job list
        renderJobList(state.searchJobItems)

        

    }catch (error){
        randerSpinner('search')
        renderError(error.message)
    }

};
searchFormEl.addEventListener('submit', submitHandler)

























//  older way of doing
//     fetch(`${BASE_API_URL}/jo152bs?search=${searchText}`)
//         .then(response => {
//             if (!response.ok){
//                 throw new Error("Resourse issue (e.g. resource doesn't exist.) or server issue!")
//             }
//             return response.json()
//         })
//         .then(data =>{
//             // only fetch the job items from data
//              let { jobItems} = data;
             
//              console.log(jobItems)
            
//              //  remove spinner
//              randerSpinner('search')

//             //  render number of jobs
//             numberEl.textContent= jobItems.length;
            
//             // page footer
//             jobsAvilableEL.textContent=`Total ${jobItems.length} jobs`;
            
//             //  rnder job list in search job list
//             renderJobList(jobItems)
//         })
//         // connection lost request - response cycle interrpted or rejected
//         .catch(error => {
//             randerSpinner('search')
//             renderError(error.message)
//         });


