import React, { useEffect } from "react";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

const Home = () => {
  const widthAndHeight = 60;
  const router = useRouter();
  const login = () => {
    router.push(process.env.NEXT_PUBLIC_DISCORD_LOGIN_URL as string);
  };

  if (getCookie("_discord_token") !== undefined) {
    useEffect(() => {
      router.push(process.env.NEXT_PUBLIC_ALREADY_AUTHENTICATED_URL as string);
    }, []);
  } else {
    return (
      <div>
        <div className="h-screen w-screen loginBackground">
          <div className="loginLayer">
            <div className="fixed px-20 py-5">
              <Image
                src={"/logo.svg"}
                alt={"Logo"}
                width={widthAndHeight}
                height={widthAndHeight}
                className={"px-1"}
              />
            </div>
            <div className="w-screen center h-screen">
              <div className="items-center justify-center box max-w-md">
                <div className="bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded">
                  <div className="p-10 text-center">
                    <div id="Title" className="text-4xl font-bold mb-10">
                      Discord Verify
                    </div>
                    To Verify in the discord, please log in with your account.
                    <br />
                    {/* Add a button with discord logo in it */}
                    <div className="flex justify-center">
                      <button
                        className="flex items-center justify-center w-60 h-12 mt-10 rounded-md bg-discordBlue"
                        onClick={login}
                      >
                        <FaDiscord className="mr-2" size={28} />
                        <span>Log in with Discord</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
