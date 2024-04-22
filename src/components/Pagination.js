import {
    state,
    paginationEl,
    paginationBtnBackEl,
    paginationBtnNextEl,
    paginationNumberBackEl,
    paginationNumberNextEl
} from '../common.js';
import renderJobList from './JobList.js';


const clickHandler= event =>{
    // get clicked button element 
    const clickedBtnEl = event.target.closest('.pagination__button');

    // stop function if null
    if (!clickedBtnEl) return;

    // check if intention if for next or back
    const nextPage = clickedBtnEl.className.includes('--next') ? true : false;
    //  update state - currentPage
    nextPage ? state.currentPage++ : state.currentPage--;

    // render job item for tat page 
    renderJobList()


}

paginationEl.addEventListener('click', clickHandler)