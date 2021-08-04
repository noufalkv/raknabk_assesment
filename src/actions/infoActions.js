import {INFO_SAVE_PERSONAL_INFO,
INFO_SAVE_OFFICE_INFO,
INFO_SAVE_OFFICE_INFO_LOADING,
INFO_SAVE_PERSONAL_INFO_LOADING,
INFO_SUBMIT_SUCCESS,
INFO_SUBMIT_FAIL
} from '../constants/infoConstants'
import Axios from 'axios'

export const savePersonalInfo = (data) => (dispatch) =>{

    dispatch({type: INFO_SAVE_PERSONAL_INFO_LOADING, payload : {}});

    dispatch({type: INFO_SAVE_PERSONAL_INFO, payload : data});
    localStorage.setItem('personalInfo', JSON.stringify(data));
}
export const saveOfficeInfo = (data) => (dispatch) => {

     dispatch({type: INFO_SAVE_OFFICE_INFO_LOADING, payload : {}});

    dispatch({type:INFO_SAVE_OFFICE_INFO, payload:data});
    localStorage.setItem('officeInfo', JSON.stringify(data));
}
export const submitAddress=  (info)=> async (dispatch) => {

   
  try {
    const { data } = await Axios.post('https://jsonplaceholder.typicode.com/posts', {
     info
        
    });
    dispatch({ type: INFO_SUBMIT_SUCCESS, payload: data });
    
    localStorage.removeItem("personalInfo");
    localStorage.removeItem("officeInfo");

  } catch (error) {
      localStorage.removeItem("personalInfo");
    localStorage.removeItem("officeInfo");
    dispatch({
      type: INFO_SUBMIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}