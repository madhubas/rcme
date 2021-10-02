import React, { Fragment, useState } from "react";
import { Formik, Form, Field, resetForm } from "formik";
import axios from "axios";
import { TextField } from "./TextField";
import * as Yup from "yup";
import "./signup.css";
import artbg from "../assets/art1.jpeg";
import artlogo from "../assets/rcme-logo.png";
import DropDown from "./AdminCom/DropDown";
import {states} from './AdminCom/states'

class Register extends React.Component {

    state = {
        city:'',
        state:'',
        cityList:[],
        stateList:[]
    }

     validate = Yup.object({
        studentName: Yup.string().required("Required"),
        studentAge: Yup.number().required("Required"),
        grade: Yup.number().required("Required"),
        parentName: Yup.string().required("Required"),
        email: Yup.string().email("Email is invalid").required("Email is required"),
        phoneNumber: Yup.number().required("Required"),
        school: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        pincode: Yup.number().required("Required"),
      });

      setstateValues = () => {
        this.setState({
            stateList:states.states.map((a)=> {
                 return { value: parseInt(a.id), label: a.name }
               })
          })
      }
    componentDidMount(){
        this.setstateValues()
    }
    
    render() {
        return (
            <Formik
      initialValues={{
        studentName: "",
        studentAge: "",
        grade: "",
        parentName: "",
        email: "",
        phoneNumber: "",
        school: "",
        region: "",
        city: "",
        address: "",
        pincode: "",
      }}
      validationSchema={this.validate}
      onSubmit={async (values, { resetForm, setFieldValue }) => {
        console.log(values);
        // post request to backend
        await axios
          .post("http://localhost:3050/user", values)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
        alert("Form has been submitted");
        resetForm();
      }}
    >
      {(formik,values) => (
        <div className="signup">
          <div className="artlogo-box">
            <img src={artlogo} alt="Art" className="artlogo" />
          </div>
          <h1 className="my-4 font-weight-bold .display-4">Register</h1>

          <div className="signup-box">
            <div id="form_signup">
              <Form>
                <div className="one-by-two">
                  <TextField
                    label="Student Name"
                    name="studentName"
                    type="text"
                  />
                  <TextField
                    label="Student Age"
                    name="studentAge"
                    type="number"
                  />
                </div>
                <div className="one-by-two">
                  <TextField
                    label="Student Grade/Standard"
                    name="grade"
                    type="number"
                  />
                  <TextField
                    label="Parent's Name"
                    name="parentName"
                    type="text"
                  />
                </div>
                <div className="one-by-two">
                  <TextField label="Email" name="email" type="email" />

                  <TextField
                    label="Phone Number/Whatsapp Number"
                    name="phoneNumber"
                    type="number"
                  />
                </div>
                <div className="one-by-two">
                  <TextField
                    label="School Name/Home School"
                    name="school"
                    type="text"
                  />
                  {/* <DropDown
                                              label="State"
                                              className="react-select"
                                              classNamePrefix="react-select"
                                              isSearchable
                                              isClearable={true}
                                              onChange={(value) => {
                                                formik.setFieldValue("region", value.value);
                                              }}
                                              options={this.state.stateList}
                                              Action={entity => {
                                                if(entity){
                                               
                                                this.setState({
                                                  state:entity ? entity.label : "",
                                                },(values) => {
                                                    // values.region = entity.label
                                                    const city = states.states.filter((state) => state.name === this.state.state)
                                                    this.setState({

                                                      cityList:city[0]?.cities?.map((a)=> {
                                                            return { value: parseInt(a.id), label: a.name }}),
                                                    })
                                                })
                                                }else{
                                                 this.setState({
                                                  state:'',
                                                  cityList:[],
                                                })
                                                }
                                              }}
                                            /> */}
                </div>
                <div className="one-by-two">
                {/* <DropDown
                                              label="City"
                                              className="react-select"
                                              classNamePrefix="react-select"
                                              isSearchable
                                              onChange={(value) => {
                                                formik.setFieldValue("region", value.value);
                                              }}
                                              isClearable={true}
                                              options={this.state.cityList}
                                              Action={entity => {
                                                if(entity){
                                                    this.setState({
                                                        city:entity ? entity.label : "",
                                                    },(values)=>{
                                                        // values.city = entity.label
                                                    })
                                                }else{
                                                 this.setState({
                                                  cityList:[],
                                                })
                                                }
                                              }}
                                            /> */}
                  <TextField label="Address" name="address" type="text" />
                </div>
                <TextField label="Pincode" name="pincode" type="number" />
                <div className="button-component">
                  <button className="btn btn-dark mt-3" type="submit">
                    Register
                  </button>
                  <button className="btn btn-danger mt-3 ml-3" type="reset">
                    Reset
                  </button>
                </div>
              </Form>
            </div>
            <div className="signup-img">
              <img src={artbg} alt="Art" />
            </div>
          </div>
        </div>
      )}
    </Formik>
        );
    }
}

export default Register;

