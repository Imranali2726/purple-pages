import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { GrClose } from "react-icons/gr";
import Link from "next/link";
import { FiUpload } from "react-icons/fi";
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import axios from "axios";
import { authOptions } from "./api/auth/[...nextauth]";

export default function MyAccount() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const image = useRef();
  const session = useSession();
  const router = useRouter();

  function handleImageUpload(e) {
    setSelectedImage(e.target.files[0]);
  }
  useEffect(() => {
    setName(session?.data?.user?.name);
  }, [session.status]);

  function handleAccountFormSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    if (selectedImage) {
      const fd = new FormData();
      fd.append("image", selectedImage);
      axios
        .get(
          `${
            process.env.NODE_ENV === "development"
              ? process.env.BASE_LOCAL_SERVER
              : process.env.BASE_UAT_SERVER
          }sanctum/csrf-cookie`,
        )
        .then(() => {
          axios({
            url: `${
              process.env.NODE_ENV === "development"
                ? process.env.BASE_URL_LOCAL
                : process.env.BASE_URL_UAT
            }user/avatar`,
            method: "post",
            data: fd,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${session?.data?.user?.token?.user_token}`,
            },
          })
            .then(() => {
              setIsLoading(false);
              router.reload();
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
            });
        });
    }
  }
  return (
    <>
      <Head>
        <title>My Account | Purple Pages</title>
      </Head>
      <section className="internal-header-bg h-auto pb-8 md:h-[300px] pt-[120px] md:pt-[94px] mt-[-65px] lg:mt-[-94px]">
        <div className="flex items-center h-full pp-container">
          <h1 className="capitalize text-2xl lg:text-4xl text-white font-bold">
            My Account
          </h1>
        </div>
      </section>
      <div className="pp-container mt-8 lg:mt-16 lg: ml-8">
        <div className="flex justify-center">
          <div>
            <div className="mb-6 max-w-[200px] mx-auto relative">
              <label htmlFor="profile_image">
                <img
                  src={
                    // eslint-disable-next-line no-nested-ternary
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : session?.data?.image?.[0]?.original_url
                      ? session?.data?.image?.[0]?.original_url
                      : "/images/image-placeholder.png"
                  }
                  alt=""
                  className="mb-4 w-[200px] aspect-square rounded-full mx-auto"
                />
                <input
                  type="file"
                  name="profile_image"
                  id="profile_image"
                  onChange={handleImageUpload}
                  ref={image}
                  className="hidden"
                />
                <div className="flex items-center gap-2 border rounded-md py-2 px-3 justify-center cursor-pointer w-max mx-auto font-semibold">
                  <FiUpload /> Upload Photo
                </div>
              </label>
              {selectedImage && (
                <button
                  type="button"
                  className="absolute shadow-[0_0_15px_rgba(0,0,0,0.2)] -top-3 right-[40px] p-2 bg-white rounded-full"
                  onClick={() => {
                    setSelectedImage(null);
                    image.current.value = null;
                  }}
                >
                  <GrClose />
                </button>
              )}
            </div>
            <form onSubmit={handleAccountFormSubmit}>
              <div className="grid grid-cols-[100px_1fr] items-center gap-6 mb-6">
                <div className="font-semibold text-xl">Name</div>
                <div>
                  <input
                    type="text"
                    value={name ?? ""}
                    // onChange={(e) => setName(e.target.value)}
                    readOnly
                    className="rounded border px-3 py-2 border-black cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-[100px_1fr] gap-6 mb-6">
                <div className="font-semibold text-xl">Email</div>
                <div>
                  <input
                    type="text"
                    value={session?.data?.user?.email ?? ""}
                    readOnly
                    className="rounded border px-3 py-2 border-black cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="md:mt-12 flex justify-center gap-4">
                <button
                  className={`bg-[#2CB579] px-12 py-2 rounded-xl text-white text-lg font-semibold ${
                    isLoading ? "opacity-70" : ""
                  }`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading... " : "Save"}
                </button>
                {session?.data?.user_type === "user" && (
                  <Link href="/post-cv">
                    <a className="bg-[#642CA9] px-12 py-2 rounded-xl text-white text-lg font-semibold">
                      Post CV
                    </a>
                  </Link>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions,
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
