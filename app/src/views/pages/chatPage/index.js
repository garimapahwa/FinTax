import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import * as XLSX from 'xlsx';

const API_KEY =  process.env.REACT_APP_API_KEY

function ChatPage() {
  const [textContent, setTextContent] = useState('');
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const systemMessage = { 
    "role": "system", "content": "Explain things like you're talking to a newbie like you are a expert in taxing system of blockchainn. You are given the balance sheet of this newbie and you have to analyse the balance sheet of tax report and give a review and suggestion and changes that can be made to get better results"
  }

  const balanceSheetImport= {
    "role": "system", "content": `${textContent}`
  }

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { 

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });


    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage, balanceSheetImport, 
        ...apiMessages 
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
    });
  }


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const convertedText = XLSX.utils.sheet_to_csv(sheet);

      setTextContent(convertedText);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="App" style={{display: "flex", gap: "4rem"}}>
      {/* <input type="file"
       onChange={handleFileUpload} className='inputfield'
       /> */}
       <div
                  style={{
                    border: "2px",
                    borderStyle: "solid",
                    padding: "1rem 1rem",
                    borderRadius: "15px",
                    backgroundColor: "#c7e3fa",
                    width: "15rem",
                    height: "4rem"
                  }}
                >
                  <label style={{ cursor: "pointer" }}>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      style={{  cursor: "pointer" }}
                    />
                    <div style={{ display: "flex" }}>
                      {/* <FileUploadIcon
                        color="white"
                        size={25}
                        className="mr-3"
                      /> */}
                      Upload Your File
                    </div>
                  </label>
                </div>


      <div style={{ position:"relative", height: "550px", width: "1150px"  }}>
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>

      
    </div>
  )
}

export default ChatPage
