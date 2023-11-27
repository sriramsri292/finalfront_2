import React, { useState, useEffect } from "react";
import {Link } from 'react-router-dom';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./homeUser.css";
import { useCart } from "../cartext";

export default function HomeUser() {
  const { userName = { name: "" } } = useCart();

  
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://finalback-q2te.onrender.com/users"); // Replace with your actual API endpoint
        const data = await response.json();

        if (response.ok) {
          setUsers(data.data);
        } else {
          console.error("Error fetching users:", data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      console.log(users);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const [name, setName] = useState({
    email: userName.name,
    userName: "",
  });

  console.log("from sender ", name.email);

  async function handleFollow(userName, index) {
    setName((prevName) => ({
      ...prevName,
      userName,
    }));

    const data = {
      email: name.email,
      userName: userName,
    };

    console.log("data to be sent ", data);

    try {
      const response = await fetch("https://finalback-q2te.onrender.com/auth/followreq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result.message);
      if (result.success) {
        // Update the follow status for the specific user
        setUsers((prevUsers) => {
          const updatedUsers = [...prevUsers];
          updatedUsers[index].isFollowing = true;
          return updatedUsers;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("from the receiver", name.userName);
  }, [name.userName]);



  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchData = async (email) => {
      try {
        const response = await fetch("https://finalback-q2te.onrender.com/users/follow", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const userData = await response.json();
setFollowing(userData.following || []);
        

      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    // Replace 'user@example.com' with the actual email you want to search for
    const emailToSearch = userName.name;
    fetchData(emailToSearch);
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("Following state:", following);
  }, [following]);
  const emailToSearch = userName.name;
  const { chat = { email: '', userName: '' }, setChat } = useCart();
  

  async function handlechat(userName, index) {
    setChat((prevChat) => ({
      ...prevChat,
      email: emailToSearch,
      userName: userName,
    }));
   
    
  }

console.log(chat);

const Image = (userName) => {
  switch (userName) {
    case "Naveen":
      return "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    case "SriDhar":
      return "https://media.istockphoto.com/id/512923237/photo/cameraman-on-set.jpg?s=612x612&w=is&k=20&c=V--Ow9sIcFXIq0B2RFNoTRgv5lCDqkhKs33_CxeAWYE=";
    case "Sriram":
      return "https://images.unsplash.com/photo-1522196772883-393d879eb14d?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    case "Srikutty":
      return "https://w0.peakpx.com/wallpaper/698/150/HD-wallpaper-borderlands-3-director-cut.jpg";
    case "sriram":
      return "https://w0.peakpx.com/wallpaper/739/122/HD-wallpaper-alfred-hitchcock-british-film-directors-hitchcock-movies-film-directors.jpg";
    default:
      return "https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.webp?s=612x612&w=is&k=20&c=trmgBj1lQm43NNkvn97YFaVMU1XnGgOYcT_GcR1x3qE=";
  }
};








  return (
    <div className="Haa-container">
      {users.map((d, i) => (
        <div key={d._id} className="vh-10">
          <MDBContainer>
            <MDBRow className="justify-content-center">
              <MDBCol md="10" lg="8" xl="13" className="mt-5">
                <MDBCard style={{ borderRadius: "15px" }}>
                  <MDBCardBody className="p-4">
                    <div className="d-flex text-black">
                      <div className="flex-shrink-0">
                      <MDBCardImage
      style={{ width: "180px", borderRadius: "10px" }}
      src={Image(d.userName)}
      alt={d.userName}
      fluid
    />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <MDBCardTitle>{d.userName}</MDBCardTitle>
                        <MDBCardText>{d.passion}</MDBCardText>

                        <div className="d-flex justify-content-start rounded-3 p-2 mb-2" style={{ backgroundColor: "#efefef" }}>
                          <div>
                            <p className="small text-muted mb-1">Post</p>
                            <p className="mb-0">41</p>
                          </div>
                          <div className="px-3">
                            <p className="small text-muted mb-1">Followers</p>
                            <p className="mb-0">976</p>
                          </div>
                        </div>
                        <div className="d-flex pt-1">
                          <Link to="/message"> 
                          <MDBBtn outline className="me-1 flex-grow-1" onClick={() => handlechat(d.userName, i)}>
                            Chat
                          </MDBBtn>
                          </Link>
                          <MDBBtn className="flex-grow-1" onClick={() => handleFollow(d.userName, i)}>
                          {Array.isArray(following) && following.includes(String(d._id)) ? "Following" : "Follow"}

</MDBBtn>
                        </div>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      ))}
    </div>
  );
}
