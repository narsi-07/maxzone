import React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { useAtom } from 'jotai';
import { NextPage } from 'next';
import useSetFormErrors from '../hooks/useSetFormErrors';
import atoms from '../util/atoms';
import useHandleSignIn from '../hooks/useHandleSignIn';
import handleSignIn from '../util/handleSignIn';


const Login: NextPage = () => {
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
    setPasswordFormErrors,
    setUsernameFormErrors,
  });

  useHandleSignIn({ isSubmit });

  return (
    <div className='kjhkjhk' style={{ backgroundColor: 'black' }}>
   <Head>
    <title>Free4Talk - Chat with Strangers Worldwide | Free4talk.xyz</title>
    <meta name="description" content="Free4Talk is the best platform to chat with strangers around the world. Connect instantly, share experiences, and make new friends on free4talk.xyz." />
    <meta name="keywords" content="Free4talk, chat with strangers, online chat, random video calling, connect with people worldwide" />
    <meta name="author" content="Narsi Jangid" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta property="og:title" content="Free4Talk - Connect & Chat with Strangers Worldwide" />
    <meta property="og:description" content="Join Free4Talk to chat and make friends with strangers worldwide. Instant connections and real-time conversations." />
    <meta property="og:url" content="https://free4talk.xyz" />
    <meta property="og:image" content="https://blogger.googleusercontent.com/img/a/AVvXsEhPOBDFKLDBOkT9QWKq29HqXVdODvybjPba5bT4fVThHr5XLI8fF-LJW3tzFtQbcmvQFTx7-1DdnTWnPcWWwpxoKfFcX8L0eu_xmReoWHIk0bi5SBrbvemyOobf07DmaEB6cCQbCwrZX2tC5gTu0LGqLYUeQr1g1KLMYRhVutYu5k14FTPhK_xSujWnJ8E" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Free4Talk" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Free4Talk - Chat with Strangers Worldwide" />
    <meta name="twitter:description" content="Chat with strangers around the globe on Free4Talk. Instant, free, and anonymous conversations." />
    <meta name="twitter:image" content="https://blogger.googleusercontent.com/img/a/AVvXsEhPOBDFKLDBOkT9QWKq29HqXVdODvybjPba5bT4fVThHr5XLI8fF-LJW3tzFtQbcmvQFTx7-1DdnTWnPcWWwpxoKfFcX8L0eu_xmReoWHIk0bi5SBrbvemyOobf07DmaEB6cCQbCwrZX2tC5gTu0LGqLYUeQr1g1KLMYRhVutYu5k14FTPhK_xSujWnJ8E" />
    <link rel="icon" href="https://blogger.googleusercontent.com/img/a/AVvXsEhPOBDFKLDBOkT9QWKq29HqXVdODvybjPba5bT4fVThHr5XLI8fF-LJW3tzFtQbcmvQFTx7-1DdnTWnPcWWwpxoKfFcX8L0eu_xmReoWHIk0bi5SBrbvemyOobf07DmaEB6cCQbCwrZX2tC5gTu0LGqLYUeQr1g1KLMYRhVutYu5k14FTPhK_xSujWnJ8E" />
</Head>

      <div >
      <div style={{ backgroundColor: 'black' }} className="jbjhj flex  w-full items-center justify-center ">
     
        <div>
          
          <div className="jghjhgj flex  flex-col items-center justify-center border border-stone-300 bg-white">
            <div className="h-auto w-[175px] py-10">
            <h1 className='ikjhfyhi'>Free4<span className='kjgsdjh'>Talk</span></h1>
            <p className='poweredbydazzlone'>powered by - Dazzlone</p>
            </div>
            <div className="w-full px-5 sm:px-10">
              <form
                action=""
                className="signInPageFormContainer"
                onSubmit={(e: any) =>
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
                }
              >
              
                <label htmlFor="signInPageEmail">
                  {' '}
                  <input
                    className=" gkhljkji w-full border border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="email"
                    id="signInPageEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                  />
                </label>
                <p className="kjgkhkj h-[20px] max-w-[220px] pb-2 text-[10px] text-red-600">
                  {emailFormErrors}
                </p>
                <label htmlFor="signInPagePassword">
                  {' '}
                  <input
                    className="gkhljkji w-full border border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    
                    type="password"
                    id="signInPagePassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </label>
                <p className="kjgkhkj h-[20px] max-w-[220px] text-[10px] text-red-600">
                  {passwordFormErrors}
                </p>
                <button
                  className={`${
                    emailFormErrors === '' && passwordFormErrors === ''
                      ? 'jcvhgfhg'
                      : 'jhvghjg pointer-events-none cursor-default bg-[#abddff]'
                  } kghj my-5   px-2 py-1 text-sm font-semibold `}
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
                  className="kghj jcvhgfhg mb-10 w-full rounded-[4px] bg-[#0095f6] px-2 py-1 text-sm font-semibold text-white"
                  type="button"
                  onClick={(e: any) =>
                    handleSignIn({
                      e,
                      listeners,
                      passwordFormErrors,
                      emailFormErrors,
                      email,
                      password,
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
          <div className="jhguytuv mt-2 flex justify-center border border-stone-300 bg-white py-5 text-[14px]">
            <p>Do not have an account?</p>
            <button
              className="ml-1 font-semibold text-[Orange]"
              type="button"
              onClick={() => Router.push('/SignUp')}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};


export default Login;