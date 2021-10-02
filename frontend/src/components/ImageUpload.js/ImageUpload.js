import React, { Component } from 'react';
import axios from 'axios';
import rcmelogo from "../../assets/rcme-logo.png";
import artbg from "../../assets/art1.jpeg";
import toastr from "toastr";

import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Button
} from "reactstrap";

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
    };

  this.uploadHandler = this.uploadHandler.bind(this);
  }

   data = new FormData();
  
   handleChange=(event)=>{
    this.data.append('file', event.target.files[0]);
  };

  uploadHandler = () =>{
    axios.put(`http://localhost:3050/upload/${this.props.match.params.id}`, this.data)
    .then(r => r.data.success===true ? toastr.success("Uploaded Successfully") : toastr.error("Failed to Upload , Check your Id")).catch((e) => toastr.error(e))
    setTimeout(() =>{
      this.props.history.push('/register')
    },2000)
  };

  render() {
    return  (
      <div className="signup" >
      <div className="artlogo-box">
        <img src={rcmelogo} alt="Art" className="artlogo" />
      </div>
      <h1 className="my-4 font-weight-bold .display-4">Upload</h1>
      {/* <div className="signup-box"> */}
      <Container>
        <Card>
          <CardBody style={{backgroundColor:'#e6a9ca'}}>
          <Row>
          <Col >
          <img style={{height: '100%',width: '100%'}} src={artbg} alt="Art" />
        </Col>
        <Col style={{backgroundColor:"#fff", padding:"10px", display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div>
        <div>
          <input type="file" name="file" onChange={e=>this.handleChange(e)}/>
        </div>
           <Button className="primary mt-2" onClick={this.uploadHandler}>Submit</Button>
      </div>
        </Col>

        </Row>
          </CardBody>
        </Card>
      </Container>
      
                </div>
      
      
      
    
    )
  }
}
