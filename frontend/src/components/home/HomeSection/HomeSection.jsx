"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <div
        className="py-20 bg-cover bg-no-repeat bg-fixed"
        style={{
          backgroundImage:
            "url(https://static.nike.com/a/images/f_auto/dpr_0.9,cs_srgb/w_1403,c_limit/83deea9e-36a4-499c-b3d2-b34d164c3d1e/nike-just-do-it.jpg)",
        }}
      >
        <div className="container m-auto text-center px-6 opacity-100">
          <h2 className="text-4xl font-bold mb-2 text-white">RACE AHEAD</h2>
          <h3 className="text-2xl mb-8 text-gray-200">
            The lightweight carbon-fiber plate combined with a ZoomX foam
            midsole is designed for speed.
          </h3>
          <button
            className="
          bg-white
          font-bold
          rounded-full
          py-4
          px-8
          shadow-lg
          uppercase
          tracking-wider
          hover:border-transparent hover:text-white hover:bg-gray-800
          transition-all
        "
          >
            Shop
          </button>
        </div>
      </div>

      <section className="container mx-auto px-6 p-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Artoo!
        </h2>
        <div className="flex items-center flex-wrap mb-20">
          <div className="w-full md:w-1/2 pr-10">
            <h4 className="text-3xl text-gray-800 font-bold mb-3">Vortex</h4>
            <p className="text-gray-600 mb-8">
              Their primary target will be the power generators. Prepare to open
              the shield. Sir, Rebel ships are coming into our sector. Good. Our
              first catch of the day. Stand by, ion control....Fire! The first
              transport is away.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <Image
            width={500}
            height={600}
              className="rounded-none"
              src="https://static.nike.com/a/images/f_auto/dpr_0.9,cs_srgb/w_1403,c_limit/43c74017-7bcd-4111-83b4-df8fd847584e/men-s-shoes-clothing-accessories.jpg"
              alt="Vortex"
            />
          </div>
        </div>
        <div className="flex items-center flex-wrap mb-20">
          <div className="w-full md:w-1/2">
            <Image
            width={500}
            height={600}
              className="rounded-none"
              src="https://images.unsplash.com/photo-1590333748338-d629e4564ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=949&q=80"
              alt="use the force"
            />
          </div>
          <div className="w-full md:w-1/2 pl-10">
            <h4 className="text-3xl text-gray-800 font-bold mb-3">
              Use the Force!
            </h4>
            <p className="text-gray-600 mb-8">
              We&apos;ll never get it out now. So certain are you. Always with
              you it cannot be done. Hear you nothing that I say? Master, moving
              stones around is one thing. This is totally different. No! No
              different!
            </p>
          </div>
        </div>
        <div className="flex items-center flex-wrap mb-20">
          <div className="w-full md:w-1/2 pr-10">
            <h4 className="text-3xl text-gray-800 font-bold mb-3">
              Life creates it
            </h4>
            <p className="text-gray-600 mb-8">
              There is no try. I can&apos;t. It&apos;s too big. Size matters
              not. Look at me. Judge me by my size, do you? Hm? Mmmm. And well
              you should not. For my ally in the Force. And a powerful ally it
              is.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <Image
            width={500}
            height={600}
              className="rounded-none"
              src="https://images.unsplash.com/photo-1502886705388-d9f78783cc5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw5MjI3NjR8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              alt="Syncing"
            />
          </div>
        </div>
      </section>
    </>
  );
}
