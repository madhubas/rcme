import React from "react";
import { Formik, Form, Field, resetForm } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "../signup.css";
import artbg from "../../assets/art1.jpeg";
import artlogo from "../../assets/rcme-logo.png";
import toastr from "toastr";
import {TextField} from "../TextField"

import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";

class Upload extends React.Component {

  

   validate = Yup.object({
    id: Yup.string().required("Required"),
  });
  render() {
    return (
      <>
      <Formik
        initialValues={{
          id: "",
        }}
        validationSchema={this.validate}
        onSubmit={(values) => {
          this.props.history.push(`/upload/${values.id}`)
        }}
      >
      {(formik) => (
        <div className="signup" >
          <div className="artlogo-box">
            <img src={artlogo} alt="Art" className="artlogo" />
          </div>
          <h1 className="my-4 font-weight-bold .display-4">Check Status</h1>
          {/* <div className="signup-box"> */}
          <Container>
            <Card>
              <CardBody style={{backgroundColor:'#e6a9ca'}}>
              <Row>
              <Col >
              <img style={{height: '100%',width: '100%'}} src={artbg} alt="Art" />
            </Col>
              <Form>
              <TextField label="id" name="id" type="text" />
              <button className="btn btn-dark mt-3" type="submit">
                Check
              </button>
            </Form>
           
            </Row>
              </CardBody>
            </Card>
          </Container>
          
                    </div>
      )}
    </Formik>
   </>
    );
  }
}

export default Upload;