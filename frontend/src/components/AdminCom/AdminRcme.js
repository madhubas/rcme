import React, { Fragment } from "react";
import ListPage from "./ListPage";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import DropDown from './DropDown'
import {states} from "./states"
import * as Yup from "yup";
import image from "./public/1632906083410-claculation-1.jpg"
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Card,
  CardBody,
  Row,
  Col,
  ButtonGroup,
  FormGroup,
  Label
} from "reactstrap";
import './Adminrcme.css'
import AdminUserCard from './AdminUserCard.js'
class AdminRcme extends React.Component {
  state = {
    per_page:10,
    page:1,
    totalCount:0,
    mark1:null,
    mark2:null,
      filterstate:false,
      filtercity:false,
      filterage:false,
      filtergrade:false,
      filterstatus:false,
      filtermark1:false,
      filtermark2:false,
      statusfilter:null,
      state:'',
      city:'',
      grade:'',
      stateList:[],
      cityList:[],
      editData: {
      studentname: "",
      studentage: "",
      grade: "",
      parentname: "",
      email: "",
      phonenumber: "",
      school: "",
      region: "",
      city: "",
      address: "",
      pincode: "",
      payment: "",
      status:false,
    },
gradeOptions : [
    {label:'1',id:"1"},
    {label:'2',id:"2"},
    {label:'3',id:"3"},
    {label:'4',id:"4"},
    {label:'5',id:"5"},
    {label:'6',id:"6"},
    {label:'7',id:"7"},
    {label:'8',id:"8"},
    {label:'9',id:"9"},
    {label:'10',id:"10"}
  ],
markOptions : [
    {label:'1',id:1},
    {label:'2',id:2},
    {label:'3',id:3},
    {label:'4',id:4},
    {label:'5',id:5},
    {label:'6',id:6},
    {label:'7',id:7},
    {label:'8',id:8},
    {label:'9',id:9},
    {label:'10',id:10}
  ],
    managEditModal: false,
    isLoading: true,
    data: [],
    column: [
      {
        name: "id",
        selector: "id",
        sortable: false,
        cell: (row) => <span>{row.id ? row.id : ""}</span>,
      },
      {
        name: "Name",
        selector: "studentname",
        sortable: false,
        cell: (row) => <span>{row.studentname ? row.studentname : ""}</span>,
      },
      {
        name: "Age",
        selector: "age",
        sortable: false,
        cell: (row) => (
          <span>{row.studentage ? row.studentage : ""}</span>
        ),
      },
      {
        name: "Email",
        selector: "email",
        sortable: false,
        cell: (row) =><a href={`mailto:${row.email}`}>{row.email ? row.email : ""}</a>,
      },
      {
        name: "Region",
        selector: "region",
        sortable: false,
        cell: (row) => <span>{row.region ? row.region : ""}</span>,
      },
      {
        name: "City",
        selector: "city",
        sortable: false,
        cell: (row) => (
          <span>{row.city ? row.city : ""}</span>
        ),
      },
      {
        name: "Mark1",
        selector: "mark1",
        sortable: false,
        cell: (row) => (
          <span>{row.mark1 ? row.mark1 : "-"}</span>
        ),
      },
      {
        name: "Mark2",
        selector: "mark2",
        sortable: false,
        cell: (row) => (
          <span>{row.mark2 ? row.mark2 : "-"}</span>
        ),
      },
      {
        name: "Signedby",
        selector: "signedby",
        sortable: false,
        cell: (row) => (
          <span>{row.signedby ? row.signedby : "-"}</span>
        ),
      },
      {
        name: "Status",
        selector: "status",
        sortable: false,
        cell: (row) => (
          <span style={{alignItems:'center',justifyContent: 'center'}}>{row.status ===false ? <img src={'https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color-round/3/44-512.png'} style={{height:'18px', width:'18px'}} alt="false" />:<img style={{height:'18px', width:'18px'}} src={'https://icon2.cleanpng.com/20180703/esh/kisspng-insurance-information-business-service-synology-in-5b3c32cd5f44c3.1515026615306718213902.jpg'} alt="true" />}</span>
        ),
      },
      {
        name: "Action",
        selector: "action",
        sortable: false,
        cell: (row) => (
          // <Row>
          //   <Button
          //     className=""
          //     color="success"
          //     onClick={() => {
          //       this.EditBtnClick(row)
          //     }}
          //   >
          //     <i className="fas fa-pencil-alt " />
          //   </Button>

          //   <Button
          //     className="ml-2"
          //     color="danger"
          //     onClick={() => this.toggleDeleteModal(row)}
          //   >
          //     <i className="fas fa-trash-alt " />
          //   </Button>
          // </Row>
          <Row>
            <ButtonGroup className="mb-2" style={{ top: "4px" }}>
              <Button
                outline
                color="success"
                className="mobileViewFont ml-2"
                onClick={() => {
                  this.EditBtnClick(row);
                }}
              >
                View
              </Button>
            </ButtonGroup>
          </Row>
        ),
      },
    ],
  };
  EditBtnClick = (row) => {
    this.setState({
      editData: row,
    });

    this.toggleManageEditModal();
  };
  toggleManageEditModal = () => {
    this.setState({
      managEditModal: !this.state.managEditModal,
    });
    this.dataFilter()
  };
  componentDidMount = () => {
    this.dataFilter();
    this.states()
  };
 statusoption = [
  {label:'True',id:true},
  {label:'False',id:false}
 ]
 states=()=>{
   this.setState({
     stateList:states.states.map((a)=> {
          return { value: parseInt(a.id), label: a.name }
        })
   })
 }
 dataFilter = async() =>{
   const city = states.states.filter((state) => state.name === this.state.state)
   this.setState({
     cityList:city[0]?.cities?.map((a)=> {
           return { value: parseInt(a.id), label: a.name }}),
     isLoading:true,
   })
      //  console.log(this.state.filterstate,this.state.filtercity,this.state.grade)
      await axios.get(`http://localhost:3050/user?page=${this.state.page}&per_page=${this.state.per_page}`).then((res) => {
         var arr = res.data.data;
         this.setState({
          totalCount:res.data['count']
        })
         arr =  this.state.filterstate === true ?  arr.filter(r=>r.region === this.state.state) : arr
         arr = this.state.filtercity === true  ?  arr.filter(r=>r.city === this.state.city) :arr
         arr = this.state.filtergrade === true  ?  arr.filter(r=>r.grade === this.state.grade) :arr
         arr = this.state.filterstatus === true  ?  arr.filter(r=>r.status === this.state.statusfilter) :arr
         arr = this.state.filtermark1 === true ? arr.filter(r=>r.mark1 === this.state.mark1) : arr
         arr = this.state.filtermark2 === true ? arr.filter(r=>r.mark2 === this.state.mark2) : arr
        //  console.log(arr)
        //  console.log(states)
         this.setState({
           data: arr,
           isLoading: false,
         });

    });
 }
 handlePerRowsChange =(perPage)=>{
  this.setState({
   per_page: perPage,
    },()=>{
      this.dataFilter()
    })
}
handlePageChange = (page)=>{
  this.setState({page:page},()=>{
   this.dataFilter()
 })
}
  render() {
    // const history = useHistory();

    const initialValues = this.state.editData;
    const validate = Yup.object({
      mark1: Yup.string()
        .required("Required"),
      mark2: Yup.string()
        .required("Required"),
      signedby:Yup.string()
      .required("Required"),
    });
    return (
      <div>
      <Modal size="lg" isOpen={this.state.managEditModal} toggle={this.toggleManageEditModal}>
        <ModalHeader toggle={this.toggleManageEditModal}>
          <div className="modal-title">
          <h1>{this.state.editData.studentname}</h1>
          <span>{this.state.editData.status ===false ? <img src={'https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color-round/3/44-512.png'} style={{height:'12px', width:'12px'}} alt="false" />:<img style={{height:'12px', width:'12px'}} src={'https://icon2.cleanpng.com/20180703/esh/kisspng-insurance-information-business-service-synology-in-5b3c32cd5f44c3.1515026615306718213902.jpg'} alt="true" />}</span>
          <small style={{marginTop:"20px"}}>{this.state.editData.city},{this.state.editData.region}</small>
          </div>
          </ModalHeader>         
              <ModalBody>
              <AdminUserCard values = {this.state.editData} />
              </ModalBody>

              <ModalFooter> 
                
              </ModalFooter>

      </Modal>
      <h1 className="d-flex align-items-center justify-content-center mt-4 mb-4">RCME ADMIN</h1>
      <Card>
        <CardBody>
        <Row style={{margin:0}}>
        <Col md={2} sm={6}>
        <DropDown
                                              label="State"
                                              className="react-select"
                                              classNamePrefix="react-select"
                                              isSearchable
                                              isClearable={true}
                                              options={this.state.stateList}
                                              Action={entity => {
                                                if(entity){
                                                this.setState({
                                                  state:entity ? entity.label : "",
                                                  filterstate:true
                                                },
                                                  ()=>{
                                                    this.dataFilter()
                                                  })
                                                }else{
                                                 this.setState({
                                                  state:'',
                                                  cityList:[],
                                                  filterstate:false
                                                },
                                                  ()=>{
                                                    this.dataFilter()
                                                  })
                                                }
                                              }}
                                            />
        </Col>
        <Col md={2} sm={6}>
        <DropDown
                                              label="City"
                                              className="react-select"
                                              classNamePrefix="react-select"
                                              isSearchable
                                              isClearable={true}
                                              options={this.state.cityList}
                                              Action={entity => {
                                                if(entity){
                                                this.setState({
                                                  city:entity ? entity.label : "",
                                                  filtercity:true
                                                },
                                                  ()=>{
                                                    this.dataFilter()
                                                  })
                                                }else{
                                                 this.setState({
                                                  cityList:[],
                                                  filtercity:false
                                                },
                                                  ()=>{
                                                    this.dataFilter()
                                                  })
                                                }
                                              }}
                                            />
        </Col>
        <Col md={2} sm={6}>
        <DropDown
                                              label="Grade"
                                              className="react-select"
                                              classNamePrefix="react-select"
                                              isSearchable
                                              isClearable={true}
                                              options={this.state.gradeOptions}
                                              Action={entity => {
                                                if(entity){
                                                this.setState({
                                                  grade:entity ? entity.label : "",
                                                  filtergrade:true
                                                },
                                                  ()=>{
                                                    this.dataFilter()
                                                  })
                                                }else{
                                                 this.setState({
                                                  filtergrade:false
                                                },
                                                  ()=>{
                                                    this.dataFilter()
                                                  })
                                                }
                                              }}
                                            />
        </Col>
        <Col md={2} sm={6}>
        <DropDown
                                              label="Status"
                                              className="react-select"
                                              classNamePrefix="react-select"
                                              isSearchable
                                              isClearable={true}
                                              options={this.statusoption}
                                              Action={entity => {
                                                if(entity){
                                                this.setState({
                                                  statusfilter:entity ? entity.id : null,
                                                  filterstatus:true
                                                },
                                                  ()=>{
                                                    this.dataFilter()
                                                  })
                                                }else{
                                                 this.setState({
                                                   statusfilter:null, 
                                                   filterstatus:false,
                                                },
                                                  ()=>{
                                                    this.dataFilter()
                                                  })
                                                }
                                              }}
                                            />
        </Col>
        <Col md={2} sm={6}>
        <DropDown
                                              label="Mark1"
                                              className="react-select"
                                              classNamePrefix="react-select"
                                              isSearchable
                                              isClearable={true}
                                              options={this.state.markOptions}
                                              Action={entity => {
                                                if(entity){
                                                this.setState({
                                                  mark1:entity ? entity.id : null,
                                                  filtermark1:true
                                                },
                                                  ()=>{
                                                    this.dataFilter()
                                                  })
                                                }else{
                                                 this.setState({
                                                   mark1:null, 
                                                   filtermark1:false,
                                                },
                                                  ()=>{
                                                    this.dataFilter()
                                                  })
                                                }
                                              }}
                                            />
        </Col>
        <Col md={2} sm={6}>
        <DropDown
                                              label="Mark2"
                                              className="react-select"
                                              classNamePrefix="react-select"
                                              isSearchable
                                              isClearable={true}
                                              options={this.state.markOptions}
                                              Action={entity => {
                                                if(entity){
                                                this.setState({
                                                  mark2:entity ? entity.id : null,
                                                  filtermark2:true
                                                },
                                                  ()=>{
                                                    this.dataFilter()
                                                  })
                                                }else{
                                                 this.setState({
                                                   filtermark2:false,
                                                   mark2:null,
                                                },
                                                  ()=>{
                                                    this.dataFilter()
                                                  })
                                                }
                                              }}
                                            />
        </Col>
        </Row>
        </CardBody>
        </Card>
        <Card>
        <CardBody>
        <ListPage
          columns={this.state.column}
          data={this.state.data}
          totalCount={this.state.totalCount}
          // rowClicked={this.EditBtnClick}
            rowsPerPageOnChange={this.handlePerRowsChange}
            pageChange={this.handlePageChange}
          isDataLoading={this.state.isLoading}
          overFlowXRemoval={true}
        ></ListPage>
        </CardBody>
        </Card>
      </div>
    );
  }
}

export default AdminRcme;
