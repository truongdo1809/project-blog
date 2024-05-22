import Image from "next/image";

export default function Services() {
  return (
    <section className="max-w-[1140px] h-full mx-auto px-4">
      <div className="my-12">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="lg:p-5 px-10 lg:flex lg:justify-end lg:items-center">
            <Image
              height={500}
              width={600}
              className=" rounded-2xl w-full lg:w-[500px] object-cover"
              src="https://i.imgur.com/tXPVRU5.jpg"
              alt=""
            />
          </div>

          <div className="lg:p-5 px-10 lg:max-w-[570px] w-full">
            <div className="py-5">
              <h2 className="text-4xl font-bold text-[var(--secondary-color)] mb-5">
                Web Design
              </h2>
              <p className="mb-5 text-[#666] ">
                Of friendship on inhabiting diminution discovered as. Did
                friendly eat breeding building few nor. Object he barton no
                effect played valley afford. Period so to oppose we little
                seeing or branch. Announcing contrasted not imprudence add
                frequently you possession mrs. Period saw his houses.
              </p>
              <p className="mb-5 text-[#666]">
                Period so to oppose we little seeing or branch. Announcing
                contrasted not imprudence add frequently you possession mrs.
              </p>
              <h3 className="text-2xl font-semibold mb-5 text-[var(--secondary-color)]">From $150</h3>
              <button
                className="px-8 py-3 rounded   border border-[var(--secondary-color)]   hover:bg-[var(--primary-color)] hover:text-white"
              >
               Start a Project
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row justify-center items-center">
          <div className="lg:p-5 px-10 lg:max-w-[550px] w-full">
            <div className=" ">
              <h2 className="text-4xl font-bold text-[var(--secondary-color)] mb-5">
                Graphic Design
              </h2>
              <p className="mb-5 text-[#666]">
                Of friendship on inhabiting diminution discovered as. Did
                friendly eat breeding building few nor. Object he barton no
                effect played valley afford. Period so to oppose we little
                seeing or branch. Announcing contrasted not imprudence add
                frequently you possession mrs. Period saw his houses.
              </p>
              <p className="mb-5 text-[#666]">
                Period so to oppose we little seeing or branch. Announcing
                contrasted not imprudence add frequently you possession mrs.
              </p>
              <div className="text-2xl font-semibold mb-5 text-[var(--secondary-color)]">From $250</div>
              <button
                className="px-8 py-3 rounded   border border-[var(--secondary-color)]   hover:bg-[var(--primary-color)] hover:text-white "
              >
                Start a Project
              </button>
            </div>
          </div>
          <div className="lg:p-5 px-10 lg:flex lg:justify-start lg:items-center w-full lg:w-auto mt-8 lg:mb-0 lg:mt-0 mb-6">
            <Image
              height={500}
              width={600}
              className=" rounded-2xl w-full lg:w-[500px] object-cover"
              src="https://i.imgur.com/A6JV1gT.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-12 lg:mt-0">
          <div className="lg:p-5 px-10 lg:flex lg:justify-end lg:items-center ">
            <Image
              height={500}
              width={600}
              className=" rounded-2xl w-full lg:w-[500px] object-cover"
              src="https://i.imgur.com/rSov3zZ.jpg"
              alt=""
            />
          </div>

          <div className="lg:p-5 px-10 lg:max-w-[570px] w-full">
            <div className=" py-5">
              <h1 className=" text-3xl font-bold text-[var(--secondary-color)] mb-5">
                Content Creation
              </h1>
              <p className="mb-5 text-[#666] ">
                Of friendship on inhabiting diminution discovered as. Did
                friendly eat breeding building few nor. Object he barton no
                effect played valley afford. Period so to oppose we little
                seeing or branch. Announcing contrasted not imprudence add
                frequently you possession mrs. Period saw his houses.
              </p>
              <p className="mb-5 text-[#666]">
                Period so to oppose we little seeing or branch. Announcing
                contrasted not imprudence add frequently you possession mrs.
              </p>
              <div className="text-2xl font-semibold mb-5 text-[var(--secondary-color)]">From $350</div>
              <button
                className="px-8 py-3 rounded  border border-[var(--secondary-color)]   hover:bg-[var(--primary-color)] hover:text-white "
              >
                Start a Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
