import Link from "next/link";
import Image from "next/image";
import { Chat } from "~/types/chat";

const chatData: Chat[] = [
  {
    avatar: "https://i.imgur.com/HJL8vfD.png",
    name: "Devid Heilo",
    text: "How are you?",
    time: 12,
    textCount: 3,
    dot: 3,
  },
  {
    avatar: "https://i.imgur.com/fqlvqxQ.png",
    name: "Henry Fisher",
    text: "Waiting for you!",
    time: 12,
    textCount: 0,
    dot: 1,
  },
  {
    avatar: "https://i.imgur.com/vtoImuO.png",
    name: "Jhon Doe",
    text: "What's up?",
    time: 32,
    textCount: 0,
    dot: 3,
  },
  {
    avatar: "https://i.imgur.com/whZoMkO.png",
    name: "Jane Doe",
    text: "Great",
    time: 32,
    textCount: 2,
    dot: 6,
  },
  {
    avatar: "https://i.imgur.com/pSlCniT.png",
    name: "Jhon Doe",
    text: "How are you?",
    time: 32,
    textCount: 0,
    dot: 3,
  },
  {
    avatar: "https://i.imgur.com/TzbqDPK.png",
    name: "Jhon Doe",
    text: "How are you?",
    time: 32,
    textCount: 3,
    dot: 6,
  },
];

const ChatCard = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white pt-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4 dark:text-white h-full">
      <div className="flex justify-between items-center text-black dark:text-white border-b border-stroke dark:border-strokedark px-7.5 pb-6">
        <h4 className="text-xl font-semibold">
          Chats
        </h4>
        <Link
          href="#"
          className="dark:text-white hover:text-[var(--primary-color)] dark:hover:hover:text-[var(--primary-color)]"
        >
          View more
        </Link>
      </div>
      <div>
        {chatData.map((chat, key) => (
          <Link
            href="/admin"
            className="flex items-center gap-5 px-7.5 py-3 hover:bg-slate-300 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              <Image
                width={56}
                height={56}
                src={chat.avatar}
                alt="User"
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
              <span
                className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                  chat.dot === 3 ? "bg-meta-3" : "bg-meta-4"
                }`}
              ></span>
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {chat.name}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {chat.text}
                  </span>
                  <span className="text-xs"> {`(${chat.time} min)`}</span>
                </p>
              </div>
              {chat.textCount !== 0 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <span className="text-sm font-medium text-white">
                    {" "}
                    {chat.textCount}
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;
