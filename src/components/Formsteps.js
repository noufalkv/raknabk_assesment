import React from 'react';
import { Link } from 'react-router-dom';

const Formsteps = (props) => {
    return (
        <div>
            <div className="row form-steps">
               
                { props.step1 ? (
                    <Link to="/"><i className= 'activeColor fa fa-dot-circle-o' > <div className='active'>Step 1</div></i></Link>
                )  : (<i className='inactiveColor fa fa-dot-circle-o'> <div className= ''>Step 1</div></i>) }
                <div className={props.step2 ? 'active' : ''}> </div>


                { props.step2 ? (
                    <Link to="/officeInfo">  <i className=  'activeColor fa fa-dot-circle-o'><div className= 'active'>Step 2</div></i></Link>
                ) : (  <i className='inactiveColor fa fa-dot-circle-o'><div className='active'>Step 2</div></i>)}
                <div className={props.step3 ? 'active' : ''}></div>

                {props.step3 ? (
                    <Link to="/confirmation"> <i className='activeColor fa fa-dot-circle-o' ><div className= 'active'>Step 3</div></i></Link>
                ) : ( <i className= 'inactiveColor fa fa-dot-circle-o'><div className= 'active'>Step 3</div></i>)}
               
                {/* <div className={props.step3 ? 'active' : ''}></div> */}


            </div>
        </div>
    )
}
export default Formsteps