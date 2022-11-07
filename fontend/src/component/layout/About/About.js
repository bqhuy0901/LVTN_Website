import React from 'react'
import "./About.css"
import { Button, Typography, Avatar } from "@material-ui/core";
const About = () => {
    const visitFacebook = () => {
        window.location = "https://www.facebook.com/bqhuy0901";
      };
      const visitFacebook2 = () => {
        window.location = "https://www.facebook.com/mexxiah09/";
      };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src={require("../../assets/images/118209539_1530840250453665_3869168428072234493_n.jpg")}
                            alt="Founder"
                        />
                        
                        <Typography>Bùi Quốc Huy</Typography>
                        <Button onClick={visitFacebook} color="primary">
                            Visit FaceBook
                        </Button>
                        <span>
                            MSSV:DH51801606 <br/>
                            Lớp:D18_TH02 
                        </span>
                    </div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src={require("../../assets/images/311151038_902238944072818_7149929739702517786_n.jpg")}
                            alt="Founder"
                        />
                        
                        <Typography>Mai Chí Khôi</Typography>
                        <Button onClick={visitFacebook2} color="primary">
                            Visit FaceBook
                        </Button>
                        <span>
                        <span>
                            MSSV:DH51800013 <br/>
                            Lớp:D18_TH02 
                        </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About