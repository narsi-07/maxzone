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

  return (
    <div>
      {postDetails?.comments ? (
        <div className="my-1 overflow-hidden rounded-lg border border-stone-300 bg-white dark:border-stone-700">
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
              <span className='hbt'>
              <a>
                <p className="ml-4 cursor-pointer">
                  {postDetails.comments[0].username}
                </p>
              </a>
              <div className='hbt'> <div className='hbtk'> {isUserVerified && <VerificationBadge />}</div></div>
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

          <div>
            <div className="border-t border-stone-200 px-5 py-4 dark:border-stone-700">
              <div className="mb-3 flex gap-4">
                {userNotifications?.likedPosts!.includes(postDetails.postID) ? (
                <button
                id="unlike"
                type="button"
                aria-label="Like post" // Add aria-label to provide an accessible label
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
                  <div className="sm:group-hover:animate-bounce">
                    <HeartSVG fillColor="#ff0059" height="24" width="24" />
                  </div>
                </div>
              </button>
              
                ) : (
                  <button
                  id="like"
                  type="button"
                  aria-label="Like post" // Add aria-label to provide an accessible label
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
                    <div className="sm:group-hover:animate-bounce">
                      <HeartHollow />
                    </div>
                  </div>
                </button>
                
                )}
              <button
  type="button"
  aria-label="Open comment section" // Add aria-label to provide an accessible label
  className="h-6 w-6 cursor-pointer"
  onClick={() => {
    setPostPopUp(true);
    document.body.style.overflow = 'hidden';
  }}
>
  <div className="group">
    <div className="sm:group-hover:animate-bounce">
      <CommentSVG
        
      />
    </div>
  </div>
</button>

              </div>
              <div className="flex text-sm">
                <p>
                
                  <b>
                    {postDetails.likes.length > 0 ? (
                   <span
                   onClick={handleLikesPopup}
                   onKeyDown={(e) => {
                     if (e.key === 'Enter' || e.key === ' ') {
                       handleLikesPopup();
                     }
                   }}
                   tabIndex={0} // Ensure the element is focusable
                   role="button" // Add role="button" to indicate that it's interactive
                   aria-label="Open likes popup" // Add aria-label to provide an accessible label
                   className="cursor-pointer"
                 />
                 

                       
                     
                    ) : (
                      ''
                    )}
                  </b>{' '}
                </p>
                {postDetails.likes.length > 1 && (
                 <span
                 onClick={handleLikesPopup}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter' || e.key === ' ') {
                     handleLikesPopup();
                   }
                 }}
                 tabIndex={0} // Ensure the element is focusable
                 role="button" // Add role="button" to indicate that it's interactive
                 className="cursor-pointer ml-1"
               >
                 {postDetails.likes.length} Like
                 {postDetails.likes.length === 1 ? '' : 's'}
               </span>
               
                )}
              </div>
              {showLikesPopup && (
                <div className="likes-popup jhgjgj">
                <h1 id='likebyd'>Liked By: </h1>
                <ul>
  {postDetails.likes.map((likedUsername) => (
    <li key={likedUsername}>{likedUsername}</li>
  ))}
</ul>




                  
                </div>
              )}
              <div className="max-h-[260px] overflow-hidden">
                <HomePagePostHeaderComments postDetails={postDetails}  />
                
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
                postDetails.comments[0].text  === '' ? (
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
































// /* eslint-disable jsx-a11y/click-events-have-key-events */
// import React, { useEffect, useState } from 'react';
// import Image from 'next/future/image';
// import { useAtom } from 'jotai';
// import { doc, getDoc, getFirestore } from 'firebase/firestore';
// import Link from 'next/link';
// import PostPopUp from '../PostPopUp';
// import HeartHollow from '../svgComps/HeartHollow';
// import HeartSVG from '../svgComps/HeartSVG';
// import handleLikePost from '../../util/handleLikePost';
// import CommentSVG from '../svgComps/CommentSVG';
// import HomePagePostHeaderComments from './HomePagePostHeaderComments';
// import PostTextArea from '../PostTextArea';
// import atoms from '../../util/atoms';
// import ProfilePicSVG from '../svgComps/ProfilePicSVG';
// import NoPostsFiller from './NoPostsFiller';
// import VerificationBadge from '../VerificationBadge';

// interface Props {
//   username: string;
//   index: number;
// }

// const HomePagePost = ({ username, index }: Props) => {
//   const [isUserVerified, setIsUserVerified] = useState(false);
// // console.log("vvv",firestore)
// useEffect(() => {
//   const fetchUserData = async () => {
//     try {

//       // Ensure that username is defined and is a string
//       if (typeof username === 'string') {
//         // Use getFirestore to get Firestore instance
//         const db = getFirestore();

//         // Construct the user document reference
//         const userDocRef = doc(db, 'users', username);
//         console.log('nnn',userDocRef)

//         // Retrieve the user document snapshot
//         const userDocSnap = await getDoc(userDocRef);
//         console.log('dd',userDocSnap)

//         if (userDocSnap.exists()) {
//           const userData = userDocSnap.data();
//           console.log('data',userData)

//           setIsUserVerified(userData.isVerified || false);
//           localStorage.setItem('isverified',JSON.stringify(isUserVerified))
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching user data', error);
//     }
//   };

//   fetchUserData();
// },[username]);
//   const [darkMode] = useAtom(atoms.darkMode);
//   const [userDetails] = useAtom(atoms.userDetails);
//   const [homePagePosts] = useAtom(atoms.homePagePosts);
//   const [userNotifications] = useAtom(atoms.userNotifications);

//   const [postPopUp, setPostPopUp] = React.useState(false);

//   const postDetails = homePagePosts[username];

//   // if not following any users
//   if (username === 'null') {
//     return <NoPostsFiller />;
//   }

//   return (
//     <div>
//       {postDetails?.comments ? (
//         <div className="my-4 overflow-hidden rounded-lg border border-stone-300 bg-white dark:border-stone-700 dark:bg-[#1c1c1c]">
//           {postPopUp ? (
//             <PostPopUp
//               postInformation={postDetails}
//               postUserDetails={postDetails.comments[0]}
//               setPostPopUp={setPostPopUp}
//             />
//           ) : (
//             ''
//           )}
//           <div className="homepostname ml-3 flex items-center py-3">
//             <Link href={username}>
//               <a>
//                 {postDetails.comments[0].avatarURL ? (
//                   <Image
//                     className="h-8 w-8 cursor-pointer select-none rounded-full object-cover"
//                     src={postDetails.comments[0].avatarURL}
//                     alt="avatar"
//                     width="32"
//                     height="32"
//                   />
//                 ) : (
//                   <div className="h-8 w-8 cursor-pointer select-none rounded-full">
//                     <ProfilePicSVG strokeWidth="1" />
//                   </div>
//                 )}
//               </a>
//             </Link>
//             <Link href={username}>
//               <span className='hbt'>
//               <a>
//                 <p className="ml-4 cursor-pointer">
//                   {postDetails.comments[0].username}
                 
                
//                 </p>
                
               
//               </a>
//               <div className='hbt'> <div className='hbtk'> {isUserVerified && <VerificationBadge />}</div></div>
//               </span>
              
//             </Link>
//           </div>
//           <div
//             role="button"
//             tabIndex={0}
//             onClick={() => {
//               setPostPopUp(true);
//               document.body.style.overflow = 'hidden';
//             }}
//           >
//             {index === 0 ? (
//               <Image
//                 className="h-auto min-h-[150px] w-full select-none bg-[#ebebeb] dark:bg-[#313131]"
//                 src={postDetails.imgURL}
//                 alt="post"
//                 width="0"
//                 height="0"
//                 sizes="100vw"
//                 // if first image add priority
//                 priority
//               />
//             ) : (
//               <Image
//                 className="h-auto min-h-[150px] w-full select-none bg-[#ebebeb] dark:bg-[#313131]"
//                 src={postDetails.imgURL}
//                 alt="post"
//                 width="0"
//                 height="0"
//                 sizes="100vw"
//               />
//             )}
//           </div>
//           <div>
//             <div className="border-t border-stone-200 px-5 py-4 dark:border-stone-700">
//               <div className="mb-3 flex gap-4">
//                 {userNotifications?.likedPosts!.includes(postDetails.postID) ? (
//                   <button
//                     id="unlike"
//                     type="button"
//                     onClick={(e) =>
//                       handleLikePost({
//                         e,
//                         userDetails,
//                         postUserDetails: postDetails.comments[0],
//                         postInformation: postDetails,
//                       })
//                     }
//                   >
//                     <div className="group">
//                       <div className="sm:group-hover:animate-bounce">

//                         {/* LIKR COLOR */}

//                         <HeartSVG fillColor="#ff0059" height="24" width="24" />
//                       </div>
//                     </div>
//                   </button>
//                 ) : (
//                   <button
//                   aria-label='button'
//                     id="like"
//                     type="button"
//                     onClick={(e) =>
//                       handleLikePost({
//                         e,
//                         userDetails,
//                         postUserDetails: postDetails.comments[0],
//                         postInformation: postDetails,
//                       })
//                     }
//                   >
//                     <div className="group">
//                       <div className="sm:group-hover:animate-bounce">
//                         <HeartHollow />
//                       </div>
//                     </div>
//                   </button>
//                 )}
//                 <button
//                 aria-label='button'
//                   type="button"
//                   className="h-6 w-6 cursor-pointer"
//                   onClick={() => {
//                     setPostPopUp(true);
//                     document.body.style.overflow = 'hidden';
//                   }}
//                 >
//                   <div className="group">
//                     <div className="sm:group-hover:animate-bounce">
//                       <CommentSVG
//                         outline={darkMode ? '#f1f5f9' : '#262626'}
//                         height="24"
//                         width="24"
//                         fill="none"
//                       />
//                     </div>
//                   </div>
//                 </button>
//               </div>
//               <div className="flex text-sm">
//                 <p>
//                   Liked by{' '}
//                   <b>
//                     {postDetails.likes.length > 0 ? (
//                       <Link href={postDetails.likes[0]}>
//                         <a>{postDetails.likes[0]}</a>
//                       </Link>
//                     ) : (
//                       ''
//                     )}
//                   </b>{' '}
//                 </p>
//                 {postDetails.likes.length === 1 ? (
//                   ''
//                 ) : (
//                   <div className="pl-1">
//                     {postDetails.likes.length > 0 ? 'and' : ''}{' '}
//                     <b>
//                       {postDetails.likes.length} other
//                       {postDetails.likes.length === 1 ? '' : 's'}
//                     </b>
//                   </div>
//                 )}
//               </div>
//               <div className="max-h-[260px] overflow-hidden">
//                 <HomePagePostHeaderComments postDetails={postDetails} />
//               </div>
//               <button
//                 className="mt-3 text-xs text-[#a5a5a5]"
//                 type="button"
//                 onClick={() => {
//                   setPostPopUp(true);
//                   document.body.style.overflow = 'hidden';
//                 }}
//               >
//                 {postDetails.comments.length === 1 &&
//                 postDetails.comments[0].text === '' ? (
//                   <div>No comments</div>
//                 ) : (
//                   <div>
//                     {postDetails.comments.length === 2 ? (
//                       <p>View the 1st comment</p>
//                     ) : (
//                       <p>View all {postDetails.comments.length - 1} comments</p>
//                     )}
//                   </div>
//                 )}
//               </button>
//               <p className="pt-2 text-xs text-[#a5a5a5]">
//                 {new Date(postDetails.createdAt.seconds * 1000).toDateString()}
//               </p>
//             </div>
//             <PostTextArea
//               postInformation={postDetails}
//               postUserDetails={postDetails.comments[0]}
//             />
//           </div>
//         </div>
//       ) : (
//         <picture>
//           <img
//             // this forces the map loading state to be triggered (I need to come up with a better way of doing this)
//             className="h-0 w-0 opacity-0"
//             src="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png"
//             alt="avatar"
//           />
//         </picture>
//       )}
//     </div>
//   );
// };

// export default HomePagePost;