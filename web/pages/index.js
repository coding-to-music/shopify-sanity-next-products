import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import { getClient } from "../lib/sanity";

const homepageQuery = groq`*[_type == "homepage"]{
  heroTitle
}[0]`;

function HomePage({ data }) {
  const { homepageData } = data;

  return (
    <main className="bg-gray-50">
      <div className="h-96 bg-indigo-500 flex justify-center items-center">
        <h1 className="text-white font-semibold text-6xl">
          {homepageData?.heroTitle}
        </h1>
      </div>

      <section className="container mx-auto py-12">
        <h2 className="font-semibold text-4xl mb-8">Featured Products</h2>

        <div className="grid grid-flow-row grid-cols-3 grid-rows-auto gap-8">
          <article className="text-center bg-white rounded-xl p-8 md:p-0 shadow-md pt-6 md:p-8 space-y-8">
            <Image
              src="https://images.pexels.com/photos/218763/pexels-photo-218763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              width="150"
              height="150"
              alt="A pair of slippers"
              className="rounded-full"
            />

            <p className="text-lg font-semibold text-2xl">A Pair of Slippers</p>

            <div className="font-medium">
              <Link href="/">
                <a className="bg-gray-100 text-gray-800 px-6 py-2 rounded block">
                  View Product
                </a>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default HomePage;

export async function getStaticProps() {
  const homepageData = await getClient().fetch(homepageQuery, {});

  return {
    props: {
      data: {
        homepageData,
      },
    },
  };
}