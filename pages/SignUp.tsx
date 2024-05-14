
import React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { useAtom } from 'jotai';
import { NextPage } from 'next';
import atoms from '../util/atoms';
import useHandleSignIn from '../hooks/useHandleSignIn';
import useSetFormErrors from '../hooks/useSetFormErrors';
import handleCreateUser from '../util/handleCreateUser';
import InstagramSVG from '../components/svgComps/InstagramSVG';

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
    setPasswordFormErrors,
    setUsernameFormErrors,
  });

  useHandleSignIn({ isSubmit });

  if (loading) {
    return (
      <div className="flex h-[100vh] w-full items-center justify-center dark:bg-[#131313]">
        <picture>
          <img src="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" alt="loading" />
        </picture>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Dazzlone • Sign up</title>
        <meta name="description" content="Dazzlone" />
        <meta name="description" content="Dazzlone is the ultimate social networking platform where you can connect with friends, share photos, videos, and stay connected with your loved ones. Join our online community and discover new people while interacting with others in a vibrant and engaging environment."/>
<meta name="keywords" content="Social networking platform,c Dazzlone app, Connect with friends, Share photos and videos, Social media network, Stay connected, Online community, Discover new people,Video call with strangers, Chat with new people, Random video calls, Connect with strangers"/>
<meta name="author" content="Narsi jangid"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

        <link rel="icon" href="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" />
      </Head>
      <div className="jbjhj flex min-h-[100vh] w-full items-center justify-center bg-[#fafafa]">
        <div>
          <div className="jghjhgj flex  flex-col items-center justify-center border border-stone-300 bg-white">
            <div className="h-auto w-[175px] pt-10 pb-5">
              <InstagramSVG  />
            </div>
            <div className="px-10 pb-5 text-center font-semibold text-[#8e8e8e]">
              <p>Sign up to see photos and videos from your friends.</p>
            </div>
            <div className="w-full px-10">
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
                    className="kguiyrfyu w-full border border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="text"
                    id="signInPageUserName"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                </label>
                <p className="h-[30px] text-[10px] text-red-600">
                  {usernameFormErrors}
                </p>
                <label htmlFor="signInPageEmail">
                  {' '}
                  <input
                    className="kguiyrfyu w-full border border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
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
                    className="kguiyrfyu w-full border border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
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
                  className={`kghjjkhk ${
                    emailFormErrors === '' && passwordFormErrors === ''
                      ? 'jcvhgfhg'
                      : 'jhvghjg pointer-events-none cursor-default'
                  } my-5 w-full rounded-[4px]  px-2 py-1 text-sm font-semibold text-white`}
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
          <div className="jhguytuv mt-2 flex  justify-center border border-stone-300 bg-white py-5 text-[14px]">
            <p>Have an account?</p>
            <button
              className="ml-1 font-semibold text-[Orange]"
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
