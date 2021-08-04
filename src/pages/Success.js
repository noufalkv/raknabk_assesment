import React from 'react'

const Success = (props) => {
    const finalSubmit = ()=>{
         props.history.push("/");
    }
    return (
        <div>
            <div className="success">
                  <i className= 'fa fa-check-circle ch_circle'> </i>
                <h1>Success</h1>
                <h3>Your appplication has been Submitted successfully</h3>


                <button type="submit" className="btn" onClick={finalSubmit}>
                Ok
              </button>
            </div>
        </div>
    )
}


export default Success;