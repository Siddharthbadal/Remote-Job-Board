import{
    sortingEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    getData
} from '../common.js'

const clickHandler = event =>{
    // get clicked button element 
    const clickedBtnEl = event.target.closest('.sorting__button')

    // stop function if no clicked button element 
    if (!clickedBtnEl) return;

    //  sort by relevance or recent
    const recent = clickedBtnEl.className.includes('--recent') ? true : false;
    
    // sort jobs
    if (recent){
        
    }else{

    }
};

sortingEl.addEventListener('click', clickHandler)
