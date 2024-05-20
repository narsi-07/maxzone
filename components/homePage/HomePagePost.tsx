import React, { useEffect, useState } from 'react';
import Image from 'next/future/image';
import { useAtom } from 'jotai';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import Link from 'next/link';
import PostPopUp from '../PostPopUp';
import HeartHollow from '../svgComps/HeartHollow';
import HeartSVG from '../svgComps/HeartSVG';
import handleLikePost from '../../util/handleLikePost';
import CommentSVG from '../svgComps/CommentSVG';
import HomePagePostHeaderComments from './HomePagePostHeaderComments';
import PostTextArea from '../PostTextArea';
import atoms from '../../util/atoms';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';
import NoPostsFiller from './NoPostsFiller';
import VerificationBadge from '../VerificationBadge';

interface Props {
  username: string;
  index: number;
}
const playMouseClickSound = () => {
  const mouseclick = new Audio('https://uploads.sitepoint.com/wp-content/uploads/2023/06/1687569402mixkit-fast-double-click-on-mouse-275.wav');
  mouseclick.play();
};

const HomePagePost = ({ username, index }: Props) => {
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [showLikesPopup, setShowLikesPopup] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (typeof username === 'string') {
          const db = getFirestore();
          const userDocRef = doc(db, 'users', username);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setIsUserVerified(userData.isVerified || false);
          }
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, [username]);

  const [userDetails] = useAtom(atoms.userDetails);
  const [homePagePosts] = useAtom(atoms.homePagePosts);
  const [userNotifications] = useAtom(atoms.userNotifications);

  const [postPopUp, setPostPopUp] = useState(false);

  const postDetails = homePagePosts[username];

  if (username === 'null') {
    return <NoPostsFiller />;
  }

  const handleLikesPopup = () => {
    setShowLikesPopup(!showLikesPopup);
  };

  const handleSharePost = () => {
    // Logic to open a popup window with share options for WhatsApp, Instagram, etc.
    const shareURL = `https://dazzlone.in/post/${postDetails.postID}`;
    const shareText = `Check out this post by ${postDetails.comments[0].username}: ${shareURL}`;

    // Open a new popup window with share options
    const popupWidth = 500;
    const popupHeight = 400;
    const left = window.screen.width / 2 - popupWidth / 2;
    const top = window.screen.height / 2 - popupHeight / 2;
    window.open(
      `https://www.addtoany.com/share?url=${encodeURIComponent(
        shareURL
      )}&title=${encodeURIComponent(shareText)}`,
      'Share Post',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=${popupWidth}, height=${popupHeight}, top=${top}, left=${left}`
    );
  };

  return (
    <div>
      {postDetails?.comments ? (
        <div   
        role="button"
        tabIndex={0} // This allows the element to receive keyboard focus
        onMouseDown={playMouseClickSound}
        className="my-1 overflow-hidden rounded-lg border border-stone-300 bg-white dark:border-stone-700">
          {postPopUp && (
            <PostPopUp
              postInformation={postDetails}
              postUserDetails={postDetails.comments[0]}
              setPostPopUp={setPostPopUp}
            />
          )}
          <div className="homepostname ml-3 flex items-center py-3">
            <Link href={username}>
              <a>
                {postDetails.comments[0].avatarURL ? (
                  <Image
                    className="h-8 w-8 cursor-pointer select-none rounded-full object-cover"
                    src={postDetails.comments[0].avatarURL}
                    alt="avatar"
                    width="32"
                    height="32"
                  />
                ) : (
                  <div className="h-8 w-8 cursor-pointer select-none rounded-full">
                    <ProfilePicSVG strokeWidth="1" />
                  </div>
                )}
              </a>
            </Link>
            <Link href={username}>
              <span className="hbt">
                <a>
                  <p className="ml-4 cursor-pointer">
                    {postDetails.comments[0].username}
                  </p>
                </a>
                <div className="hbt">
                  <div className="hbtk">
                    {isUserVerified && <VerificationBadge />}
                  </div>
                </div>
              </span>
            </Link>
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              setPostPopUp(true);
              document.body.style.overflow = 'hidden';
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setPostPopUp(true);
                document.body.style.overflow = 'hidden';
              }
            }}
          >
            {index === 0 ? (
              <Image
                className="h-auto min-h-[150px] w-full select-none bg-[#ebebeb] dark:bg-[#313131]"
                src={postDetails.imgURL}
                alt="post"
                width="0"
                height="0"
                sizes="100vw"
                priority
              />
            ) : (
              <Image
                className="h-auto min-h-[150px] w-full select-none bg-[#ebebeb] dark:bg-[#313131]"
                src={postDetails.imgURL}
                alt="post"
                width="0"
                height="0"
                sizes="100vw"
              />
            )}
          </div>
          <div className="border-t border-stone-200 px-5 py-4 dark:border-stone-700">
            <div className="mb-3 flex gap-4">
              {userNotifications?.likedPosts!.includes(postDetails.postID) ? (
                <button
                  id="unlike"
                  type="button"
                  aria-label="Like post"
                  onClick={(e) =>
                    handleLikePost({
                      e,
                      userDetails,
                      postUserDetails: postDetails.comments[0],
                      postInformation: postDetails,
                    })
                  }
                >
                  <div className="group">
                    <div >
                      <HeartSVG fillColor="#ff0059" height="24" width="24" />
                    </div>
                  </div>
                </button>
              ) : (
                <button
                  id="like"
                  type="button"
                  aria-label="Like post"
                  onClick={(e) =>
                    handleLikePost({
                      e,
                      userDetails,
                      postUserDetails: postDetails.comments[0],
                      postInformation: postDetails,
                    })
                  }
                >
                  <div className="group">
                    <div>
                      <HeartHollow />
                    </div>
                  </div>
                </button>
              )}
              <button
                type="button"
                aria-label="Open comment section"
                className="h-6 w-6 cursor-pointer"
                onClick={() => {
                  setPostPopUp(true);
                  document.body.style.overflow = 'hidden';
                }}
              >
                <div className="group">
                  <div>
                    <CommentSVG />
                  </div>
                </div>
              </button>
              <button
                type="button"
                aria-label="Share post"
                onClick={handleSharePost}
                className="h-6 w-6 cursor-pointer"
              >
                <div className="group">
                  <div>
                  <svg fill="#000000" viewBox="0 0 24 24" id="share-alt-2" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" className="icon flat-color">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
      <g id="SVGRepo_iconCarrier">
        <path id="secondary" d="M15.3,17.65a1,1,0,0,1-.45-.11l-6.61-3.3a1,1,0,1,1,.89-1.79l6.61,3.3a1,1,0,0,1,.45,1.35A1,1,0,0,1,15.3,17.65Zm-6.62-6a1,1,0,0,1-.89-.55,1,1,0,0,1,.45-1.35l6.61-3.3a1,1,0,1,1,.89,1.79l-6.61,3.3A1,1,0,0,1,8.68,11.66Z" style={{fill: '#2ca9bc'}}/>
        <path id="primary" d="M14,6a4,4,0,1,1,4,4A4,4,0,0,1,14,6Zm4,8a4,4,0,1,0,4,4A4,4,0,0,0,18,14ZM6,8a4,4,0,1,0,4,4A4,4,0,0,0,6,8Z" style={{fill: '#000000'}}/>
      </g>
    </svg>
                  </div>
                </div>
              </button>
            </div>
            <div className="flex text-sm">
  {postDetails.likes.length > 0 && (
    <p>
      <b
        onClick={handleLikesPopup}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleLikesPopup();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Open likes popup"
        className="cursor-pointer"
      >
        {postDetails.likes.length} Like
        {postDetails.likes.length === 1 ? '' : 's'}
      </b>{' '}
    </p>
  )}
  {postDetails.likes.length > 1 && (
    <span
      onClick={handleLikesPopup}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleLikesPopup();
        }
      }}
      tabIndex={0}
      role="button"
      className="cursor-pointer ml-1"
    >
      {/* {postDetails.likes.length} Like */}
      {postDetails.likes.length === 1 ? '' : ''}
    </span>
  )}
</div>
{showLikesPopup && (
  <div className="likes-popup jhgjgj">
    <h1 id="likebyd">Liked By: </h1>
    <ul>
      {postDetails.likes.map((likedUsername) => (
        <li key={likedUsername}>{likedUsername}</li>
      ))}
    </ul>
  </div>
)}

            <div className="max-h-[260px] overflow-hidden">
              <HomePagePostHeaderComments postDetails={postDetails} />
            </div>
            <button
              className="mt-3 text-xs text-[#a5a5a5]"
              type="button"
              onClick={() => {
                setPostPopUp(true);
                document.body.style.overflow = 'hidden';
              }}
            >
              {postDetails.comments.length === 1 &&
              postDetails.comments[0].text === '' ? (
                <div>No comments yet</div>
              ) : (
                <div>
                  {postDetails.comments.length === 2 ? (
                    <p>Read the 1st comment</p>
                  ) : (
                    <p>View all {postDetails.comments.length - 1} comments</p>
                  )}
                </div>
              )}
            </button>
            <p className="pt-2 text-xs text-[#a5a5a5]">
              {new Date(postDetails.createdAt.seconds * 1000).toDateString()}
            </p>
          </div>
          <PostTextArea
            postInformation={postDetails}
            postUserDetails={postDetails.comments[0]}
          />
        </div>
      ) : (
        <picture>
          <img
            className="h-0 w-0 opacity-0"
            src="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png"
            alt="avatar"
          />
        </picture>
      )}
    </div>
  );
};

export default HomePagePost;
