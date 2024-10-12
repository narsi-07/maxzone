import Head from 'next/head';
import Header from '../header/Header';

export default function UserDoesNotExist({
  search,
}: {
  search: string | string[] | undefined;
}) {
  return (
    <div className="h-[100vh] w-full overflow-y-scroll dark:bg-[#131313] dark:text-slate-100">
      <Head>
        <title>Profile • Free4talk photos and videos</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="https://blogger.googleusercontent.com/img/a/AVvXsEhPOBDFKLDBOkT9QWKq29HqXVdODvybjPba5bT4fVThHr5XLI8fF-LJW3tzFtQbcmvQFTx7-1DdnTWnPcWWwpxoKfFcX8L0eu_xmReoWHIk0bi5SBrbvemyOobf07DmaEB6cCQbCwrZX2tC5gTu0LGqLYUeQr1g1KLMYRhVutYu5k14FTPhK_xSujWnJ8E" />
      </Head>
      <Header page="Profile" />
      <div className="items-top flex h-full w-full justify-center">
        <p className="mt-10 text-center text-xl font-semibold">{`Sorry this user ${search} was not found.`}</p>
      </div>
    </div>
  );
}
