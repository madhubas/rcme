import React, { Fragment, useState } from "react";
import { Formik, Form, Field, resetForm } from "formik";
import axios from "axios";
import { TextField } from "./TextField";
import * as Yup from "yup";
import "./signup.css";
import CustomSelect from "./CustomSelect";
import artbg from "../assets/art1.jpeg";
import rcmelogo from "../assets/rcme-logo.png";
import {states} from './AdminCom/states'
import toastr from "toastr";

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Container,
  Card,
  CardBody,
  Row,
  Col,
  ButtonGroup,
  FormGroup,
  Label
} from "reactstrap";

class Signup extends React.Component {

    state = { 
      city:'',
      state:'',
      ageGroup:'',
      cityList:[],
      stateList:[],
      ageGroup:[
        {id:'1',label:"Upto 8"},
        {id:'2',label:"Between 8 - 12"},
        {id:'3',label:"Between 12 - 16"},
      ],
     };
  

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

    const validate = Yup.object({
      studentName: Yup.string().required("Required"),
      studentAge: Yup.number().required("Required"),
      ageGroup: Yup.string().required("Required"),
      grade: Yup.number().required("Required"),
      parentName: Yup.string().required("Required"),
      email: Yup.string().email("Email is invalid").required("Email is required"),
      phoneNumber: Yup.number().required("Required"),
      school: Yup.string(),
      address: Yup.string().required("Required"),
      region: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      pincode: Yup.number().required("Required"),
    });
    return (
      <Formik
      initialValues={{
        studentName: "",
        studentAge: "",
        ageGroup:"",
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
      validationSchema={validate}
      onSubmit={async (values, { resetForm, setFieldValue }) => {
        console.log(values);
        // post request to backend
        await axios
          .post("http://localhost:3050/user", values)
          .then(r => r.data.success ? toastr.success("Registered Successfully, Check Your Email Further Updates") : toastr.error("Failed to Register"))
          .catch(e => toastr.error(e))
        setTimeout(() => {
          window.location.reload()
        },1000)
      }}
    >
      {(formik) => (
        <div className="signup">
          <div className="artlogo-box">
            <img src={rcmelogo} alt="Art" className="artlogo" />
          </div>
          <h1 className="my-4 font-weight-bold .display-4">Register</h1>
          {/* <div className="signup-box"> */}
          <Container>
            <Card>
              <CardBody style={{backgroundColor:'#e6a9ca'}}>
              <Row>
              <Col md={6} sm={12} >
              <img style={{height: '100%',width: '100%'}} src={artbg} alt="Art" />
            </Col>
            <Col style={{backgroundColor:"#fff", padding:"10px"}} md={6} sm={12}>
              <Form>
                <Row>
                  <Col md={6} sm={12}>
                  <TextField
                    label="Student Name"
                    name="studentName"
                    type="text"
                  />
                  </Col><Col md={6} sm={12}>
                  <TextField
                    label="Student Age"
                    name="studentAge"
                    type="number"
                  />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12}>
                  <label for="region">Age Group</label>
                  <CustomSelect
                    options={this.state.ageGroup}
                    value={formik.values.ageGroup || ""}
                    onChange={(value) => {
                      formik.setFieldValue("ageGroup", value.label);
                    }}
                  />
                  {formik.errors.ageGroup ? (
                    <div style={{color:"red",fontSize:"10px"}}>{formik.errors.ageGroup}</div>
                  ) : undefined}</Col>
  
                  <Col md={6} sm={12}>
                  <TextField
                    label="Student Grade/Standard"
                    name="grade"
                    type="number"
                  />
                  </Col>
                  
                </Row>
                <Row>
                  <Col md={6} sm={12}>
                  <TextField label="Email" name="email" type="email" />
                  </Col>
                  <Col md={6} sm={12}>
                  <TextField
                    label="Parent's Name"
                    name="parentName"
                    type="text"
                  />
                  </Col>
                </Row>
                <Row>
                <Col md={6} sm={12}>
                  <TextField
                    label="Phone Number/Whatsapp Number"
                    name="phoneNumber"
                    type="number"
                  />
                  </Col>
                  <Col md={6} sm={12}>
                  <TextField
                    label="School Name/Home School"
                    name="school"
                    type="text"
                  />
                  </Col>
                
                </Row>
                <Row>
                  <Col md={6} sm={12}>
                  <label for="region">Region</label>
                  <CustomSelect
                    options={this.state.stateList}
                    value={formik.values.region || ""}
                    onChange={(value) => {
                      this.setState({state: value.label})
                      formik.setFieldValue("region", value.label);
                      const city = states.states.filter((state) => state.name === value.label)
                      this.setState({
                        cityList:city[0]?.cities?.map((a)=> {
                              return { value: parseInt(a.id), label: a.name }}),
                      })
                    }}
                  />
                  {formik.errors.region ? (
                    <div  style={{color:"red",fontSize:"10px"}}>{formik.errors.region}</div>
                  ) : undefined}  
                  </Col>
                  <Col md={6} sm={12}>
                  <label for="city">City</label>
                <CustomSelect
                    options={this.state.cityList}
                    value={formik.values.city || ""}
                    onChange={(value) => {
                      formik.setFieldValue("city", value.label);
                    }}
                  />
                  {formik.errors.city ? (
                    <div  style={{color:"red",fontSize:"10px"}}>{formik.errors.city}</div>
                  ) : undefined}    
                  </Col>              
                </Row>
                <Row>
                  <Col md={6} sm={12}>
                  <TextField label="Address" name="address" type="text" />
                  </Col>
                  <Col md={6} sm={12}><TextField label="Pincode" name="pincode" type="number" /></Col>
                </Row>
                <div className="button-component">
                  <button className="btn btn-dark mt-3" type="submit">
                    Register
                  </button>
                  <button className="btn btn-danger mt-3 ml-3" type="reset">
                    Reset
                  </button>
                </div>
              </Form>
            </Col>
            </Row>
              </CardBody>
            </Card>
          </Container>
          
                    </div>
      )}
    </Formik>
    );
  }
}

export default Signup;