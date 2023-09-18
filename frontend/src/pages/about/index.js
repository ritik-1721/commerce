import { NextSeo } from "next-seo";

export default function AboutPage() {
  return (
    <>
      <NextSeo
        title="About"
        description="Next SEO packages simplifies the SEO management in Next Apps with less configurations"
        canonical="www.example.com/next-seo-blog"
        openGraph={{
          type: "article",
          article: {
            publishedTime: "2022-06-21T23:04:13Z",
            modifiedTime: "2022-01-21T18:04:43Z",
            authors: [
              "https://www.example.com/authors/@firstnameA-lastnameA",
              "https://www.example.com/authors/@firstnameB-lastnameB",
            ],
            tags: ["Tag A", "Tag B", "Tag C"],
          },
          url: "www.example.com/next-seo-blog",
          images: {
            url: "https://www.test.ie/images/cover.jpg",
            width: 850,
            height: 650,
            alt: "Photo of text",
          },
          site_name: "Next Blog",
        }}
      />
      <div className="max-w-2xl mx-8 sm:mx-auto py-20">
        <div className="text-base leading-7 max-w-6xl mx-auto">
          <h1 className="text-5xl font-semibold tracking-wide  mb-4 mt-8 ">
            <em>About Us</em>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent
            elementum facilisis leo vel fringilla est ullamcorper eget. At
            imperdiet dui accumsan sit amet nulla facilisi morbi tempus.
            Praesent elementum facilisis leo vel fringilla. Congue mauris
            rhoncus aenean vel. Egestas sed tempus urna et pharetra pharetra
            massa massa ultricies.
          </p>
          <p>
            Venenatis cras sed felis eget velit. Consectetur libero id faucibus
            nisl tincidunt. Gravida in fermentum et sollicitudin ac orci
            phasellus egestas tellus. Volutpat consequat mauris nunc congue nisi
            vitae. Id aliquet risus feugiat in ante metus dictum at tempor. Sed
            blandit libero volutpat sed cras. Sed odio morbi quis commodo odio
            aenean sed adipiscing. Velit euismod in pellentesque massa placerat.
            Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi
            lacus sed viverra tellus in. Nibh cras pulvinar mattis nunc sed.
            Luctus accumsan tortor posuere ac ut consequat semper viverra.
            Fringilla ut morbi tincidunt augue interdum velit euismod.
          </p>
          <h2 className="text-4xl font-semibold tracking-wide mb-4 mt-8">
            Lorem Ipsum
          </h2>
          <p>
            Tristique senectus et netus et malesuada fames ac turpis. Ridiculus
            mus mauris vitae ultricies leo integer malesuada nunc vel. In mollis
            nunc sed id semper. Egestas tellus rutrum tellus pellentesque.
            Phasellus vestibulum lorem sed risus ultricies tristique nulla. Quis
            blandit turpis cursus in hac habitasse platea dictumst quisque. Eros
            donec ac odio tempor orci dapibus ultrices. Aliquam sem et tortor
            consequat id porta nibh. Adipiscing elit duis tristique sollicitudin
            nibh sit amet commodo nulla. Diam vulputate ut pharetra sit amet. Ut
            tellus elementum sagittis vitae et leo. Arcu non odio euismod
            lacinia at quis risus sed vulputate.
          </p>
        </div>
      </div>
    </>
  );
}
