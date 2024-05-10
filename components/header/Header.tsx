/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import { useAtom } from 'jotai';
import $ from 'jquery';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';
import DarkModeButton from './DarkModeButton';
import atoms from '../../util/atoms';
import AddNewPost from './AddNewPost';
import HeaderSearchWindow from './HeaderSearchWindow';
import useCheckUserName from '../../hooks/useCheckUserName';
import ExploreSVG from '../svgComps/ExploreSVG';
import NewPostSVG from '../svgComps/NewPostSVG';
import HeartSVG from '../svgComps/HeartSVG';
import IndexSVG from '../svgComps/IndexSVG';
import HomeSVG from '../svgComps/HomeSVG';
import useHandleSignOut from '../../hooks/useHandleSignOut';
import useHandleAvatarDropDown from '../../hooks/useHandleAvatarDropDown';
import HeartNotificationsWindow from './HeartNotificationsWindow';
import useHandleHeartDropDown from '../../hooks/useHandleHeartDropDown';
import handleResetNewHearts from '../../util/handleResetNewHears';
import SearchBtnSVG from '../svgComps/SearchBtnSVG';
import GurudevSVGIcon from '../svgComps/GurudevSVG';





function Header({ page }: { page: string }) {
  const [darkMode] = useAtom(atoms.darkMode);
  // eslint-disable-next-line no-unused-expressions
  const [userDetails] = useAtom(atoms.userDetails);
  const [newMessage] = useAtom(atoms.newMessage);
  const [userNotifications] = useAtom(atoms.userNotifications);

  const [avatarDropDown, setAvatarDropDown] = React.useState(false);
  const [addPost, setAddPost] = React.useState(false);
  const [nameSearch, setNameSearch] = React.useState('');
  const [searchWindow, setSearchWindow] = React.useState(false);
  const [signUserOut, setSignUserOut] = React.useState(false);
  const [showHeartNotifications, setShowHeartNotifications] =
    React.useState(false);
  const queryCharacter = true;

  const user = useCheckUserName({ nameSearch, queryCharacter });
  useHandleSignOut({ signUserOut });
  useHandleAvatarDropDown(setAvatarDropDown);
  useHandleHeartDropDown(setShowHeartNotifications);


  useEffect(() => {
    

    $(document).ready(() => {
      const audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3');
      const audio2 = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3');
    

      $('.buttonsound').mousedown( ()=> {
        audio2.load();
        audio2.play();
      });

      $('.buttonsound').mouseup( ()=> {
        audio.load();
        audio.play();
      });
    });
  }, []);


  return (
    <>
    <div className="jgjhh sticky top-0 z-50 border-b border-stone-300 bg-white dark:border-stone-700 dark:bg-[#1c1c1c] dark:text-slate-100">
      <div className=" flex h-[50px] items-center justify-between px-[10px] sm:px-[20px] lg:justify-center ">
        <div className="flex h-[60px] w-[330px] items-center ">



          {/* <Link href="/">
            <a className="w-full max-w-[103px] ">
              <div className="w-full max-w-[103px] cursor-pointer select-none">
                <InstagramSVG disableDarkMode={false} white={false} />
              </div>
            </a>
          </Link> */}





        </div>
        <div className="relative  sm:flex">
          <input
            className=" searchdesign w-[250px] rounded-lg bg-[#f1f5f9] py-[6px] pl-[45px] focus:outline-0 dark:bg-[#262626]  lg:w-[275px]"
            type="text"
            placeholder="Search"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            onFocus={() => setSearchWindow(true)}
            onBlur={() => {
              setTimeout(() => setSearchWindow(false), 200);
            }}
          />
          {searchWindow ? (
            <HeaderSearchWindow
              loading={user.checkingUser}
              userDetails={user.queryNotificationsArray}
              searchName={nameSearch}
            />
          ) : (
            ''
          )}
          <div className="absolute left-[15px] top-[25%]">
            <SearchBtnSVG  />
          </div>
        </div>


        {/* //Ai Svg  */}


        <div className="relative flex items-center pl-[15px] lg:pl-[100px]">
        <Link href="/Ai">
          <div className="buttonsound hdfkhdks ml-[10px] sm:ml-[22px]">
          <svg fill="#ffff" height="27px" width="27px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 490 490" ><g id="SVGRepo_bgCarrier" strokeWidth="0"/><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M416,0H74C33.3,0,0,33.4,0,74v342c0,40.7,33.4,74,74,74h342c40.7,0,74-33.4,74-74V74C490,33.4,456.6,0,416,0z M449.3,416 c0,18.8-14.6,33.4-33.4,33.4H74c-18.8,0-33.4-14.6-33.4-33.4V74c0-18.8,14.6-33.4,33.4-33.4h342c18.8,0,33.4,14.6,33.4,33.4v342 H449.3z"/> <g> <path d="M234.8,169.8c-2.4-5.5-7.8-9-13.8-9s-11.4,3.5-13.8,9L147,308.3c-3.3,7.6,0.2,16.4,7.8,19.7c2,0.9,4,1.3,6,1.3 c5.8,0,11.3-3.4,13.8-9l13.2-30.2h66.9l13.2,30.2c3.3,7.6,12.1,11.1,19.7,7.8c7.6-3.3,11.1-12.2,7.8-19.7L234.8,169.8z M200.7,260l20.4-46.8l20.4,46.8H200.7z"/> <path d="M329.3,217.9c-8.3,0-15,6.7-15,15v81.4c0,8.3,6.7,15,15,15s15-6.7,15-15v-81.4C344.3,224.6,337.6,217.9,329.3,217.9z"/> <path d="M329.3,166.4c-8.3,0-15,6.7-15,15v4c0,8.3,6.7,15,15,15s15-6.7,15-15v-4C344.3,173.1,337.6,166.4,329.3,166.4z"/> </g> </g> </g> </g></svg>
                    </div>
          </Link>
      
      {/* Talking */}
        
          <Link href="/Gurudev">
          <div className="buttonsound hdfkhdks ml-[10px] sm:ml-[22px]">
    
          <svg height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#FFFFFF">
  <g id="SVGRepo_bgCarrier"/>
  <g id="SVGRepo_tracerCarrier"  />
  <g id="SVGRepo_iconCarrier">
    <g>
      <g>
        <g>
          <path style={{fill: '#FFFFFF'}} d="M453.523,38.777H58.477C26.233,38.777,0,65.01,0,97.254c0,8.669,0,230.264,0,241.81 c0,32.244,26.233,58.477,58.477,58.477h122.667l-6.301,36.698h-39.696c-10.765,0-19.492,8.727-19.492,19.492 s8.727,19.492,19.492,19.492c11.424,0,229.887,0,241.706,0c10.765,0,19.492-8.727,19.492-19.492s-8.727-19.492-19.492-19.492 h-39.696l-6.301-36.698h122.667c32.246,0,58.477-26.233,58.477-58.477c0-11.759,0-233.55,0-241.81 C512,65.01,485.768,38.777,453.523,38.777z M214.398,434.238l6.301-36.698h70.603l6.301,36.698H214.398z M473.015,339.064 c0,10.748-8.743,19.492-19.492,19.492c-9.504,0-385.85,0-395.046,0c-10.748,0-19.492-8.744-19.492-19.492v-8.694h434.03V339.064z M473.015,291.385H38.985V97.254c0-10.748,8.744-19.492,19.492-19.492h395.046c10.749,0,19.492,8.744,19.492,19.492V291.385z"/>
          <path style={{fill:'#FFFFFF'}} d="M321.94,152.991l-23.859,13.775v-12.708c0-10.765-8.727-19.492-19.492-19.492h-88.313 c-10.765,0-19.492,8.727-19.492,19.492v61.031c0,10.765,8.727,19.492,19.492,19.492h88.313c10.765,0,19.492-8.727,19.492-19.492 v-12.709l23.859,13.775c8.548,4.935,19.277-1.241,19.277-11.13v-40.905C341.217,154.25,330.504,148.046,321.94,152.991z"/>
        </g>
      </g>
    </g>
  </g>
</svg>

            </div>
          </Link>
    
        
        </div>
        
      </div>
    
    </div>

































    <div style={{ position: 'fixed', bottom: '0', width: '100%' }} className="jgjhh z-50 border-t border-stone-0 bg-white dark:border-stone-0 dark:bg-[#1c1c1c] dark:text-slate-100 ">
    <div className="flex h-[50px] items-center justify-between px-[10px] sm:px-[20px] lg:justify-center">
        
        
          <div className="buttonsound hdfkhdks relative flex items-center pl-[15px] lg:pl-[100px]">


          <Link href="/">
            <a>
              <HomeSVG  />
            </a>
          </Link>

          
          <Link href="/Inbox">
            <a>
              <div className="buttonsound hdfkhdks relative">
                <IndexSVG  />
                {newMessage ? (
                  <div className="absolute top-[-6px] right-[-8px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#d10f3c]">
                    <p className="text-center text-white">◉</p>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </a>
          </Link>
          <button className='hdfkhdksss  buttonsound' onClick={() => setAddPost(true)} type="button" aria-label='button'>
            <NewPostSVG />
          </button>
          <div className="hdfkhdks buttonsound relative ml-[10px] cursor-pointer sm:ml-[22px]">
            <div className="flex items-center justify-center">
              <button
                id="unlike"
                type="button"
                onClick={() => {
                  setShowHeartNotifications(true);
                  handleResetNewHearts(userDetails.displayName!);
                }}
              >
                {userNotifications?.newHeart ? (
                  <HeartSVG fillColor="#ff3041" height="24" width="24" />
                ) : (
                  <svg
                  id="like"
                  aria-label="Like"
                  // color={darkMode ? '#f1f5f9' : '#262626'}
                  className={darkMode ? 'fill-[#00000]' : 'fill-[#f1f5f9]'}
                  // fill={darkMode ? '#f1f5f9' : '#262626'}
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path
                    id="like"
                    d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
                  />
                </svg>
                )}
              </button>
              {showHeartNotifications ? <HeartNotificationsWindow /> : ''}
            </div>
          </div>
          <Link href="/Music">
          <div className="hdfkhdks buttonsound ml-[10px] sm:ml-[22px]">
          <GurudevSVGIcon page={page}/>
                    </div>
          </Link>
          <div className="ml-[0px] sm:ml-[22px]">
          <DarkModeButton/>
                    </div>
          
          <button
            className="hdfkhdks buttonsound relative ml-[10px] h-6 w-6 sm:ml-[22px]"
            type="button"
            onClick={() => setAvatarDropDown(!avatarDropDown)}
          >
            {userDetails.photoURL ? (
              <Image
                className="h-6 w-6 cursor-pointer select-none rounded-full bg-[#ebebeb] object-cover dark:bg-[#313131]"
                id="avatarDropDown"
                src={userDetails.photoURL}
                alt="avatar"
                width="35"
                height="30"
              />
            ) : (
              <div className=" h-6 w-6">
                <ProfilePicSVG strokeWidth="1.5" />
              </div>
            )}
            <div
              className={`${
                avatarDropDown ? 'flex items-center justify-center' : 'hidden'
              } absolute top-6 right-1 z-[51] h-4 w-4 overflow-hidden`}
            >
              <div className="mt-5 h-4 w-4 rotate-45 bg-white dark:bg-[#131313]" />
            </div>
            <div
            style={{top: '-130px'}}  className={`${
                avatarDropDown ? 'show' : 'hidden'
              } forborderrad absolute  right-[-14px]  z-50 w-[230px] items-center justify-start bg-white text-sm shadow-[-2px_-2px_10px_2px_rgba(0,0,0,0.1)] dark:bg-[#131313] dark:shadow-[-2px_-2px_5px_2px_rgba(0,0,0,0.7)]`}
            >
              <Link href={`/${userDetails.displayName}`}>
                <a>
                  <div className="kjghh flex items-center py-2 px-4 hover:bg-[#f8f8f8] dark:hover:bg-[#080808]">
                    <div className="h-4 w-4">
                      <ProfilePicSVG strokeWidth="2" />
                    </div>
                    <p className="pl-2">Profile</p>
                  </div>
                </a>
              </Link>
              <Link href="/Explore">
                <a>
                  <div className="kjghh flex items-center py-2 px-4 hover:bg-[#f8f8f8] dark:hover:bg-[#080808]">
                    <ExploreSVG />
                    <p className="pl-2">Explore</p>
                  </div>
                </a>
              </Link>
              <div
                className="khkhkhkj border-t border-stone-300 py-2 px-4 text-start hover:bg-[#f8f8f8] dark:border-stone-700 dark:hover:bg-[#080808]"
                role="button"
                tabIndex={0}
                onClick={() => setSignUserOut(true)}
              >
                Log out
              </div>
            </div>
          </button>
        </div>
      </div>
      {addPost ? <AddNewPost setAddPost={setAddPost} /> : <div />}
    </div>
    </>
  );
}

export default Header;