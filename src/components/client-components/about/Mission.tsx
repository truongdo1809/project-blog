import Image from "next/image";

export default function Mission() {
  return (
    <section className="max-w-[1140px] h-full mx-auto px-4 py-5">
      <div className="flex items-center justify-center">
        <p className="font-poppins text-lg font-normal italic leading-6 inline-block max-w-[460px] text-center" style={{ color: 'var(--primary-color)' }}>
          At the Heart of Our Approach Lies Collaboration, and Support Enabling
          Us to Achieve Optimal Results for Our Clients Together.
        </p>
      </div>

      <div>
        <Image width={2000} height={2000} src={"https://i.imgur.com/HemgM5R.jpg"} alt="Mission image" className="rounded-2xl my-6" />
      </div>

      <div className="md:flex justify-around">
        <div className="mx-5 mb-5 md:mb:0">
          <h3 className="text-lg font-bold section-sub-heading text-[var(--secondary-color)]">Mission</h3>
          <p className="text-justify text-gray-600 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
        <div className="mx-5 mb-5 md:mb:0">
          <h3 className="text-lg font-bold section-sub-heading text-[var(--secondary-color)]">Vision</h3>
          <p className="text-justify text-gray-600 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
        <div className="mx-5">
          <h3 className="text-lg font-bold section-sub-heading text-[var(--secondary-color)]">Values</h3>
          <p className="text-justify text-gray-600 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
      </div>
    </section>
  );
}
