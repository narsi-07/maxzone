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
        <title>Dazzlone</title>
        <meta name="description" content="Dazzlone" />
        <link rel="icon" href="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" />
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
            className="h-24 w-24 sm:h-auto"
            src="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png"
            alt="loading"
          />
        </picture>
      </div>
    </div>
  );
}

export default LoadingPage;
