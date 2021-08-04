import React, { useRef, useState, useEffect } from "react";
import Title from "../components/Title";
import Menu from "../components/Menu";
import Formsteps from "../components/Formsteps";
import {  submitAddress } from "../actions/infoActions";
import { useDispatch } from "react-redux";
import SignaturePad from "react-signature-canvas";
import Axios from "axios";

const Confirmation = (props) => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();
  const sigPad = useRef();
  const data = "";

  useEffect(() => {
    if (localStorage.getItem("officeInfo") == null) {
      props.history.push("/");
    }

    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const personalInfo = JSON.parse(localStorage.getItem("personalInfo"));
  const officeInfo = JSON.parse(localStorage.getItem("officeInfo"));
  const dispatch = useDispatch();

  const clear = () => {
    sigPad.current.clear();
  };
  //  const show = ()=>{
  //     sigPad.current.fromDataURL(data)
  // }
    const save = (e)=>{
      e.preventDefault();
     data = sigPad.current.toDataURL();
  }

  const [playing, setPlaying] = useState(false);

  const HEIGHT = 100;
  const WIDTH = 100;

  const startVideo = (e) => {
    e.preventDefault();
    setPlaying(true);
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream) => {
        let video = document.getElementsByClassName("app__videoFeed")[0];
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  };

  const stopVideo = (e) => {
    e.preventDefault();

    setPlaying(false);
    let video = document.getElementsByClassName("app__videoFeed")[0];
    video.srcObject.getTracks()[0].stop();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    

    const personalInfo = JSON.parse(localStorage.getItem("personalInfo"));
    const officeInfo = JSON.parse(localStorage.getItem("officeInfo"));

    

     dispatch(
      submitAddress({
        personalInfo,
        officeInfo,
        image,
        data
         
      })
    );

    

    props.history.push("/success");
  };
  const back = () => {
    props.history.push("/");
  };

  return (
    <>
      <div className="menu">
        <div className="menu_title">
          <Title header="Confirmation Page" />
        </div>
        <div>
          <Menu />
        </div>
      </div>

      <div className="steps">
        <Formsteps step1 step2 step3></Formsteps>
      </div>

      <form className="form" onSubmit={submitHandler}>
        <div className="form_box">
          <div className="card">
            <div className="col1">
              {/* <div className="form_flex confirmTxt">
                <div>{personalInfo.name}</div>
                <div>{personalInfo.email}</div>
              </div> */}
              <div className="personalinfo">
                <div className="form_flex confirmTxt">
                  <div> Name : {personalInfo ? personalInfo.name : ""}</div>
                  <div> Email : {personalInfo ? personalInfo.email : ""}</div>
                  <div>
                    Mobile No : {personalInfo ? personalInfo.mobileNo : ""}
                  </div>
                  <div>
                    {" "}
                    Address 1 : {personalInfo ? personalInfo.addressLine1 : ""}
                  </div>
                  <div>
                    {" "}
                    Address 2 : {personalInfo ? personalInfo.addressLine2 : ""}
                  </div>
                  <div>
                    {" "}
                    Address 3 : {personalInfo ? personalInfo.addressLine3 : ""}
                  </div>
                </div>

                <div className="form_flex confirmTxt">
                  <div>
                    {" "}
                    Building Name : {officeInfo ? officeInfo.buildingName : ""}
                  </div>
                  <div> City : {officeInfo ? officeInfo.city : ""}</div>
                  <div>
                    {" "}
                    Landline No: {officeInfo ? officeInfo.landLineNo : ""}
                  </div>
                  <div>
                    {" "}
                    Address 1 : {officeInfo ? officeInfo.addressLine1 : ""}
                  </div>
                  <div> PO Box {officeInfo ? officeInfo.pobox : ""}</div>
                </div>
              </div>
            </div>

            <div className="col2">
              <div className="flex-center">
                <div className="imgUpload">
                  <div>
                    {preview ? (
                      <img
                        alt=""
                        width="50"
                        height="50"
                        src={preview}
                        style={{ objectFit: "cover" }}
                        onClick={() => {
                          setImage(null);
                        }}
                      />
                    ) : (
                      <i class="fa fa-user-circle"></i>
                    )}

                    <div className="image-upload ">
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          fileInputRef.current.click();
                        }}
                      >
                        <i class="fa fa-folder-open"></i>
                      </button>

                      <input
                        type="file"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files[0];
                          if (file && file.type.substr(0, 5) === "image") {
                            setImage(file);
                          } else {
                            setImage(null);
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="app__container">
                      <video
                        height={HEIGHT}
                        width={WIDTH}
                        muted
                        autoPlay
                        className="app__videoFeed"
                      ></video>

                      <div className="app__input">
                        {playing ? (
                          <button onClick={stopVideo}>
                            {" "}
                            <i class="fa fa-camera"></i>
                          </button>
                        ) : (
                          <button onClick={startVideo}>
                            {" "}
                            <i class="fa fa-camera"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="imgUpload ">
                  <SignaturePad
                    ref={sigPad}
                    canvasProps={{
                      width: 200,
                      height: 50,
                      className: "sigCanvas",
                    }}
                    penColor="green"
                  ></SignaturePad>
                </div>
                <div className="btn_sign">
                  <button type="button" onClick={clear}>
                    <i class="fa fa-trash"></i>
                  </button>
                  <button type="button" onClick = {save}><i class="fa fa-save"></i></button>
             {/*   <button type="button" onClick = {show}><i class="fa fa-eye"></i></button> */}
                </div>
              </div>
            </div>
          </div>

          <div className="bt_card">
            <div className="bt_btn">
              <button type="button" className="btnbk " onClick={back}>
                Back
              </button>
            </div>
            <div className="bt_btn">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Confirmation;
