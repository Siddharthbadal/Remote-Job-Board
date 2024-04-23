import {
    state,
    RESULT_PER_PAGE,
    paginationEl,
    paginationBtnBackEl,
    paginationBtnNextEl,
    paginationNumberBackEl,
    paginationNumberNextEl
} from '../common.js';
import renderJobList from './JobList.js';

const renderPaginationButtons = () =>{
    // display back button when on page 2 or further
    if (state.currentPage >= 2){
        paginationBtnBackEl.classList.remove('pagination__button--hidden');

    } else{
        paginationBtnBackEl.classList.add('pagination__button--hidden');

    } 

    // display next if there jobs left to display
    if ((state.searchJobItems.length - state.currentPage * RESULT_PER_PAGE) <= 0){
        paginationBtnNextEl.classList.add('pagination__button--hidden');

    } else{
        paginationBtnNextEl.classList.remove('pagination__button--hidden');

    } 

    // update page number 
    paginationNumberNextEl.textContent = state.currentPage + 1;
    paginationNumberBackEl.textContent = state.currentPage - 1;

    paginationNumberNextEl.blur();
    paginationNumberBackEl.blur();

    
    
};


const clickHandler= event =>{
    // get clicked button element 
    const clickedBtnEl = event.target.closest('.pagination__button');

    // stop function if null
    if (!clickedBtnEl) return;

    // check if intention if for next or back
    const nextPage = clickedBtnEl.className.includes('--next') ? true : false;
    
    //  update state - currentPage
    nextPage ? state.currentPage++ : state.currentPage--;

    // render pagination button
    renderPaginationButtons();

    // render job item for tat page 
    renderJobList()


}

paginationEl.addEventListener('click', clickHandler);

export default renderPaginationButtons;