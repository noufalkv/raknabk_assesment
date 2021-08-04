import React, { useState } from "react";
import Title from "../components/Title";
import Menu from "../components/Menu";
import Formsteps from "../components/Formsteps";
import { useDispatch, useSelector } from "react-redux";
import { savePersonalInfo } from "../actions/infoActions";
import LoadingBox from "../components/Loading";

const PersonalInfo = (props) => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.infoReducers);
  const { personalInfo, loading } = info;

  const [name, setName] = useState(personalInfo.name);
  const [email, setEmail] = useState(personalInfo.email);
  const [mobileNo, setMobileNo] = useState(personalInfo.mobileNo);
  const [addressLine1, setAddressLine1] = useState(personalInfo.addressLine1);
  const [addressLine2, setAddressLine2] = useState(personalInfo.addressLine2);
  const [addressLine3, setAddressLine3] = useState(personalInfo.addressLine3);

  const [initialState, setInitialState] = useState({
    nameError: "",
    emailError: "",
    mobileNoError: "",
  });

  const validate = () => {
    let nameError = "";
    let emailError = "";
    let mobileNoError = "";
    let emailblankError = "";

    if (!name) {
      nameError = "Name cannot be blank";
    }
    if (!email) {
      emailblankError = "Email cannot be blank";
    }

    if (!mobileNo) {
      mobileNoError = "Mobile No cannot be blank";
    }

    if (nameError || emailError || mobileNoError || emailblankError) {
      setInitialState({
        nameError,
        emailError,
        mobileNoError,
        emailblankError,
      });
      return false;
    }

    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (isValid) {
      // clear form

      setInitialState({
        nameError: "",
        emailError: "",
        mobileNoError: "",
      });
      dispatch(
        savePersonalInfo({
          name,
          email,
          mobileNo,
          addressLine1,
          addressLine2,
          addressLine3,
        })
      );

      props.history.push("/officeInfo");
    }
  };
  return (
    <>
      <div className="menu">
        <div className="menu_title">
          <Title header="Personal Info" />
        </div>
        <div>
          <Menu />
        </div>
      </div>

      <div className="steps">
        <Formsteps step1></Formsteps>
      </div>
      {loading ? (
        <LoadingBox />
      ) : (
        <form className="form" onSubmit={submitHandler}>
          <div className="form_box">
            <div className="card">
              <div className="col1">
                <div className="form_flex">
                  <div className="err">
                    <div>
                      {" "}
                      {initialState.nameError
                        ? initialState.nameError
                        : ""}{" "}
                    </div>
                    <div>
                      {" "}
                      {initialState.emailError ? initialState.emailError : ""}
                    </div>
                    <div>
                      {" "}
                      {initialState.mobileNoError
                        ? initialState.mobileNoError
                        : ""}{" "}
                    </div>
                    <div>
                      {" "}
                      {initialState.emailblankError
                        ? initialState.emailblankError
                        : ""}{" "}
                    </div>
                  </div>
                </div>

                <div className="form_flex">
                  <div className="labelText">
                    <label htmlFor="name">Name</label>
                  </div>
                  <div>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="form_flex">
                  <div className="labelText">
                    <label htmlFor="email">Email</label>
                  </div>
                  <div>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="form_flex">
                  <div className="labelText">
                    <label htmlFor="mobileNo">mobileNo</label>
                  </div>
                  <div>
                    <input
                      id="mobileNo"
                      type="mobileNo"
                      placeholder="Enter mobileNo"
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="form_flex">
                  <div className="labelText">
                    <label htmlFor="addressLine1">AddressLine1</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="addressLine1"
                      value={addressLine1}
                      placeholder="Enter AddressLine1"
                      onChange={(e) => setAddressLine1(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="form_flex">
                  <div className="labelText">
                    <label htmlFor="addressLine2">AddressLine2</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="addressLine2"
                      value={addressLine2}
                      placeholder="Enter AddressLine2"
                      onChange={(e) => setAddressLine2(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="form_flex">
                  <div className="labelText">
                    <label htmlFor="addressLine3">AddressLine3</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="addressLine3"
                      value={addressLine3}
                      placeholder="Enter AddressLine3"
                      onChange={(e) => setAddressLine3(e.target.value)}
                    ></input>
                  </div>
                </div>
              </div>

              <div className="col2">
                <div className="flex-center">
                  <button type="submit" className="btn">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default PersonalInfo;
