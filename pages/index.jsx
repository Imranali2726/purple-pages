import Head from "next/head";

export default function Index() {
  return (
    <div className="fixed w-screen h-screen bg-image inset-0 z-[200]">
      <Head>
        <style>
          {`
            #userwayAccessibilityIcon, header, footer{
              display:none;
            }`}
        </style>
      </Head>
      <div className="container pl-4 pr-8 sm:px-4 mx-auto flex items-center justify-center h-full">
        <div>
          <img
            src="/images/coming/logo.png"
            alt=""
            className="mx-auto max-w-[200px] md:max-w-xs"
          />
          <h1 className="text-2xl md:text-5xl lg:text-[calc(1rem_+_4vw)] font-bold text-white text-center my-6">
            Website Coming Soon....
          </h1>
          <p className="text-white text-center md:text-xl lg:text-2xl xl:text-4xl md:max-w-[75%] xl:max-w-[65%] mx-auto">
            If you live with, work with or educate people with additional needs,
            you should bookmark this site now!
          </p>
          <h2 className="text-2xl font-medium text-center mt-5 text-white">
            Follow Us
          </h2>
          <div className="bg-white py-4 px-6 rounded-full w-max mx-auto mt-4 flex items-center gap-4">
            <a
              href="https://www.instagram.com/purplepagesae/?igshid=YmMyMTA2M2Y%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/coming/insta.png" alt="" className="w-7" />
            </a>

            <a
              href="https://www.linkedin.com/company/purple-pages-ae/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/coming/ld.png" alt="" className="w-7" />
            </a>

            <a
              href="https://www.facebook.com/purplepagesae"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/coming/fb.png" alt="" className="w-7" />
            </a>

            <a
              href="https://twitter.com/purplepagesae?t=FYEz1i95mcGMJj8AEo2eFQ&s=09"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/coming/twit.png" alt="" className="w-7" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
