import Image from "next/image";
import Link from "next/link";

export default function Logo () {
    return (
        <Link href="/" className="inline-block">
            <div className="flex items-center justify-between">
              <Image
                width={80}
                height={80}
                className="border border-solid bg-white block w-20 h-20 rounded-full mr-3"
                src="https://i.imgur.com/Z7R1oAm.png"
                alt="Logo"
              />
              <div>
                <h1 className="tracking-wider font-semibold text-2xl text-white">
                  Japan Travel
                </h1>
                <p className="text-gray-400">The Best Experiences</p>
              </div>
            </div>
        </Link>
    )
}