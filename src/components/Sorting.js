import{
    sortingEl,
    state,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    getData
} from '../common.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';

const clickHandler = event =>{
    
    // get clicked button element
    const clickedButtonEl = event.target.closest('.sorting__button')

    // stop if no clicked button
    if (!clickedButtonEl) return;

    // if sorted; reset to page 1
    state.currentPage = 1;


    // check if acton is to sort by relevance or recency
    const recent = clickedButtonEl.className.includes('--recent') ? true : false;

    // make sorting buttons active and inactive
    if (recent){
        sortingBtnRecentEl.classList.add('sorting__button--active');
        sortingBtnRelevantEl.classList.remove('sorting__button--active');
    }else{
        sortingBtnRecentEl.classList.remove('sorting__button--active');
        sortingBtnRelevantEl.classList.add('sorting__button--active');
    }

    if (recent){
        // return a positive number to sort b higher than a
        // return a negative number to sort a higher than b. and 0 to stay same
        // if a is 10 and b is 5 so b is more recent and should be sorted higher
        state.searchJobItems.sort((a,b) =>{
            return a.daysAgo - b.daysAgo;
        })
    } else{
        state.searchJobItems.sort((a,b) =>{
            // if a relevanceScore is 90 and b relevanceScore is 80 than a should rank higher.
            //  sort should return a negative number for this
            return b.relevanceScore - a.relevanceScore
        });
    }

    // render pagination
    renderPaginationButtons();
    
    // render job list
    renderJobList();

};



sortingEl.addEventListener('click', clickHandler)