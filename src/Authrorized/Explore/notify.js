import React ,{useEffect,useState}from "react";
import './notify.css';
import { useCart } from "../../cartext";
import Card from 'react-bootstrap/Card';

export default function Notify (){

    const [notify, setNotify] = useState([]);
    const { userName = { name: "" } } = useCart();


    useEffect(() => {
        const fetchData = async (email) => {
          try {
            const response = await fetch("https://finalback-q2te.onrender.com/users/notify", {
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
    setNotify(userData.notifications || []);
            
    
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          }
        };
    
        // Replace 'user@example.com' with the actual email you want to search for
        const emailToSearch = userName.name;
        fetchData(emailToSearch);
    // Disabling the eslint warning for missing dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
      useEffect(() => {
        console.log("notification :", notify);
      }, [notify]);
    




    return (

        <div className="NNa"> 
            <div>
                <img className="NNi" src="https://img.freepik.com/free-photo/digital-painting-mountain-with-colorful-tree-foreground_1340-25699.jpg?t=st=1699979064~exp=1699982664~hmac=6c88cdc0952a4708df001d3fada4e696ceae00624b644c57cf98b465d43e017b&w=996" alt="img"/>
            </div>
            
            <div className="NNc"> 
            
            {notify.map((notification, index) => (
      <Card key={index} border="success" className="NNNc">
        <Card.Header><h1> Notification</h1></Card.Header>
        <Card.Body>
          <Card.Title><h5>{notification.type} Request </h5> </Card.Title>
          <Card.Text>
           <h7>{notification.message} </h7> 
            <br />
            {/* Additional information */}
            <small>Timing: {notification.createdAt}</small>
          </Card.Text>
        </Card.Body>
      </Card>
    ))}
      
            </div>
            
        </div>
    )
}