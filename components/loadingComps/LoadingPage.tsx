import Head from 'next/head';
import Header from '../header/Header';


function LoadingPage({ checkingUserRoute }: { checkingUserRoute: boolean }) {
  return (
    <div
      className={`${
        checkingUserRoute
          ? 'flex-col justify-start overflow-y-scroll'
          : 'items-center justify-center'
      } flex h-screen w-full dark:bg-[#131313]  dark:[color-scheme:dark]`}
    >
      <Head>
        <title>Free4Talk</title>
        <meta name="description" content="Free4talk" />
        <link rel="icon" href="https://blogger.googleusercontent.com/img/a/AVvXsEhPOBDFKLDBOkT9QWKq29HqXVdODvybjPba5bT4fVThHr5XLI8fF-LJW3tzFtQbcmvQFTx7-1DdnTWnPcWWwpxoKfFcX8L0eu_xmReoWHIk0bi5SBrbvemyOobf07DmaEB6cCQbCwrZX2tC5gTu0LGqLYUeQr1g1KLMYRhVutYu5k14FTPhK_xSujWnJ8E" />
      </Head>
      {checkingUserRoute ? <Header page="Profile" /> : ''}
      <div
        className={
          checkingUserRoute
            ? 'flex h-full w-full items-center justify-center dark:bg-[#131313]'
            : ''
        }
      >

                    {/* LOADING IMAGE */}

          <picture>
          <img
            className="h-0 w-0 opacity-0"
            src="https://blogger.googleusercontent.com/img/a/AVvXsEhPOBDFKLDBOkT9QWKq29HqXVdODvybjPba5bT4fVThHr5XLI8fF-LJW3tzFtQbcmvQFTx7-1DdnTWnPcWWwpxoKfFcX8L0eu_xmReoWHIk0bi5SBrbvemyOobf07DmaEB6cCQbCwrZX2tC5gTu0LGqLYUeQr1g1KLMYRhVutYu5k14FTPhK_xSujWnJ8E"
            alt="avatar"
          />
        </picture>
      </div>
    </div>
  );
}

export default LoadingPage;
