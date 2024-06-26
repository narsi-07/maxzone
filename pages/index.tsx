/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAtom } from 'jotai';
import Header from '../components/header/Header';
import HomePagePost from '../components/homePage/HomePagePost';
import StoryBoard from '../components/homePage/StoryBoard';
import LoadingPage from '../components/loadingComps/LoadingPage';
import UserSuggestions from '../components/homePage/UserSuggestions';
import atoms from '../util/atoms';
import LoadingPosts from '../components/loadingComps/LoadingPosts';

const Home: NextPage = () => {
  const [userdetails] = useAtom(atoms.userDetails);
console.log('uswe',userdetails)
  const [userStatus] = useAtom(atoms.userStatus);
  const [followingArray] = useAtom(atoms.followingArray);
  console.log('jgjgh',followingArray)
  const [followingArrayStatus] = useAtom(atoms.followingArrayStatus);
  const [postsLoading, setPostsLoading] = useAtom(atoms.postsLoading);
  
  useEffect(() => {

    // This code will be executed when the component has mounted
    setPostsLoading(false);
  }, []);
  if (!userStatus) {
    return <LoadingPage checkingUserRoute={false} />;
  }

  return (
    <div className="h-screen overflow-y-scroll bg-[#fafafa] text-[#262626] dark:bg-[#131313] dark:text-[#f1f5f9] dark:[color-scheme:dark]">
      <Head>
  <link rel="icon" href="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" />
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dazzlone -  social networking platform</title>
  <meta name="description" content="Dazzlone is the ultimate social networking platform where you can connect with friends, share photos, videos, and stay connected with your loved ones. Join our online community and discover new people while interacting with others in a vibrant and engaging environment."/>
<meta name="keywords" content="Social networking platform,c Dazzlone app, Connect with friends, Share photos and videos, Social media network, Stay connected, Online community, Discover new people,Video call with strangers, Chat with new people, Random video calls, Connect with strangers"/>
<meta name="author" content="Narsi jangid"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <meta property="og:title" content="Dazzlone -  Social Media Platform" />
  <meta property="og:description" content="Dazzlone is a social media platform that provides users with information, discussions, and insights about the share market. Come and enhance your investment knowledge." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.Dazzlone.in" />
  <meta property="og:image" content="https://www.Dazzlone.com/image.jpg" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Dazzlone -  Social Media Platform" />
  <meta name="twitter:description" content="Dazzlone is a social media platform that provides users with information, discussions, and insights about the share market. Come and enhance your investment knowledge." />
  <meta name="twitter:image" content="https://www.Dazzlone.com/image.jpg" />

  <link rel="canonical" href="https://www.Dazzlone.com" />

  <link rel="icon" href="favicon.ico" type="image/x-icon" />
</Head>

      <Header page="Home" />
      <div className=" iuihihihi mx-auto flex max-w-[822px] justify-center pb-16 lg:justify-start">
        <div className="w-full max-w-[470px] flex-grow lg:mr-8 ">
          <StoryBoard />
          <div
            className={`${postsLoading ? 'fixed opacity-0' : ''}`}
          >
            {followingArrayStatus ? (
              <div>
                {followingArray.map((username, index) => (
                  <HomePagePost
                    username={username}
                    index={index}
                    key={username + index}
                  />
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
          {postsLoading ? <LoadingPosts /> : ''}
        </div>
        <UserSuggestions />
      </div>
    </div>
  );
};

export default Home;






// /* eslint-disable react/no-array-index-key */
// import React, { useEffect } from 'react';
// import type { NextPage } from 'next';
// import Head from 'next/head';
// import { useAtom } from 'jotai';
// import Header from '../components/header/Header';
// import HomePagePost from '../components/homePage/HomePagePost';
// import StoryBoard from '../components/homePage/StoryBoard';
// import LoadingPage from '../components/loadingComps/LoadingPage';
// import UserSuggestions from '../components/homePage/UserSuggestions';
// import atoms from '../util/atoms';
// import LoadingPosts from '../components/loadingComps/LoadingPosts';

// const Home: NextPage = () => {
//   const [userdetails] = useAtom(atoms.userDetails);
// console.log('uswe',userdetails)
//   const [userStatus] = useAtom(atoms.userStatus);
//   const [followingArray] = useAtom(atoms.followingArray);
//   console.log('jgjgh',followingArray)
//   const [followingArrayStatus] = useAtom(atoms.followingArrayStatus);
//   const [postsLoading, setPostsLoading] = useAtom(atoms.postsLoading);
  
//   useEffect(() => {

//     // This code will be executed when the component has mounted
//     setPostsLoading(false);
//   }, []);
//   if (!userStatus) {
//     return <LoadingPage checkingUserRoute={false} />;
//   }

//   return (
//     <div className="h-screen overflow-y-scroll bg-[#fafafa] text-[#262626] dark:bg-[#131313] dark:text-[#f1f5f9] dark:[color-scheme:dark]">
//       <Head>
//         <title>Dazzlone</title>
//         <meta name="description" content="dazzlone social media app" />
//         <link rel="icon" href="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" />
//       </Head>
//       <Header page="Home" />
//       <div className="mx-auto flex max-w-[822px] justify-center pb-16 lg:justify-start">
//         <div className="w-full max-w-[470px] flex-grow lg:mr-8 ">
//           <StoryBoard />
//           <div
//             className={`${postsLoading ? 'fixed opacity-0' : ''}`}
//           >
//             {followingArrayStatus ? (
//               <div>
//                 {followingArray.map((username, index) => (
//                   <HomePagePost
//                     username={username}
//                     index={index}
//                     key={username + index}
//                   />
//                 ))}
//               </div>
//             ) : (
//               ''
//             )}
//           </div>
//           {postsLoading ? <LoadingPosts /> : ''}
//         </div>
//         <UserSuggestions />
//       </div>
//     </div>
//   );
// };

// export default Home;
