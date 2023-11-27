import React from "react";
import {Routes,Route } from 'react-router-dom';
import Login from "./Authentication/login";
import Forgot from "./Authentication/forgot";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Account from "./Authentication/account";
import Home from "./Authrorized/home";
import Explore from "./Authrorized/Explore/explore";
import News from "./Authrorized/Explore/News/news";
import Business from "./Authrorized/Explore/News/business";
import Sports from "./Authrorized/Explore/News/sports";
import Entertainment from "./Authrorized/Explore/News/entertainment";
import Health from "./Authrorized/Explore/News/health";
import Rain from "./Authrorized/Explore/rain";
import Astro from "./Authrorized/Explore/astro";
import Profile from "./Authrorized/Explore/profile/profile";
import Editprofile from "./Authrorized/Explore/profile/editprofile";
import Upload from "./Authrorized/Explore/profile/upload ";
import HomeUser from "./Authrorized/homeUser";
import Notify from "./Authrorized/Explore/notify";
import Message from "./Authrorized/message";
import Search from "./Authrorized/search";

function App() {
  return (
    <div >

<div className="a" > 


<Container >
<Row >
<Col>
<div className="a1">
<h3>
<span className="aa">Magic</span>Network
</h3>
</div>

</Col>

</Row>

</Container>

</div>
       <Routes>
        <Route path="/" element={<Login />} />
        <Route  path="/forgot"  element={<Forgot/>} /> 
        <Route  path="/account"  element={< Account/>}  />
        <Route  path="/home"  element={< Home/>}  />
        <Route  path="/explore/*" element={<Explore/>}  /> 
        <Route path="/news" element={<News />} />
        <Route path="/business" element={<Business/>}/>
        <Route path="/sports" element={<Sports/>}/>
        <Route path="/entertainment" element={<Entertainment/>}/>
        <Route path="/health" element={<Health/>}/>
        <Route path="/rain" element={<Rain/>}/>
        <Route path="/astro" element={<Astro/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/editprofile" element={<Editprofile/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/homeUser" element={<HomeUser/>}/>
        <Route path="/notify" element={<Notify/>}/>
        <Route path="/message" element={<Message/>}/>
        <Route path="/search" element={<Search/>}/>
        
        
      </Routes>
   
    </div>
  );
}

export default App;
