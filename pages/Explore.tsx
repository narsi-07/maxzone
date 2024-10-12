import { useAtom } from 'jotai';
import { NextPage } from 'next';
import Image from 'next/future/image';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LoadingPage from '../components/loadingComps/LoadingPage';
import atoms from '../util/atoms';
import useExploreUsers from '../hooks/useExploreUsers';
import Header from '../components/header/Header';
import ProfilePicSVG from '../components/svgComps/ProfilePicSVG';
import ArrowSVG from '../components/svgComps/ArrowSVG';
import VerificationBadge from '../components/VerificationBadge'; 

const playMouseClickSound = () => {
  const mouseclick = new Audio('https://uploads.sitepoint.com/wp-content/uploads/2023/06/1687569402mixkit-fast-double-click-on-mouse-275.wav');
  mouseclick.play();
};

const Explore: NextPage = () => {
  const [userStatus] = useAtom(atoms.userStatus);
  const [userDetails] = useAtom(atoms.userDetails);

  const [requestMoreUsers, setRequestMoreUsers] = React.useState(false);

  const userExploreArray = useExploreUsers(requestMoreUsers);

  if (!userStatus) {
    return <LoadingPage checkingUserRoute={false} />;
  }

  if (userStatus && userExploreArray.firstFetch) {
    return <LoadingPage checkingUserRoute />;
  }

  return (
    <div className="h-screen overflow-y-scroll bg-[#fafafa] text-[#231f20] dark:bg-[#131313] dark:text-slate-100 dark:[color-scheme:dark]">
      <Head>
        <title>Free4talk • Explore</title>
        <meta name="description" content="Free4talk is the ultimate social networking platform where you can connect with friends, share photos, videos, and stay connected with your loved ones. Join our online community and discover new people while interacting with others in a vibrant and engaging environment."/>
<meta name="keywords" content="Social networking platform,c Free4talk app, Connect with friends, Share photos and videos, Social media network, Stay connected, Online community, Discover new people,Video call with strangers, Chat with new people, Random video calls, Connect with strangers"/>
<meta name="author" content="Narsi jangid"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="https://blogger.googleusercontent.com/img/a/AVvXsEhPOBDFKLDBOkT9QWKq29HqXVdODvybjPba5bT4fVThHr5XLI8fF-LJW3tzFtQbcmvQFTx7-1DdnTWnPcWWwpxoKfFcX8L0eu_xmReoWHIk0bi5SBrbvemyOobf07DmaEB6cCQbCwrZX2tC5gTu0LGqLYUeQr1g1KLMYRhVutYu5k14FTPhK_xSujWnJ8E" />
      </Head>
      <Header page="" />
      <div className="mx-auto my-16 w-full max-w-[600px] bg-white dark:bg-[#1c1c1c]">
        <p className="bg-[#fafafa] pb-2 pl-5 font-semibold dark:bg-[#131313]">
          Explore Users
        </p>
        {userExploreArray.usersArray.map((userDocs) => (
          <div
            className="flex items-center justify-between pt-5 pl-5"
            key={userDocs.userId}
          >
            <div className="flex items-center gap-3">
              <Link href={userDocs.username!}>
                <a>
                  {userDocs.avatarURL ? (
                    <div>
                      <Image
                        className="h-11 w-11 cursor-pointer select-none rounded-full bg-[#ebebeb] object-cover dark:bg-[#313131]"
                        src={userDocs.avatarURL}
                        alt="avatar"
                        width="44"
                        height="44"
                      />
                    </div>
                  ) : (
                    <div className="h-11 w-11">
                      <ProfilePicSVG strokeWidth="1" />
                    </div>
                  )}
                </a>
              </Link>
              <div>
                <Link href={userDocs.username!}>
                  <a>
                    <p className="cursor-pointer text-sm font-semibold">
                      {userDocs.username} {userDocs.isVerified && <VerificationBadge />}
                    </p>
                  </a>
                </Link>
                <p className="hidden text-xs text-[#818181] sm:block">
                  Followed by {userDocs.followers!.length}{' '}
                  {userDocs.followers!.length === 1 ? 'user' : 'users'}{' '}
                  {userDocs.followers!.includes(userDetails.displayName!)
                    ? 'including you'
                    : ''}
                </p>
                <p className="text-xs text-[#818181] sm:hidden">
                  Followed by {userDocs.followers!.length}
                </p>
              </div>
            </div>
            <Link href={userDocs.username!}>
              <a>
                <p className="cursor-pointer pr-5 text-xs font-semibold text-[#0095f6]">
                  Profile
                </p>
              </a>
            </Link>
          </div>
        ))}
        {!userExploreArray.moreUsers ? (
          <div className="flex justify-center pt-4">
            <p className="text-[#ff2b2b]">No more users were found</p>
          </div>
        ) : (
          ''
        )}
        <div className="flex flex-col justify-center pt-5 font-semibold">
          <p className="mx-auto">Explore more users</p>
          <button
  onMouseDown={playMouseClickSound}
  aria-label="Explore more users" // Add aria-label with a descriptive text
  className="group mx-auto px-8 pb-8 pt-4"
  type="button"
  onClick={() => setRequestMoreUsers(!requestMoreUsers)}
>
  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0095f6] group-hover:animate-bounce">
    <div className="h-5 w-5 pt-[1px]">
      <div className="h-5 w-5 rotate-90">
        <ArrowSVG white />
      </div>
    </div>
  </div>
</button>

        </div>
      </div>
    </div>
  );
};

export default Explore;
