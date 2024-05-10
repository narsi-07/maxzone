import React, { useEffect } from 'react';
import Router from 'next/router';
import Image from 'next/future/image';
import Head from 'next/head';
import { useAtom } from 'jotai';
import { NextPage } from 'next';
import useSetFormErrors from '../hooks/useSetFormErrors';
import atoms from '../util/atoms';
import useHandleSignIn from '../hooks/useHandleSignIn';
import handleSignIn from '../util/handleSignIn';
import guestAccess from '../util/guestAccess';



const Login: NextPage = () => {
const guestEmail = guestAccess().email;
const guestPassword = guestAccess().password
  const [listeners] = useAtom(atoms.listeners);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailFormErrors, setEmailFormErrors] = React.useState('');
  const [passwordFormErrors, setPasswordFormErrors] = React.useState('');
  const [, setUsernameFormErrors] = React.useState('');
  const [isSubmit, setIsSubmit] = React.useState(false);



  useSetFormErrors({
    email,
    password,
    setEmailFormErrors,
    // setPasswordFormErrors,  for strong password
    setUsernameFormErrors,
  });


  // this kal ka rerror h 
  useHandleSignIn({ isSubmit });
 useEffect(()=>{
  setPasswordFormErrors("")
 },[passwordFormErrors])



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
        <title>ShareTrendy • Login</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" />
      </Head>
      <div className="flex min-h-[100vh] w-full items-center justify-center rgb(255 255 255 / var(--tw-bg-opacity));">
        <div>
          <div className="relative hidden h-[590px] overflow-hidden lg:block">
            <Image
              priority
              src="/loginFrame.png"
              alt="instagram"
              height={635}
              width={465}
            />
            <picture>
              <img src="/loginFrame.png" alt="instagram" />
            </picture>
            <div className="absolute top-[26px] right-14 h-full w-full">
              <div className="relative ">
                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage1 opacity-0">
                  <Image
                    priority
                    src="/loginImg1.png"
                    alt="instagram"
                    width={250}
                    height={541}
                  />
                </div>
                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage2 opacity-0">
                  <Image
                    src="/loginImg2.png"
                    alt="instagram"
                    width={250}
                    height={541}
                  />
                </div>
                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage3 opacity-0">
                  <Image
                    src="/loginImg3.png"
                    alt="instagram"
                    width={250}
                    height={541}
                  />
                </div>

                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage4 opacity-0">
                  <Image
                     priority
                     src="/loginImg1.png"
                     alt="instagram"
                     width={250}
                     height={541}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex mobi max-w-[350px] flex-col items-center justify-center bg-white-loginpage">
            <div className="w-full px-5 sm:px-10">
             <div id='mobilogo' className='dazzlonelogin'> <img src="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" alt="" /></div>
              <form
                action=""
                className="signInPageFormContainer"
                onSubmit={(e:any)=>{
                  handleSignIn({
                    e,
                    listeners,
                    passwordFormErrors,
                    emailFormErrors,
                    email,
                    password,
                    guest: false,
                    setIsSubmit,
                    setPasswordFormErrors,
                  })
                }}
                
              >
                <label htmlFor="signInPageEmail">
                  {' '}
                  <input
                    className=" userenter w-full mobipass border rounded-[6px] border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="email"
                    id="signInPageEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}                  
                    placeholder="Email address"
                  />
                   
                </label>
                <p className="bts h-[20px] max-w-[220px] pb-2 text-[10px] text-red-600">
                {emailFormErrors}
                </p>
                <label htmlFor="signInPagePassword">
                  {' '}
                  <input
                    className=" password w-full border mobipass rounded-[6px] border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="password"
                    id="signInPagePassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </label>
               
                <p className="h-[20px] max-w-[220px] text-[10px] text-red-600">
               {passwordFormErrors}
                </p>
                <button
                  className={`${
                    emailFormErrors === ''
                      ? 'bg-[#000]'
                      : 'pointer-events-none cursor-default bg-[#4f524f]'
                  } buttonsound clay-btn my-0 mobilogin w-full rounded-[4px]  px-2 py-1 text-sm font-semibold text-white userenter `}
                  type="submit"
                >
                  Log In
                </button>
                <div className="mb-5 flex h-0 items-center justify-center">
                  <div className="w-full border-b border-stone-300" />
                  <p className="mx-2 text-sm font-semibold text-[#6d6d6d]">
                    OR
                  </p>
                  <div className="w-full border-b border-stone-300" />
                </div>
                <button
                  className=" buttonsound userenter mb-10 mobiguest w-full rounded-[4px] bg-[#0bafb5] px-2 py-1 text-sm font-semibold text-white"
                  type="button"
                  onClick={(e: any) =>
                    handleSignIn({
                      e,
                      listeners,
                      passwordFormErrors,
                      emailFormErrors,
                      email:guestEmail,
                      password:guestPassword,
                      guest: true,
                      setIsSubmit,
                      setPasswordFormErrors,
                    })
                  }
                >
                  Guest Account
                </button>
              </form>
            </div>
          </div>
          <div className="mt-4 flex max-w-[350px] justify-center  bg-white-loginpage2 py-5 text-[14px]">
            <p>Do not have an account?</p>
            <button
              className=" buttonsound ml-1 font-semibold text-[#000]"
              type="button"
              onClick={() => Router.push('/SignUp')}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;



































// import React from 'react';
// import Router from 'next/router';
// import Image from 'next/future/image';
// import Head from 'next/head';
// import { useAtom } from 'jotai';
// import { NextPage } from 'next';
// import useSetFormErrors from '../hooks/useSetFormErrors';
// import atoms from '../util/atoms';
// import useHandleSignIn from '../hooks/useHandleSignIn';
// import handleSignIn from '../util/handleSignIn';
// import guestAccess from '../util/guestAccess';

// const Login: NextPage = () => {
// const guestEmail = guestAccess().email;
// const guestPassword = guestAccess().password
//   const [listeners] = useAtom(atoms.listeners);
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [emailFormErrors, setEmailFormErrors] = React.useState('');
//   const [passwordFormErrors, setPasswordFormErrors] = React.useState('');
//   const [, setUsernameFormErrors] = React.useState('');
//   const [isSubmit, setIsSubmit] = React.useState(false);

//   useSetFormErrors({
//     email,
//     password,
//     setEmailFormErrors,
//     // setPasswordFormErrors,  for strong password
//     setUsernameFormErrors,
//   });

//   useHandleSignIn({ isSubmit });

//   return (
//     <div>
//       <Head>
//         <title>ShareTrendy • Login</title>
//         <meta name="description" content="Instagram Clone" />
//         <link rel="icon" href="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" />
//       </Head>
//       <div className="flex min-h-[100vh] w-full items-center justify-center rgb(255 255 255 / var(--tw-bg-opacity));">
//         <div>
//           <div className="relative hidden h-[590px] overflow-hidden lg:block">
//             <Image
//               priority
//               src="/loginFrame.png"
//               alt="instagram"
//               height={635}
//               width={465}
//             />
//             <picture>
//               <img src="/loginFrame.png" alt="instagram" />
//             </picture>
//             <div className="absolute top-[26px] right-14 h-full w-full">
//               <div className="relative ">
//                 <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage1 opacity-0">
//                   <Image
//                     priority
//                     src="/loginImg1.png"
//                     alt="instagram"
//                     width={250}
//                     height={541}
//                   />
//                 </div>
//                 <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage2 opacity-0">
//                   <Image
//                     src="/loginImg2.png"
//                     alt="instagram"
//                     width={250}
//                     height={541}
//                   />
//                 </div>
//                 <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage3 opacity-0">
//                   <Image
//                     src="/loginImg3.png"
//                     alt="instagram"
//                     width={250}
//                     height={541}
//                   />
//                 </div>

//                 <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage4 opacity-0">
//                   <Image
//                      priority
//                      src="/loginImg1.png"
//                      alt="instagram"
//                      width={250}
//                      height={541}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div>
//           <div className="flex mobi max-w-[350px] flex-col items-center justify-center bg-white">
//             <div className="w-full px-5 sm:px-10">
//              <div id='mobilogo' className='dazzlonelogin'> <img src="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" alt="" /></div>
//               <form
//                 action=""
//                 className="signInPageFormContainer"
//                 onSubmit={(e: any) =>
//                   handleSignIn({
//                     e,
//                     listeners,
//                     passwordFormErrors,
//                     emailFormErrors,
//                     email,
//                     password,
//                     guest: false,
//                     setIsSubmit,
//                     setPasswordFormErrors,
//                   })
//                 }
//               >
//                 <label htmlFor="signInPageEmail">
//                   {' '}
//                   <input
//                     className=" w-full mobipass border rounded-[6px] border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
//                     type="email"
//                     id="signInPageEmail"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email address"
//                   />
//                 </label>
//                 <p className="bts h-[20px] max-w-[220px] pb-2 text-[10px] text-red-600">
//                   {emailFormErrors}
//                 </p>
//                 <label htmlFor="signInPagePassword">
//                   {' '}
//                   <input
//                     className="w-full border mobipass rounded-[6px] border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
//                     type="password"
//                     id="signInPagePassword"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                   />
//                 </label>
//                 <p className="h-[20px] max-w-[220px] text-[10px] text-red-600">
//                   {passwordFormErrors}
//                 </p>
//                 <button
//                   className={`${
//                     emailFormErrors === '' && passwordFormErrors === ''
//                       ? 'bg-[#02ab05]'
//                       : 'pointer-events-none cursor-default bg-[#94d49b]'
//                   } my-5 mobilogin w-full rounded-[4px]  px-2 py-1 text-sm font-semibold text-white`}
//                   type="submit"
//                 >
//                   Log In
//                 </button>
//                 <div className="mb-5 flex h-0 items-center justify-center">
//                   <div className="w-full border-b border-stone-300" />
//                   <p className="mx-2 text-sm font-semibold text-[#6d6d6d]">
//                     OR
//                   </p>
//                   <div className="w-full border-b border-stone-300" />
//                 </div>
//                 <button
//                   className="mb-10 mobiguest w-full rounded-[4px] bg-[#02ab05] px-2 py-1 text-sm font-semibold text-white"
//                   type="button"
//                   onClick={(e: any) =>
//                     handleSignIn({
//                       e,
//                       listeners,
//                       passwordFormErrors,
//                       emailFormErrors,
//                       email:guestEmail,
//                       password:guestPassword,
//                       guest: true,
//                       setIsSubmit,
//                       setPasswordFormErrors,
//                     })
//                   }
//                 >
//                   Guest Account
//                 </button>
//               </form>
//             </div>
//           </div>
//           <div className="mt-2 flex max-w-[350px] justify-center  bg-white py-5 text-[14px]">
//             <p>Do not have an account?</p>
//             <button
//               className="ml-1 font-semibold text-[#02ab05]"
//               type="button"
//               onClick={() => Router.push('/SignUp')}
//             >
//               Sign up
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


