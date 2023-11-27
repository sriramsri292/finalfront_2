import React, {  useState ,useEffect} from "react";
import { useCart } from "../cartext";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Card from 'react-bootstrap/Card';
import './message.css';
import Button from 'react-bootstrap/Button';


export default function Message() {
 
  const [message, setMessage] = useState({
    text: '',
  });

  const { userName = { email: '' } } = useCart();
  const emailToSearch = userName.name;
  console.log(emailToSearch);
  const { chat = { email: '', userName: '' } } = useCart();
 
    console.log("the caert ",chat.email);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://finalback-q2te.onrender.com/users/users");
        const data = await response.json();
  
        if (response.ok) {
          setUsers(data.data);
          console.log(data.data); // Log the data here after setting the state
        } else {
          console.error("Error fetching users:", data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchData();
    
  },[]);
  
 

  const handleInputChange = (e) => {
    setMessage({ ...message, text: e.target.value });
  };
  const data = {
    senderEmail: chat.email,
    receiverUsername: chat.userName,
    text: message.text,
  };
  
  const handleSendClick = async () => {
    try {
      const response = await fetch("https://finalback-q2te.onrender.com/users/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Message sent successfully:", responseData);
        alert("Message sent successfully");

        // Optionally, you can update the UI or perform other actions on successful send
      } else {
        console.error("Error sending message:", responseData.message);

        // Display an alert with the error message
        alert("Error: " + responseData.message);
        // Optionally, you can handle errors or show a notification to the user
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  

  const foundReciever = users.find(users => users.userName === chat.userName);

  async function getChatIds() 
  {

    const foundSender = await findUserByEmail(chat.email);
  
    if (foundSender) {
      const chatIds = foundSender.messages.map((message) => message.chatId);
      console.log("ChatIds:", chatIds);
  
      if (chatIds.length > 0) {
        console.log("Sending request with ChatIds:", chatIds);
        // Send chatIds to the backend
        sendChatIdsToBackend(chatIds);
      } else {
        console.log('No chatIds found for the user.');
      }
    } else {
      console.log('User not found');
    }
  }
  const [conversations, setConversations] = useState([]);
  
  async function sendChatIdsToBackend(chatIds) {
    try {
      console.log('Sending request with ChatIds:', chatIds);
      console.log('Attempting to send request with ChatIds:', chatIds);
      const response = await fetch('https://finalback-q2te.onrender.com/users/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatIds }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('ChatIds sent successfully:', data);
        setConversations(data);
        // Handle the response or perform other actions if needed
      } else {
        console.error('Error sending chatIds:', data.message);
        // Handle errors or show a notification to the user
      }
    } catch (error) {
      console.error('Error sending chatIds:', error);
    }
  }
  


  async function findUserByEmail(email) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = users.find((user) => user.email === email);
        resolve(foundUser);
      }, 1000);
    });
  }
  
  
  useEffect(() => {
    getChatIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

 
  const [selectedUserName, setSelectedUserName] = useState(null);
  const handleUserCardClick = (userName) => {
     setShowSelectedUsername(!showSelectedUsername);
   
    setSelectedUserName(userName);
  };
  
  console.log("the selected username is ",selectedUserName);
  
  console.log("the found uder is ",foundReciever);
 
 
  useEffect(() => {
    console.log("the conv is ", conversations);
    
  }, [conversations]);

  useEffect(() => {
    start();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserName, conversations]);

  const [conversationData, setConversationData] = useState({
    senderId: null,
    receiverId: null,
    messages: [],
  });

  const start = async () => {
    if (!selectedUserName || !Array.isArray(conversations.conversations)) {
      return; // Do nothing if no user is selected or conversations is not an array
    }
  
    // Find the conversation where the selectedUserName is the receiver
    const selectedConversation = conversations.conversations.find(
      (conversation) =>
        conversation.receiver && conversation.receiver.userName === selectedUserName
    );
  
    // Check if the selectedUserName is found
    if (selectedConversation) {
      // Extract sender and receiver usernames
      const senderUsername = selectedConversation.sender?.userName;
      const receiverUsername = selectedConversation.receiver?.userName;
  
      // Extract sender and receiver ids
      const senderId = selectedConversation.sender?._id;
      const receiverId = selectedConversation.receiver?._id;
      const senderProfileImage = selectedConversation.sender?.profileImage;
      const receiverProfileImage = selectedConversation.receiver?.profileImage;
  
      // Extract messages with their IDs, texts, sender username, and receiver username
      const messages = selectedConversation.messages?.map((message) => ({
        id: message.sender, // If message._id is correct, keep it as is; otherwise, update to the correct property
        text: message.text,
        senderUsername,
        receiverUsername,
      })) || [];
  
      console.log("Sender Username:", senderUsername);
      console.log("Receiver Username:", receiverUsername);
      console.log("Selected conversation messages:", messages);
      console.log("Selected conversation:", selectedConversation);
  
      // Update the state with the extracted data
      setConversationData({
        senderId,
        receiverId,
        senderProfileImage,
        receiverProfileImage,
        messages,
      });
    } else {
      // Clear the conversationData if the selected user has no conversation
      setConversationData({
        senderId: null,
        receiverId: null,
        messages: [],
      });
    }
  };
  
  
  
  
  


  useEffect (()=>
  {
    console.log("the exracted ", conversationData);
  },[conversationData])
  
  const [showSelectedUsername, setShowSelectedUsername] = useState(false);

 
const getUserImage = () => {
  if (showSelectedUsername) {
    switch (selectedUserName) {
      case "Naveen":
        return "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      case "SriDhar":
        return "https://images.unsplash.com/photo-1579783483458-83d02161294e?q=80&w=1997&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      case "Sriram":
        return "https://images.unsplash.com/photo-1522196772883-393d879eb14d?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      default:
        return "https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.webp?s=612x612&w=is&k=20&c=trmgBj1lQm43NNkvn97YFaVMU1XnGgOYcT_GcR1x3qE=";
    }
  } else {
    return "https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.webp?s=612x612&w=is&k=20&c=trmgBj1lQm43NNkvn97YFaVMU1XnGgOYcT_GcR1x3qE=";
  }
};

const Image = (userName) => {
  switch (userName) {
    case "Naveen":
      return "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    case "SriDhar":
      return "https://images.unsplash.com/photo-1579783483458-83d02161294e?q=80&w=1997&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    case "Sriram":
      return "https://images.unsplash.com/photo-1522196772883-393d879eb14d?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    default:
      return "https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.webp?s=612x612&w=is&k=20&c=trmgBj1lQm43NNkvn97YFaVMU1XnGgOYcT_GcR1x3qE=";
  }
};

const [uniqueConversations, setUniqueConversations] = useState([]);


useEffect(() => {
  if (conversations.conversations) {
    const uniqueUsernames = new Set();

    const newUniqueConversations = conversations.conversations.filter((conversation) => {
      const userName = conversation.receiver.userName;
      if (!uniqueUsernames.has(userName)) {
        uniqueUsernames.add(userName);
        return true;
      }
      return false;
    });

    // Set the state after filtering
    setUniqueConversations(newUniqueConversations);
  }
}, [conversations.conversations]);

console.log("the list is ", uniqueConversations);

  return (
    <div className="MMA">

    <main className="content">
      <div className="container p-0">
       
        <div className="card">
          <div className="row g-0">
            <div className="col-12 col-lg-5 col-xl-3 border-right">
              <div className="px-4 d-none d-md-block">
                <div className="d-flex flex-column align-items-start">
                {Array.isArray(uniqueConversations) && uniqueConversations.map((conversation, index) => (
    <div className="card-container" key={index}>
        <Card border="warning" style={{ width: '18rem' }}>
            <Card.Header>
                <img
                    src={Image(conversation.receiver.userName)}
                    alt={conversation.receiver.userName}
                    className="rounded-circle mr-1"
                    width="30"
                    height="30"
                    onError={(e) => console.log("Image error:", e)}
                />
               <strong style={{fontFamily:'italic',fontWeight: 'bold', fontSize: '20px', color: '#333'}}> {conversation.receiver.userName}</strong> 
            </Card.Header>
            <Card.Body>
                <Card.Text style={{fontWeight: 'bold', fontSize: '20px', color: '#333'}}>
                    {conversation.messages.length > 0
                        ? conversation.messages[conversation.messages.length - 1].text
                        : 'No messages'}
                </Card.Text>
            </Card.Body>
            <Button variant="warning" onClick={() => handleUserCardClick(conversation.receiver.userName)}>
                Chat
            </Button>
        </Card>
    </div>
))}

                
                
        
        
     
                </div>
                <div className="user-list">
             
                </div>
              </div>
              <hr className="d-block d-lg-none mt-1 mb-0" />
            </div>
            <div className="col-12 col-lg-7 col-xl-9">
              <div className="py-2 px-4 border-bottom d-none d-lg-block">
                <div className="d-flex align-items-center py-1">
                  <div className="position-relative">
                  
                  <img
  src={getUserImage()}
  alt={showSelectedUsername ? selectedUserName : foundReciever?.userName || "Default User"}
  className="rounded-circle mr-1"
  width="60"
  height="60"
  onError={(e) => console.log("Image error:", e)}
/>






                  </div>
                  <div className="flex-grow-1 pl-3">
                    <strong style={{fontFamily:'italic',fontWeight: 'bold', fontSize: '26px', color: '#333'}}>{showSelectedUsername ? selectedUserName : foundReciever?.userName}</strong>
                  </div>
                </div>
              </div>
              <div className="position-relative">
                <div className="chat-messages p-4">
                <Row>
  <Col>
    <img
      src={getUserImage()}
      alt={showSelectedUsername ? selectedUserName : foundReciever?.userName || "Default User"}
      className="rounded-circle mr-1"
      width="30"
      height="30"
      onError={(e) => console.log("Image error:", e)}
    />
    
    {conversationData.messages.map((message, index) => (
      <div className="HH1" key={index} style={{ marginBottom: '5px' }} >
        {index === 0 && (
          <h5 style={{fontWeight: 'bold', fontSize: '20px', color: '#333'}}>{message.text}</h5>
        )}
      </div>
    ))}
  </Col>
  <Col className="CC1">
  {conversationData.messages.map((message, index) => (
      <div key={index} style={{ marginBottom: '10px' }}>
        {index !== 0 && (
       <h5 style={{ marginTop: '5px', fontWeight: 'bold', fontSize: '20px', color: '#333' }}>{message.text}</h5>

        )}
      </div>
    ))}
  </Col>
</Row>


                </div>
              </div>
              <div className="flex-grow-0 py-3 px-4 border-top">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message"
                    value={message.text}
                    onChange={handleInputChange}
                  />
                  <button className="btn btn-primary" onClick={handleSendClick}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div> 
  
  );
  
}

