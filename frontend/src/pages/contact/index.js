import LoactionMap from "@/components/common/LoactionMap";

export const metadata = {
  title: "Contact",
};

export default function contactPage() {
  return (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20">
      <div className="text-base leading-7 max-w-6xl mx-auto">
        <h1 className="text-5xl font-semibold tracking-wide ">
          <em>Contact us</em>
        </h1>
        <br />
        <LoactionMap />
        <h5 className="font-semibold tracking-wide">Lorem Ipsum</h5>
        <address>
          <b className="font-semibold">Address :</b> 1st Floor, Sita Kunj,
          Radheyshyam Lane, Old Commissioner&apos;s Compound, Ranchi-834001
        </address>
        <p>
          {" "}
          <b className="font-semibold"> Email :</b> ritik.pawar@synques.in
        </p>
        <p>
          {" "}
          <b className="font-semibold"> Phone No. :</b> +91 83051 87639
        </p>
      </div>
    </div>
  );
}
