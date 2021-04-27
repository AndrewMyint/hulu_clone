import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Result from "../components/Result";
import requests from "../utils/request";

export default function Home({results}) {
  return (
    <div>
      <Head>
        <title>Hulu Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Nav />
      <Result results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;
  const url = `https://api.themoviedb.org/3${
    requests[genre]?.url || requests.fetchTrending.url
  }`;
  const request = await fetch(url)
    .then((res) => {
      if (res.status !== 200) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      results: request.results
    },
  };
}
