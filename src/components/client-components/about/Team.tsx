import Image from "next/image";

export default function Team() {
  return (
    <section className="max-w-[1140px] h-full mx-auto px-4">
      <h2 className=" text-4xl font-bold text-[var(--secondary-color)] text-center mb-10">
        Professional Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="rounded-lg mb-10 flex justify-center">
          <div className="justify-items-center max-w-sm">
            <Image
              className=" rounded-lg border border-solid border-[var(--secondary-color)] shadow"
              width={1000}
              height={1000}
              src="https://i.imgur.com/N4QmkQp.jpg"
              alt="Emily Shelton"
            />
            <h3 className="text-xl font-medium text-[var(--secondary-color)] text-center mt-5 mb-1">
              Emily Shelton
            </h3>
            <div className=" text-sm text-gray-400 text-center">Sony CEO</div>
          </div>
        </div>
        <div className="rounded-lg mb-10 flex justify-center">
          <div className="justify-items-center max-w-sm">
            <Image
              className=" rounded-lg border border-solid border-[var(--secondary-color)] shadow"
              width={1000}
              height={1000}
              src="https://i.imgur.com/q1B5rXw.jpg"
              alt="Robbie Alexander"
            />
            <h3 className="text-xl font-medium text-[var(--secondary-color)] text-center mt-5 mb-1">
              Robbie Alexander
            </h3>
            <div className=" text-sm text-gray-400 text-center">Sony CEO</div>
          </div>
        </div>
        <div className="rounded-lg mb-10 flex justify-center">
          <div className="justify-items-center max-w-sm">
            <Image
              className=" rounded-lg border border-solid border-[var(--secondary-color)] shadow"
              width={1000}
              height={1000}
              src="https://i.imgur.com/pIRCnUF.jpg"
              alt="Liliana Hahn"
            />
            <h3 className="text-xl font-medium text-[var(--secondary-color)] text-center mt-5 mb-1">
              Liliana Hahn
            </h3>
            <div className=" text-sm text-gray-400 text-center">Sony CEO</div>
          </div>
        </div>
        <div className="rounded-lg mb-10 flex justify-center">
          <div className="justify-items-center max-w-sm">
            <Image
              className=" rounded-lg border border-solid border-[var(--secondary-color)] shadow"
              width={1000}
              height={1000}
              src="https://i.imgur.com/WKVDtVE.jpg"
              alt="Aaliyah Odling"
            />
            <h3 className="text-xl font-medium text-[var(--secondary-color)] text-center mt-5 mb-1">
              Aaliyah Odling
            </h3>
            <div className=" text-sm text-gray-400 text-center">Sony CEO</div>
          </div>
        </div>
      </div>
    </section>
  );
}
