import React, { useEffect, useState } from 'react';
import Head from 'next/head';



const Gurudev = () => {
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'rchat', text: 'Hii dear, you can ask me any question !' },
  ]);
  const settimeout: null = null;
  const setnewtimeout:  null = null;
  const appendTypingAnimation = () => {
    // Clear existing "Typing..." messages
    setMessages((prevMessages) => prevMessages.filter(msg => msg.text !== 'Typing...'));

    // Add new "Typing..." message
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'rchat', text: 'Typing...' },
    ]);
  };
  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      setIsSending(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'schat', text: inputValue },
      ]);
      setInputValue('');
      // Simulate typing animation
      appendTypingAnimation();

      try {
        const response = await fetch(
          `https://WellinformedHeavyBootstrapping.yasirmecom.repl.co/ask?question=users,${encodeURIComponent(
            inputValue
          )}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        let responseData: any;

        // Check if the response has the 'content-type' header and it's JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          responseData = await response.json();
        } else {
          // If not JSON, handle plain text or other formats
          responseData = { answer: await response.text() };
        }

        console.log('API Response Data:', responseData);
        if (setnewtimeout) {
          clearTimeout(setnewtimeout);
        }

        // Remove typing animation and display AI response
        setMessages((prevMessages) => [
          ...prevMessages.filter(msg => msg.text !== 'Typing...'), // Remove all "Typing..." messages
          { type: 'rchat', text: responseData.answer },
        ]);

        setIsSending(false);
      } catch (error) {
        console.error('Error during API call:', error);

        // Display an error message
        setMessages((prevMessages) => [
          ...prevMessages.filter(msg => msg.text !== 'Typing...'), // Remove all "Typing..." messages
          { type: 'rchat', text: 'An error occurred during the API call.' },
        ]);

        setIsSending(false);
      }
    }

    setInputValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };







  useEffect(() => {
    if (messages) {
      if (settimeout) {
        clearTimeout(settimeout);
      }
      if (setnewtimeout) {
        clearTimeout(setnewtimeout);
      }
    }
  }, [settimeout, setnewtimeout, messages]);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap"
          rel="stylesheet"
        />
        {/* <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script> */}
      </Head>
   
      <main>
        <div className="topper">
          {/* <div className="icon"></div> */}
          <span  className='dazzle'><img src="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" alt="" />Dazzlone <div className='gurudevtick'>  <svg
      version="1.1"
      width="20"
      height="20"
      viewBox="0 0 256 256"
      xmlSpace="preserve"
      dangerouslySetInnerHTML={{
        __html: `
          <defs></defs>
          <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
            <path d="M 49.66 1.125 L 49.66 1.125 c 4.67 -2.393 10.394 -0.859 13.243 3.548 l 0 0 c 1.784 2.761 4.788 4.495 8.071 4.66 l 0 0 c 5.241 0.263 9.431 4.453 9.694 9.694 v 0 c 0.165 3.283 1.899 6.286 4.66 8.071 l 0 0 c 4.407 2.848 5.941 8.572 3.548 13.242 l 0 0 c -1.499 2.926 -1.499 6.394 0 9.319 l 0 0 c 2.393 4.67 0.859 10.394 -3.548 13.242 l 0 0 c -2.761 1.784 -4.495 4.788 -4.66 8.071 v 0 c -0.263 5.241 -4.453 9.431 -9.694 9.694 h 0 c -3.283 0.165 -6.286 1.899 -8.071 4.66 l 0 0 c -2.848 4.407 -8.572 5.941 -13.242 3.548 l 0 0 c -2.926 -1.499 -6.394 -1.499 -9.319 0 l 0 0 c -4.67 2.393 -10.394 0.859 -13.242 -3.548 l 0 0 c -1.784 -2.761 -4.788 -4.495 -8.071 -4.66 h 0 c -5.241 -0.263 -9.431 -4.453 -9.694 -9.694 l 0 0 c -0.165 -3.283 -1.899 -6.286 -4.66 -8.071 l 0 0 C 0.266 60.054 -1.267 54.33 1.125 49.66 l 0 0 c 1.499 -2.926 1.499 -6.394 0 -9.319 l 0 0 c -2.393 -4.67 -0.859 -10.394 3.548 -13.242 l 0 0 c 2.761 -1.784 4.495 -4.788 4.66 -8.071 l 0 0 c 0.263 -5.241 4.453 -9.431 9.694 -9.694 l 0 0 c 3.283 -0.165 6.286 -1.899 8.071 -4.66 l 0 0 c 2.848 -4.407 8.572 -5.941 13.242 -3.548 l 0 0 C 43.266 2.624 46.734 2.624 49.66 1.125 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,131,249); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
            <polygon points="36.94,66.3 36.94,66.3 36.94,46.9 36.94,46.9 62.8,35.34 72.5,45.04 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,119,227); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
            <polygon points="36.94,66.3 17.5,46.87 27.2,37.16 36.94,46.9 60.11,23.7 69.81,33.39 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
          </g>
        `,
      }}
    /></div></span>
        </div>
        <div className="msgs_cont">
          <ul id="list_cont">
            {messages.map((message) => (
              <li key={message.type} className={message.type}>
                {message.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="bottom">
          <div id="input">
            <input
              type="text"
              id="txt"
              placeholder="Send a message"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button
            type='button'
              className="send-btn"
              onClick={handleSendMessage}
              disabled={isSending}
            >
              <h1 className='Sendcolor'> Send</h1>
            </button>
          </div>
        </div>
      </main>
      <style>{`
        .name {
          font-size: 36px;
        }

        .send-btn {
          background: linear-gradient(45deg, #ff8a00, #e52e71);
          color: #fff;
          border: none;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        .send-btn:hover {
          background: linear-gradient(45deg, #e52e71, #ff8a00);
        }
      `}</style>
    </>
  );
};

export default Gurudev;



















// import React, { useState } from 'react';

// import Head from 'next/head';

// const ChatGPT = ( page: string) => {
//   const [inputValue, setInputValue] = useState('');
//   const [messages, setMessages] = useState([
//     { type: 'rchat', text: 'Hello, Dazzlone AI is here!' },
//   ]);

//   const responseDictionary = {
//     one: [
//       'Hi there! How can I assist you today?',
//       'Hello! What can I help you with?',
//       'Hey! How can I assist you?',
//     ],
//     two: [
//       'My name is Dazzlone AI. I am an AI model developed by Narshi.',
//       'My name is Dazzlone AI. I am an AI model crafted by Narshi',
// 'I am Dazzlone AI, an AI model designed by Narshi.',
// 'I go by Dazzlone AI. Narshi created me as an AI model',
// 'I am Dazzlone AI, developed by Narshi to assist you.',
// 'Dazzlone AI here. Narshi put me together to help you out.',
// 'I am Dazzlone AI, a brainchild of Narshi, here to lend a hand.',




//     ],
//     three: [
//       'Narshi is the CEO of Dazzlone.',
//       'Narshi Jangid holds the position of CEO at Dazzlone.',
// 'Narshi Jangid leads Dazzlone as its CEO.',
// 'Dazzlone is CEO is Narshi Jangid.',
// 'Narshi  serves as the CEO of Dazzlone.',
// 'Narshi, the CEO of Dazzlone, oversees the company is operations.',
// 'Narshi, as the CEO of Dazzlone, shapes the company is vision and direction.',

//     ],



// four :[
//   'I am doing well, thank you for asking. How can I assist you today?'
// ]
// ,


// five :[
//   'I was developed by narshi. They put a lot of effort into making me helpful! '
// ]
// ,

// six :[
//   'I am a versatile assistant! I can answer questions, provide information, tell jokes, and even assist with tasks if needed. '
// ]
// ,

// seven :[
//   'I exist in the virtual world, ready to help you wherever you are, as long as there is an internet connection! '
// ]
// ,

// eight :[
//   'My purpose is to assist and provide information to users like you. Just let me know how I can help!'
// ]
// ,

// nine :[
//   'No, I am always here, ready to assist you 24/7. No need for sleep when you are made of code! '
// ]
// ,

// ten :[
//   'I don not age like humans do. I am perpetually new, always learning and improving!'
// ]
// ,

// eleven :[
//   'Of course! Here is one: Why don not skeletons fight each other? They don not have the guts!'
// ]
// ,

// twelfth :[
//   'For the most accurate weather information, I suggest checking a reliable weather website or app specific to your location.'
// ]
// ,

// thirten :[
//   'I work by processing the input you provide and generating responses based on my programming and training data. It is a fascinating process!'
// ]
// ,

//     default: [
//       'Sorry, I am still learning. I will come back stronger as an AI model soon!',
//     ],
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const handleSendMessage = () => {
//     if (inputValue.trim() !== '') {
//       const message = inputValue.trim().toLowerCase();
      
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { type: 'schat', text: inputValue },
//       ]);

//       setInputValue('');

//       setTimeout(() => {
//         let response = '';

//         if (fuzzyMatch(message, ['hi','hii','hiii','hiiii','hiiiii','hiiiiii','hiiiiiii','hiiiiiiii','hiiiiiiiii','hiiiiiiiiii','hiiiiiiiiii','hiiiiiiiiiii','hiiiiiiiiiiii','hiiiiiiiiiiii','hiiiiiiiiiiiiii','hiiiiiiiiiiiiiii','hiiiiiiiiiiiiiiii','hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii', 'hello','halo','hellow','hy','hy','hay','hyy'])) {
//           response = getRandomResponse(responseDictionary.one);
//         } 

        
//         else if (fuzzyMatch(message, ['what is your name'])) {
//           response = getRandomResponse(responseDictionary.two);
//         } 

                
//         else if (fuzzyMatch(message, ['Narshi', 'ceo','who is ceo of dazzlone','who is co of dazzlone'])) {
//           response = getRandomResponse(responseDictionary.three);
//         } 
        

//         else if (fuzzyMatch(message, ['How are you?'])) {
//           response = getRandomResponse(responseDictionary.four);
//         } 

//         else if (fuzzyMatch(message, ['Who created you?'])) {
//           response = getRandomResponse(responseDictionary.five);
//         } 
        

//         else if (fuzzyMatch(message, ['What can you do?'])) {
//           response = getRandomResponse(responseDictionary.six);
//         } 
        

//         else if (fuzzyMatch(message, ['Where are you located?'])) {
//           response = getRandomResponse(responseDictionary.seven);
//         } 
        

//         else if (fuzzyMatch(message, ['What is your purpose?'])) {
//           response = getRandomResponse(responseDictionary.eight);
//         } 
        

//         else if (fuzzyMatch(message, ['Do you sleep?'])) {
//           response = getRandomResponse(responseDictionary.nine);
//         } 
        

//         else if (fuzzyMatch(message, ['Do you sleep?'])) {
//           response = getRandomResponse(responseDictionary.nine);
//         } 

//         else if (fuzzyMatch(message, ['How old are you?'])) {
//           response = getRandomResponse(responseDictionary.ten);
//         } 
        


//         else if (fuzzyMatch(message, ['Can you tell a joke?'])) {
//           response = getRandomResponse(responseDictionary.eleven);
//         } 


//         else if (fuzzyMatch(message, ['What is the weather like today?'])) {
//           response = getRandomResponse(responseDictionary.twelfth);
//         } 

        

//         else if (fuzzyMatch(message, ['How do you work?'])) {
//           response = getRandomResponse(responseDictionary.thirten);
//         } 
        
        
        
        
     

        
        
        
//         else {
//           response = getRandomResponse(responseDictionary.default);
//         }

//         setMessages((prevMessages) => [
//           ...prevMessages.filter(msg => msg.text !== 'Typing...'), // Remove all "Typing..." messages
//           { type: 'rchat', text: 'Typing...' },
//         ]);

//         setTimeout(() => {
//           setMessages((prevMessages) => [
//             ...prevMessages.filter(msg => msg.text !== 'Typing...'), // Remove all "Typing..." messages
//             { type: 'rchat', text: response },
//           ]);
          
//           // Speak the response after 3 seconds
//           setTimeout(() => {
//             voiceControl(response);
//           }, 100); // 3 second delay for speaking
//         }, 1000); // 3 second delay for showing the "Typing..." animation
//       }, 0);
//     }
//   };

//   const fuzzyMatch = (input: string, targets: string[]) => {
//     const threshold = 0.7;
//     for (const target of targets) {
//       if (compareStrings(input, target) > threshold) {
//         return true;
//       }
//     }
//     return false;
//   };

//   const compareStrings = (s1: string, s2: string) => {
//     const longer = s1.length > s2.length ? s1 : s2;
//     const shorter = s1.length > s2.length ? s2 : s1;
//     const longerLength = longer.length;
//     if (longerLength === 0) {
//       return 1.0;
//     }
//     return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength.toString());
//   };

//   const editDistance = (s1: string, s2: string) => {
//     s1 = s1.toLowerCase();
//     s2 = s2.toLowerCase();

//     const costs: number[] = [];
//     for (let i = 0; i <= s1.length; i++) {
//       let lastValue = i;
//       for (let j = 0; j <= s2.length; j++) {
//         if (i === 0) {
//           costs[j] = j;
//         } else if (j > 0) {
//           let newValue = costs[j - 1];
//           if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
//             newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
//           }
//           costs[j - 1] = lastValue;
//           lastValue = newValue;
//         }
//       }
//       if (i > 0) {
//         costs[s2.length] = lastValue;
//       }
//     }
//     return costs[s2.length];
//   };

//   const getRandomResponse = (responses: string[]) => {
//     return responses[Math.floor(Math.random() * responses.length)];
//   };

//   const voiceControl = (string: string) => {
//     let u = new SpeechSynthesisUtterance(string);
//     u.text = string;
//     u.lang = "en-US";
//     u.volume = 1;
//     u.rate = 1;
//     u.pitch = 2;
//     speechSynthesis.speak(u);
//   };

//   return (
//     <>
//       <Head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap"
//           rel="stylesheet"
//         />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap"
//           rel="stylesheet"
//         />
//         <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
//       </Head>
     
//       <main>
//         <div className="topper">
//           <div className="icon"></div>
//           <div className="name" id='dazzle' >Dazzlone Ai</div>
//           <svg
//       version="1.1"
//       width="14"
//       height="14"
      
//       viewBox="0 0 256 256"
//       xmlSpace="preserve"
//       dangerouslySetInnerHTML={{
//         __html: `
//           <defs></defs>
//           <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
//             <path d="M 49.66 1.125 L 49.66 1.125 c 4.67 -2.393 10.394 -0.859 13.243 3.548 l 0 0 c 1.784 2.761 4.788 4.495 8.071 4.66 l 0 0 c 5.241 0.263 9.431 4.453 9.694 9.694 v 0 c 0.165 3.283 1.899 6.286 4.66 8.071 l 0 0 c 4.407 2.848 5.941 8.572 3.548 13.242 l 0 0 c -1.499 2.926 -1.499 6.394 0 9.319 l 0 0 c 2.393 4.67 0.859 10.394 -3.548 13.242 l 0 0 c -2.761 1.784 -4.495 4.788 -4.66 8.071 v 0 c -0.263 5.241 -4.453 9.431 -9.694 9.694 h 0 c -3.283 0.165 -6.286 1.899 -8.071 4.66 l 0 0 c -2.848 4.407 -8.572 5.941 -13.242 3.548 l 0 0 c -2.926 -1.499 -6.394 -1.499 -9.319 0 l 0 0 c -4.67 2.393 -10.394 0.859 -13.242 -3.548 l 0 0 c -1.784 -2.761 -4.788 -4.495 -8.071 -4.66 h 0 c -5.241 -0.263 -9.431 -4.453 -9.694 -9.694 l 0 0 c -0.165 -3.283 -1.899 -6.286 -4.66 -8.071 l 0 0 C 0.266 60.054 -1.267 54.33 1.125 49.66 l 0 0 c 1.499 -2.926 1.499 -6.394 0 -9.319 l 0 0 c -2.393 -4.67 -0.859 -10.394 3.548 -13.242 l 0 0 c 2.761 -1.784 4.495 -4.788 4.66 -8.071 l 0 0 c 0.263 -5.241 4.453 -9.431 9.694 -9.694 l 0 0 c 3.283 -0.165 6.286 -1.899 8.071 -4.66 l 0 0 c 2.848 -4.407 8.572 -5.941 13.242 -3.548 l 0 0 C 43.266 2.624 46.734 2.624 49.66 1.125 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,131,249); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
//             <polygon points="36.94,66.3 36.94,66.3 36.94,46.9 36.94,46.9 62.8,35.34 72.5,45.04 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,119,227); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
//             <polygon points="36.94,66.3 17.5,46.87 27.2,37.16 36.94,46.9 60.11,23.7 69.81,33.39 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
//           </g>
//         `,
//       }}
//     />
//         </div>
//         <div className="msgs_cont">
//           <ul id="list_cont">
//             {messages.map((message, index) => (
//               <li key={index} className={message.type}>
//                 {message.text}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="bottom">
//           <div id="input">
//             <input
//               type="text"
//               id="txt"
//               placeholder="Send a message"
//               value={inputValue}
//               onChange={handleInputChange}
//               onKeyPress={handleKeyPress}
//             />
//             <button
//               className="send-btn"
//               onClick={handleSendMessage}
//             >
//               <h1 className='Sendcolor'> Send</h1>
//             </button>
//           </div>
//         </div>
//       </main>
//       <style jsx>{`
//         .name {
//           font-size: 36px;
//         }

//         .send-btn {
//           background: linear-gradient(45deg, #ff8a00, #e52e71);
//           color: #fff;
//           border: none;
//           padding: 10px;
//           border-radius: 5px;
//           cursor: pointer;
//         }

//         .send-btn:hover {
//           background: linear-gradient(45deg, #e52e71, #ff8a00);
//         }
//       `}</style>
//     </>
//   );
// };

// export default ChatGPT;


































