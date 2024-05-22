export default function Banner({ content = "" }) {
  return (
    <section className="relative bg-[url('https://demosites.royal-elementor-addons.com/nature-v2/wp-content/uploads/sites/89/2023/08/pic-1.jpg')] py-40 bg-no-repeat bg-cover overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
      <div className="max-w-[1140px] h-full mx-auto px-4 flex items-center justify-center">
        <h2 className="text-white text-7xl font-extrabold p-0 m-0 z-20">
          {content}
        </h2>
      </div>
    </section>
  );
}
