import React, {useState,useEffect} from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios'
import Router from 'next/router';
import { db } from "../../firebase-config";
import {collection,getDocs,addDoc,serverTimestamp,Timestamp} from "firebase/firestore"
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
  } from "reactstrap";
  // layout for this page
  import Admin from "layouts/Admin.js";
  // core components
  import UserHeader from "components/Headers/UserHeader.js";

const SendNotification = (props) => {
    const [newtitle,setTitle] = useState("")
    const [newdescription,setDescription] = useState("")
    const [newurl,setUrl] = useState("")
    const [coins,setCoins] = useState(0)
    const [userTokens,setUserTokens] = useState([])
    const userCollectionRef = collection(db,"users")
    const notificationCollectionRef = collection(db,"notifications")

    useEffect(() => {
        const userLogged = localStorage.getItem("userLogin")
        if(userLogged){
            
        }else{
            Router.push("/")
        }
    },[])

    const onSubmit = async (e) =>{
        e.preventDefault();
        // const timestamp = Timestamp.fromDate(new Date());
        const timestamp = Timestamp.fromDate(new Date());
        // console.log(""+timestamp+"")
        // return;
        const data = await getDocs(userCollectionRef)
        
        console.log(data)
        const userDeviceTokens =await data.docs.map((doc) =>({...doc.data()}))
        console.log(userDeviceTokens)
        
        const deviceTokens = userDeviceTokens.map((val) => {
          return val.token
        })
        setUserTokens(deviceTokens)
        console.log(deviceTokens)
        let datasend
        if (newtitle && newdescription && newurl && coins) {
          datasend = {tokens:deviceTokens,
            title:newtitle,
            body:newdescription,
            url:newurl,
            coins:coins}  
            await axios.post("https://digitvl-notifier-nodejs-git-main-muiezarif.vercel.app/send-notification",datasend,{headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Credentials': 'true'
        }}).then(async (res)=>{
                alert("Notification sent")
                const refDoc =await addDoc(notificationCollectionRef,{message:newdescription || null,title:newtitle || null,url:newurl || null,timestamp:timestamp}).then((res) =>{
                    console.log("res")
                    console.log(res)
                    setTitle("")
                    setDescription("")
                    setUrl("")
                    setCoins(0)
                }).catch(err => console.log(err))
          //     firestore().collection("notifications").add({
          //     title:title.target.value,
          //     message:description.target.value,
          //     url:url.target.value
          // })
              console.log(res)
            }).catch(async err => {
              if(err.code === "ERR_NETWORK"){
                const refDoc = await addDoc(notificationCollectionRef,{message:newdescription || null,title:newtitle || null,url:newurl || null,timestamp:timestamp}).then((res) =>{
                  console.log("res")
                  setTitle("")
                  setDescription("")
                  setUrl("")
                  setCoins(0)
                  
    
              }).catch(err => console.log(err))
              console.log(refDoc.id)
              }
              console.log(err)
            })
        }else{
          alert("Fill All fields")
          return;
        }
        
        
      }
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="0">
            {/* <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    Jessica Jones
                    <span className="font-weight-light">, 27</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <p>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card> */}
          </Col>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add Notification Data</h3>
                  </Col>
                  {/* <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Send Notification
                    </Button>
                  </Col> */}
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={onSubmit}>
                  <h6 className="heading-small text-muted mb-4">
                    Notification information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Title
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            type="text"
                            value={newtitle}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Description
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Description"
                            type="text"
                            value={newdescription}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            URL
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={newurl}
                            id="input-first-name"
                            placeholder="URL (https://....)"
                            type="text"
                            onChange={(e) => setUrl(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Coins
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={coins}
                            id="input-last-name"
                            placeholder="Coins"
                            type="number"
                            onChange={(e) => setCoins(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <Col>
                        <Button
                            color="primary"
                            type="submit"
                            >
                            Send Notification
                        </Button>
                        </Col>
                    </Row>
                  </div>
                  {/* <hr className="my-4" /> */}
                  {/* Address */}
                  {/* <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6> */}
                  {/* <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            id="input-address"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="New York"
                            id="input-city"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="United States"
                            id="input-country"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div> */}
                  {/* <hr className="my-4" /> */}
                  {/* Description */}
                  {/* <h6 className="heading-small text-muted mb-4">About me</h6> */}
                  {/* <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                          Open Source."
                        type="textarea"
                      />
                    </FormGroup>
                  </div> */}
                    
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

SendNotification.layout = Admin;

export default SendNotification;
