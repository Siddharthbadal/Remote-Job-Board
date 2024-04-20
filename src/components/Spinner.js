import {
    spinnerSearchEl,
    spinnerJobDetailsEl,    
} from '../common.js';


const randerSpinner = (whichSpinner)=>{
    const spinnerEl = whichSpinner === 'search' ? spinnerSearchEl : spinnerJobDetailsEl;
    spinnerEl.classList.toggle('spinner--visible');
};

export default randerSpinner;