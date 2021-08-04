import React, { useState } from "react";
import Title from "../components/Title";
import Menu from "../components/Menu";
import Formsteps from "../components/Formsteps";
import { saveOfficeInfo } from "../actions/infoActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/Loading";

const OfficeInfo = (props) => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.infoReducers);
  const { officeInfo, loading } = info;

  const [buildingName, setBuildingName] = useState(officeInfo.buildingName);
  const [city, setCity] = useState(officeInfo.city);
  const [landLineNo, setLandLineNo] = useState(officeInfo.landLineNo);

  const [addressLine1, setAddressLine1] = useState(officeInfo.addressLine1);
  const [addressLine2, setAddressLine2] = useState(officeInfo.addressLine2);
  const [pobox, setPobox] = useState(officeInfo.pobox);

  const [initialState, setInitialState] = useState({
    buildingError: "",
    cityError: "",
    landlineError: "",
    addressLineError: "",
  });

  const validate = () => {
    let buildingError = "";
    let cityError = "";
    let landlineError = "";
    let addressLineError = "";

    if (!buildingName) {
      buildingError = "Buildibg Name cannot be blank";
    }

    if (!city) {
      cityError = "City cannot be blank";
    }

    if (!landLineNo) {
      landlineError = "Landline cannot be blank";
    }

    if (!addressLine1) {
      addressLineError = "AddressLine1 cannot be blank";
    }

    if (buildingError || cityError || landlineError || addressLineError) {
      setInitialState({
        buildingError,
        cityError,
        landlineError,
        addressLineError,
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
        buildingError: "",
        cityError: "",
        landlineError: "",
        addressLineError: "",
      });
      dispatch(
        saveOfficeInfo({
          buildingName,
          city,
          landLineNo,
          addressLine1,
          addressLine2,
          pobox,
        })
      );
      props.history.push("/confirmation");
    }
  };
  return (
    <>
      {officeInfo.name}
      <div className="menu">
        <div className="menu_title">
          <Title header="Office Details" />
        </div>
        <div>
          <Menu />
        </div>
      </div>

      <div className="steps">
        <Formsteps step1 step2></Formsteps>
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
                      {initialState.buildingError
                        ? initialState.buildingError
                        : ""}
                    </div>
                    <div>
                      {" "}
                      {initialState.cityError ? initialState.cityError : ""}
                    </div>
                    <div>
                      {" "}
                      {initialState.landlineError
                        ? initialState.landlineError
                        : ""}
                    </div>
                    <div>
                      {" "}
                      {initialState.addressLineError
                        ? initialState.addressLineError
                        : ""}
                    </div>
                  </div>
                </div>

                <div className="form_flex">
                  <div className="labelText">
                    <label htmlFor="name">Building Name</label>
                  </div>
                  <div>
                    <input
                      id="buildingName"
                      type="text"
                      placeholder="Enter Building Name"
                      value={buildingName}
                      onChange={(e) => setBuildingName(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="form_flex">
                  <div className="labelText">
                    <label htmlFor="city">City</label>
                  </div>
                  <div>
                    <input
                      id="city"
                      type="text"
                      placeholder="Enter City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="form_flex">
                  <div className="labelText">
                    <label htmlFor="landLineNo">LandLine</label>
                  </div>
                  <div>
                    <input
                      id="landLineNo"
                      type="text"
                      placeholder="Enter Landline"
                      value={landLineNo}
                      onChange={(e) => setLandLineNo(e.target.value)}
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
                    <label htmlFor="addressLine3">P O Box</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="pobox"
                      value={pobox}
                      placeholder="Enter P O Box"
                      onChange={(e) => setPobox(e.target.value)}
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

export default OfficeInfo;
