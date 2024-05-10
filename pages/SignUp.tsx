import React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { useAtom } from 'jotai';
import { NextPage } from 'next';
import atoms from '../util/atoms';
import useHandleSignIn from '../hooks/useHandleSignIn';
import useSetFormErrors from '../hooks/useSetFormErrors';
import handleCreateUser from '../util/handleCreateUser';
import { useEffect } from 'react';
// import PageLoader from 'next/dist/client/page-loader';
// import LoadingUserPosts from '../components/loadingComps/LoadingUserPosts';

const SignUp: NextPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [emailFormErrors, setEmailFormErrors] = React.useState('');
  const [passwordFormErrors, setPasswordFormErrors] = React.useState('');
  const [usernameFormErrors, setUsernameFormErrors] = React.useState('');
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [listeners] = useAtom(atoms.listeners);

  useSetFormErrors({
    email,
    password,
    username,
    setEmailFormErrors,
    // setPasswordFormErrors,      changed for strong password
    setUsernameFormErrors,
  });

  useHandleSignIn({ isSubmit });

  // if (loading) {
  //   return (
  //     <div className="flex h-[100vh] w-full items-center justify-center dark:bg-[#131313]">
  //       <picture>
  //         <img src="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" alt="loading" />
  //       </picture>
  //     </div>
  //   );
  // }



  useEffect(() => {
    const $ = require('jquery');

    $(document).ready(function () {
      var audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3');
      var audio2 = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3');

      $(".buttonsound").mousedown(function () {
        audio2.load();
        audio2.play();
      });

      $(".buttonsound").mouseup(function () {
        audio.load();
        audio.play();
      });
    });
  }, []);

  return (
    <div>
      <Head>
        <title>ShareTrendy • Sign up</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" />
      </Head>
      
      <div className="flex min-h-[100vh]  w-full items-center justify-center bg-[#FFFFFF]">
        <div>
          
          <div className="bg-white-loginpage2 flex max-w-[350px] flex-col items-center justify-center  bg-white">
            <div className="px-10 pb-5 text-center font-semibold text-[#8e8e8e]">
            {/* <div className='dazzlonesignup'> <img src="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" alt="" /></div> */}
              <p>Sign Up </p>
            </div>
            <div className=" w-full px-10">
              
              <form
                action=""
                className="signInPageFormContainer"
                onSubmit={(e: any) =>
                  handleCreateUser({
                    e,
                    listeners,
                    username,
                    email,
                    password,
                    passwordFormErrors,
                    emailFormErrors,
                    usernameFormErrors,
                    setIsSubmit,
                    setLoading,
                    setPasswordFormErrors,
                  })
                }
              >
                <label htmlFor="signInPageUserName">
                  {' '}
                  <input
                    className=" userenter w-full mobipass border rounded-[6px] border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="text"
                    id="signInPageUserName"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                </label>
                <p className="h-[30px]  text-[10px] text-red-600">
                  {usernameFormErrors}
                </p>
                <label htmlFor="signInPageEmail">
                  {' '}
                  <input
                    className="userenter w-full border mobipass rounded-[6px] border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="email"
                    id="signInPageEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                  />
                </label>
                <p className="h-[20px] pb-2 text-[10px] text-red-600">
                  {emailFormErrors}
                </p>
                <label htmlFor="signInPagePassword">
                  {' '}
                  <input
                    className=" userenter w-full border mobipass rounded-[6px] border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="password"
                    id="signInPagePassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </label>
                <p className="h-[20px] text-[10px] text-red-600">
                  {passwordFormErrors}
                </p>
              
                <button
                  className={`userenter buttonsound ${
                    emailFormErrors === ''
                      ? 'bg-[#000]'
                      : 'pointer-events-none cursor-default bg-[#4f524f]'
                  }  my-5 w-full mobiguest rounded-[4px]  px-2 py-1 text-sm font-semibold text-white`}
                  type="submit"
                >
                  Sign Up {'  '}{loading && 'Loading...'}
                </button>
              </form>
            </div>
          </div>
          <div className=" bg-white-loginpage2 mt-2 flex max-w-[350px] justify-center  bg-white py-5 text-[14px]">
            <p>Have an account?</p>
            <button
              className=" buttonsound ml-1 font-semibold text-[#000]"
              type="button"
              onClick={() => Router.push('/Login')}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;









// import React from 'react';
// import Router from 'next/router';
// import Head from 'next/head';
// import { useAtom } from 'jotai';
// import { NextPage } from 'next';
// import atoms from '../util/atoms';
// import useHandleSignIn from '../hooks/useHandleSignIn';
// import useSetFormErrors from '../hooks/useSetFormErrors';
// import handleCreateUser from '../util/handleCreateUser';

// const SignUp: NextPage = () => {
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [username, setUsername] = React.useState('');
//   const [emailFormErrors, setEmailFormErrors] = React.useState('');
//   const [passwordFormErrors, setPasswordFormErrors] = React.useState('');
//   const [usernameFormErrors, setUsernameFormErrors] = React.useState('');
//   const [isSubmit, setIsSubmit] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);

//   const [listeners] = useAtom(atoms.listeners);

//   useSetFormErrors({
//     email,
//     password,
//     username,
//     setEmailFormErrors,
//     setPasswordFormErrors,
//     setUsernameFormErrors,
//   });

//   useHandleSignIn({ isSubmit });

//   if (loading) {
//     return (
//       <div className="flex h-[100vh] w-full items-center justify-center dark:bg-[#131313]">
//         <picture>
//           <img src="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" alt="loading" />
//         </picture>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Head>
//         <title>Instagram • Sign up</title>
//         <meta name="description" content="Instagram Clone" />
//         <link rel="icon" href="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" />
//       </Head>
      
//       <div className="flex min-h-[100vh] w-full items-center justify-center bg-[#fafafa]">
//         <div>
          
//           <div className="flex max-w-[350px] flex-col items-center justify-center border border-stone-300 bg-white">
//             <div className="px-10 pb-5 text-center font-semibold text-[#8e8e8e]">
//             <div className='dazzlonesignup'> <img src="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" alt="" /></div>
//               <p>Sign up to see photos and videos from your friends.</p>
//             </div>
//             <div className="w-full px-10">
              
//               <form
//                 action=""
//                 className="signInPageFormContainer"
//                 onSubmit={(e: any) =>
//                   handleCreateUser({
//                     e,
//                     listeners,
//                     username,
//                     email,
//                     password,
//                     passwordFormErrors,
//                     emailFormErrors,
//                     usernameFormErrors,
//                     setIsSubmit,
//                     setLoading,
//                     setPasswordFormErrors,
//                   })
//                 }
//               >
//                 <label htmlFor="signInPageUserName">
//                   {' '}
//                   <input
//                     className="w-full border border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
//                     type="text"
//                     id="signInPageUserName"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     placeholder="Username"
//                   />
//                 </label>
//                 <p className="h-[30px] text-[10px] text-red-600">
//                   {usernameFormErrors}
//                 </p>
//                 <label htmlFor="signInPageEmail">
//                   {' '}
//                   <input
//                     className=" w-full border border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
//                     type="email"
//                     id="signInPageEmail"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email address"
//                   />
//                 </label>
//                 <p className="h-[20px] pb-2 text-[10px] text-red-600">
//                   {emailFormErrors}
//                 </p>
//                 <label htmlFor="signInPagePassword">
//                   {' '}
//                   <input
//                     className="w-full border border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
//                     type="password"
//                     id="signInPagePassword"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                   />
//                 </label>
//                 <p className="h-[20px] text-[10px] text-red-600">
//                   {passwordFormErrors}
//                 </p>
//                 <button
//                   className={`${
//                     emailFormErrors === '' && passwordFormErrors === ''
//                       ? 'bg-[#0095f6]'
//                       : 'pointer-events-none cursor-default bg-[#abddff]'
//                   } my-5 w-full rounded-[4px]  px-2 py-1 text-sm font-semibold text-white`}
//                   type="submit"
//                 >
//                   Sign Up
//                 </button>
//               </form>
//             </div>
//           </div>
//           <div className="mt-2 flex max-w-[350px] justify-center border border-stone-300 bg-white py-5 text-[14px]">
//             <p>Have an account?</p>
//             <button
//               className="ml-1 font-semibold text-[#0095f6]"
//               type="button"
//               onClick={() => Router.push('/Login')}
//             >
//               Log in
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
