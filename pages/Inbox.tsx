// Inbox component
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { NextPage } from 'next';
import ChatRoom from '../components/InboxPage/ChatRoom';
import CreateChatRoom from '../components/InboxPage/CreateChatRoom';
import SendMessage from '../components/InboxPage/SendMessage';
import LoadingPage from '../components/loadingComps/LoadingPage';
import Header from '../components/header/Header';
import atoms from '../util/atoms';
import LoadingChatRooms from '../components/loadingComps/LoadingChatRooms';
import handleResetNewMessage from '../util/handleResetNewMessage';

const Inbox: NextPage = () => {
  const [userStatus] = useAtom(atoms.userStatus);
  const [userDetails] = useAtom(atoms.userDetails);
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [chatRoomLoading, setChatRoomLoading] = useAtom(atoms.chatRoomLoading);

  const [activeChat, setActiveChat] = React.useState('');
  const [move, setMove] = useState(false);
  const [createChatRoom, setCreateChatRoom] = React.useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    // This code will be executed when the component has mounted
    setChatRoomLoading(false);
  }, []);

  const toggleHeaderVisibility = () => {
    setIsHeaderVisible(!isHeaderVisible);
  };

  if (!userStatus) {
    return <LoadingPage checkingUserRoute={false} />;
  }

  return (
    <div className="h-screen cursor-default overflow-y-scroll bg-[#fafafa] text-[#231f20] dark:bg-[#131313] dark:text-slate-100 dark:[color-scheme:dark]">
      {isHeaderVisible && <Header page="Inbox" />}

      {createChatRoom ? (
        <CreateChatRoom setCreateChatRoom={setCreateChatRoom} />
      ) : (
        null
      )}
      <div className="messagebordedesign wholeinboxheightScroll relative mx-auto mt-0 max-w-[100%] border border-stone-300 bg-white dark:border-stone-700 dark:bg-[#1c1c1c] ">
        <div className="flex h-[0px] w-[100px] items-center border-b border-stone-260 dark:border-stone-700 md:w-[350px] md:px-5"/>
      
        {activeChat === '' ? (
          <SendMessage move={move} setCreateChatRoom={setCreateChatRoom} />
        ) : (
          null
        )}
        <div className={`${move ? 'w-[0px]' : 'w-[110px]'} h-[calc(100%-60px)] overflow-y-auto overflow-x-hidden dark:[color-scheme:dark] md:w-[350px]`}>
          <div className={chatRoomLoading ? 'fixed opacity-0' : ''}>
            {userNotifications?.chatRoomIds?.map((chatRoomId) => (
              <div
                key={`chatRoomKey${chatRoomId}`}
                onClick={() => {
                  setActiveChat(`chatRoom${chatRoomId}`);
                  handleResetNewMessage({
                    username: userDetails.displayName!,
                    chatRoomId,
                  });
                }}
                onKeyDown={() => {}} // Add onKeyDown event handler
                aria-label="button"
                role="button"
                tabIndex={0}
              >
                <ChatRoom
                  key={`chatRoomComponentKey${chatRoomId}`}
                  chatRoomID={chatRoomId}
                  userID={userDetails.displayName!}
                  activeChat={activeChat}
                  move={move}
                  activeChatId={`chatRoom${chatRoomId}`}
                />
              </div>
            ))}
          </div>
          {chatRoomLoading && !userNotifications?.chatRoomIds ? (
            <LoadingChatRooms />
          ) : (
            null
          )}

        </div>
        <button
  type="button"
  id="chatbottonn"
  className={`${move ? 'moving' : ''} activee`}
  onClick={() => {
    setMove(!move);
    toggleHeaderVisibility();
  }}
  aria-label="Toggle Header Visibility"
>
          <svg height="30px" width="30px" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.772 56.772" ><g id="SVGRepo_bgCarrier" /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M26.708,22.915c-2.773-1.148-7.119-0.317-10.205-0.249c-0.767-0.628,0.197-4.999-0.586-6.225 c-0.149-0.234-0.546-0.297-0.794-0.266c-2.966,0.381-5.784,4.003-7.963,5.82c-0.729,0.607-7.759,5.267-7.119,6.638 c1.38,2.953,6.064,5.461,8.508,7.499c1.364,1.138,4.684,5.355,6.904,4.307c1.369-0.648,0.923-2.703,0.923-3.856 c0-3.144-0.368-2.509,2.957-2.509c1.268,0,7.976,1.13,7.976-1.528C27.309,30.995,28.407,23.619,26.708,22.915z M2.519,28.767 c0.306-0.603,0.62-1.2,0.931-1.799c0.625-0.523,1.248-1.018,1.382-1.13c1.796-1.498,3.592-2.995,5.389-4.493 c-1.878,3.045-3.767,6.081-5.751,9.048C3.82,29.85,3.17,29.308,2.519,28.767z M7.579,32.984c-0.583-0.487-1.168-0.974-1.752-1.461 c3.036-4.45,5.835-9.071,8.67-13.668c0.034-0.055,0.061-0.104,0.092-0.157c0.059-0.051,0.114-0.099,0.148-0.13 c-0.12,0.142-0.315,0.433-0.315,0.777c0,0.882,0,1.764,0,2.646C12.148,24.992,9.86,28.987,7.579,32.984z M16.971,32.521 c-0.01,0.018-0.008,0.033-0.017,0.051c-0.635,0.092-1.246,0.226-1.794,0.451c-0.761,0.313-0.737,1.219-0.737,1.893 c0,0.616,0,1.232,0,1.848c-0.261,0.425-0.523,0.85-0.782,1.274c-1.157-0.965-2.313-1.93-3.47-2.894 c2.085-3.623,4.119-7.279,6.183-10.913c0.038-0.067,0.058-0.126,0.085-0.189c1.099-0.011,3.365-0.042,5.349-0.034 c-0.065,0.076-0.135,0.15-0.18,0.232C20.091,27.016,18.541,29.773,16.971,32.521z M21.608,32.535 c-0.001,0.001-0.001,0.002-0.002,0.003c-0.794-0.055-1.598-0.095-2.395-0.103c1.771-2.78,3.595-5.527,5.458-8.248 c0.025-0.037,0.027-0.068,0.046-0.104c0.393,0.029,0.64,0.068,0.64,0.122c0,0.801,0,1.601,0,2.4 C24.091,28.575,22.832,30.548,21.608,32.535z M23.939,32.535c-0.031,0.051-0.034,0.096-0.054,0.144 c-0.102-0.005-0.198-0.006-0.301-0.012c0.037-0.047,0.085-0.088,0.113-0.137c0.257-0.431,0.514-0.861,0.775-1.288 c0.296-0.481,0.598-0.964,0.899-1.443c0.006,0.122,0.012,0.243,0.022,0.363C24.908,30.954,24.424,31.744,23.939,32.535z"/> <path d="M52.335,23.954c-2.375-1.979-6.418-7.048-9.581-7.454c-0.481-0.061-1.459,0.085-1.747,0.538 c-0.668,1.046,0.136,4.822-0.344,5.933c-3.001-0.08-6.305-0.476-9.184,0.062c-3.102,0.579-1.789,5.112-1.789,7.426 c0,4.187,1.384,3.306,5.326,3.306c0.91,0,5.606-0.645,5.606,0.73c0,1.086-0.702,5.056,0.421,5.719 c1.398,0.826,3.365-1.25,4.233-1.976c3.708-3.092,7.417-6.185,11.125-9.276C58.146,27.509,53.215,24.687,52.335,23.954z M46.593,26.318c0.446-1.182,0.918-2.354,1.396-3.521c0.034-0.082,0.042-0.175,0.058-0.265c0.078,0.07,0.159,0.143,0.234,0.205 c0.049,0.041,0.166,0.133,0.312,0.247c-0.061,0.062-0.123,0.12-0.167,0.205c-0.561,1.067-1.125,2.13-1.701,3.188 C46.459,26.863,46.396,26.835,46.593,26.318z M31.496,23.738c0.71,0,1.42,0,2.13,0c-0.195,0.144-0.37,0.313-0.475,0.506 c-0.446,0.829-0.9,1.653-1.351,2.479c-0.038-1.127-0.172-2.102-0.479-2.609C31.402,23.973,31.459,23.848,31.496,23.738z M32.363,32.89c-0.46-0.121-0.741-0.29-0.741-0.524c0-0.095,0.003-0.212,0.009-0.343c1.721-2.609,3.442-5.219,5.168-7.825 c0.114-0.174,0.137-0.325,0.115-0.459c0.308,0,0.613,0,0.919,0c-0.117,0.096-0.219,0.198-0.273,0.313 c-0.111,0.229-0.224,0.458-0.337,0.685c-1.548,2.621-3.122,5.226-4.734,7.805C32.41,32.667,32.373,32.783,32.363,32.89z M39.564,32.522c-0.124,0.214-0.147,0.404-0.105,0.556c-1.48,0.064-3.576,0.14-5.236,0.049c0.269-0.149,0.507-0.354,0.649-0.579 c1.699-2.682,3.29-5.422,4.708-8.249c0.093-0.155,0.184-0.312,0.273-0.468c0.019-0.033,0.01-0.062,0.014-0.093 c0.157,0,0.313,0,0.47,0c0.11,0,0.341-0.064,0.588-0.152c0.243-0.026,0.475-0.069,0.595-0.119c1.603-0.663,1.19-2.529,1.044-4.278 c0.114-0.195,0.229-0.391,0.343-0.587c0.104-0.177,0.157-0.362,0.187-0.541c1.121,0.748,2.275,1.865,3.301,2.881 c-0.074,0.056-0.143,0.123-0.19,0.215c-0.133,0.252-0.267,0.503-0.401,0.754C43.693,25.429,41.619,28.971,39.564,32.522z M41.68,33.101c0.051-0.073,0.102-0.147,0.151-0.238c0.08-0.143,0.159-0.288,0.238-0.432c0.267-0.483,0.338-0.451,0.155,0.068 c-0.085,0.243-0.172,0.484-0.258,0.728C41.882,33.176,41.784,33.135,41.68,33.101z M43.781,38.161 c-0.013,0.027-0.013,0.041-0.022,0.065c-0.242,0.202-0.484,0.402-0.727,0.604c-1.767,1.475-0.477,0.824-0.477-0.604 c0-0.208,0.015-0.444,0.037-0.7c0.054-0.148,0.107-0.298,0.161-0.446c0.188-0.519,0.582-1.315,0.879-1.781 c2.246-3.522,4.339-7.146,6.313-10.836c0.054-0.101,0.081-0.212,0.103-0.324c0.149,0.12,0.305,0.245,0.464,0.374 c-0.074,0.07-0.145,0.148-0.196,0.252C48.097,29.208,45.93,33.68,43.781,38.161z M52.993,30.449 c-0.02,0.043-0.02,0.067-0.034,0.105c-1.797,1.498-3.595,2.997-5.392,4.496c-0.094,0.077-0.188,0.155-0.282,0.233 c0.015-0.026,0.036-0.059,0.049-0.085c1.479-3.07,2.973-6.133,4.486-9.184c0.052-0.105,0.079-0.222,0.097-0.339 c0.882,0.75,1.729,1.514,2.292,2.127C53.799,28.684,53.392,29.564,52.993,30.449z"/> </g> </g> </g></svg>
        </button>

      </div>
    </div>
  );
};

export default Inbox;
