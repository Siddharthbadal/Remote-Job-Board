import {
    BASE_API_URL,
    state,
    jobListSearchEl,
    jobDetailsContentEl,
    getData
} from '../common.js';
import randerSpinner from './Spinner.js'
import renderJobDetails from './JobDetails.js';


const renderJobList = () =>{
    // remove previous job items
    jobListSearchEl.innerHTML='';


    // using the state variable
    state.searchJobItems.slice(state.currentPage *7 -7, state.currentPage * 7).forEach((jobItem)=>{                         
                                
        const newJobItemHTML = `
                <li class="job-item">
                <a class="job-item__link" href="${jobItem.id}">
                    <div class="job-item__badge">${jobItem.badgeLetters}</div>
                    <div class="job-item__middle">
                        <h3 class="third-heading">${jobItem.title}</h3>
                        <p class="job-item__company">${jobItem.company}</p>
                        <div class="job-item__extras">
                            <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                        </div>
                    </div>
                    <div class="job-item__right">
                        <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                        <time class="job-item__time">${jobItem.daysAgo}d</time>
                    </div>
                </a>
            </li>           
        `
        jobListSearchEl.insertAdjacentHTML('beforeend', newJobItemHTML)
    
    });
        
};


// Job list component 
const clickHandler = async (event)=>{
    //  prevent default behaviour 
    event.preventDefault();

    // check for the correct clicked job item
    const jobItemEl = event.target.closest('.job-item')
    
    // third way of doing - option chaining
    document.querySelector('.job-item--active')?.classList.remove('job-item--active')

    // add active class on list item
    jobItemEl.classList.add('job-item--active')

    // job details ection emptry the text and load pinner
    jobDetailsContentEl.innerHTML = '';
    // render spiiner
    randerSpinner('job-details')

    // get the id of clicked job item
    const id = jobItemEl.children[0].getAttribute(['href']);

    // fetch job item data
    try{
        //  gedata from common.js
        const data = await getData(`${BASE_API_URL}/jobs/${id}`)        
    
        const { jobItem } = data;
            
        //  remove spinner
        randerSpinner('job-details')

        // render job details
        renderJobDetails(jobItem);
       
    }catch (error){
        randerSpinner('job-details')
        renderError(error.message)
    }    
};

jobListSearchEl.addEventListener('click', clickHandler)

export default renderJobList;









































//  older ways



// // Job list component 
// const clickHandler = (event)=>{
//     //  prevent default behaviour 
//     event.preventDefault();

//     // check for the correct clicked job item
//     const jobItemEl = event.target.closest('.job-item')
    
//     // remove the active class from previously active job item
//     // first way of doing
//     // const activeJobItemEl = document.querySelector('.job-item--active')
//     // if (activeJobItemEl){
//     //     activeJobItemEl.classList.remove('job-item--active')
//     // }

//     // second way of doing
//     // document.querySelector('.job-item--active') && document.querySelector('.job-item--active').classList.remove('.job-item--active')

//     // third way of doing - option chaining
//     document.querySelector('.job-item--active')?.classList.remove('job-item--active')

//     // add active class on list item
//     jobItemEl.classList.add('job-item--active')


//     // job details ection emptry the text and load pinner
//     jobDetailsContentEl.innerHTML = '';
//     // render spiiner
//     randerSpinner('job-details')


//     // get the id of clicked job item
//     const id = jobItemEl.children[0].getAttribute(['href']);

//     // fetch job item data
//     fetch(`${BASE_API_URL}/jobs/${id}`)
//     .then(response =>{
//         if(!response.ok){ // 4xx, 5xx status code
//             throw new Error("Resourse issue (e.g. resource doesn't exist.) or server issue!") 
//         }
//        return response.json();
//     })
//     .then(data => {
//         // extract job details 
//         const { jobItem } = data;
        
//         //  remove spinner
//         randerSpinner('job-details')

//         // render job details
//         renderJobDetails(jobItem)
//     })
//     .catch(error => {
//         randerSpinner('job-details')
//         renderError(error.message)
//     });   
//     // network problem and other issues. parsing json that is not json

// }


// jobListSearchEl.addEventListener('click', clickHandler)

// export default renderJobList;