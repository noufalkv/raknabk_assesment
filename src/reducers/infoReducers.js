import {
    INFO_SAVE_PERSONAL_INFO,
    INFO_SAVE_OFFICE_INFO,
    INFO_SAVE_PERSONAL_INFO_LOADING,
    INFO_SAVE_OFFICE_INFO_LOADING,
    INFO_SUBMIT_SUCCESS,
    INFO_SUBMIT_FAIL
} from '../constants/infoConstants'

export const infoReducers = (state={}, action) =>{
    switch(action.type){
        case  INFO_SAVE_PERSONAL_INFO_LOADING:
            return {...state, loading: true};

        case  INFO_SAVE_PERSONAL_INFO:
            return {...state, personalInfo:action.payload, loading: false};
        
         case  INFO_SAVE_OFFICE_INFO_LOADING:
            return {...state, loading: true};

        case INFO_SAVE_OFFICE_INFO:
            return {...state, officeInfo:action.payload, loading: false}  
        
        case  INFO_SUBMIT_SUCCESS:
            return {...state, officeInfo:{}, personalInfo:{} }
         
        case INFO_SUBMIT_FAIL:
            return {...state , officeInfo:{}, personalInfo:{}}
        default :
            return state;    

    }
}