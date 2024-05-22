"use client";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { useForm } from "react-hook-form";
import Banner from "~/components/client-components/Banner";
import { useSelector } from "react-redux";
import authSlice from "~/app/lib/features/authSlice";

type Form = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>();
  const { user } = useSelector(authSlice.selectSlice);

  const handleForm = (data: Form) => {
    console.log(data);
    reset();
  };

  return (
    <div className="">
      <Banner content="Contact" />
      <div className="py-[100px] flex flex-col lg:flex-row justify-center">
        <div className=" max-w-[570px]  p-5">
          <h1 className=" text-3xl mb-5">Get in Touch</h1>

          <div className=" flex items-center mb-5">
            <span className="pr-3 text-xl">
              <FaPhoneAlt />
            </span>
            <div className=" flex flex-col ">
              <span className=" text-[22px] font-semibold text-[#333]">
                Phone Number
              </span>
              <span className="text-[#666]">+1-202-555-0188</span>
            </div>
          </div>
          <div className=" flex items-center mb-5">
            <span className="pr-3 text-xl">
              <MdEmail />
            </span>
            <div className=" flex flex-col ">
              <span className=" text-[22px] font-semibold text-[#333]">
                Email
              </span>
              <span className="text-[#666]">Naturismoffice@info.com</span>
            </div>
          </div>
          <div className=" flex items-center mb-5">
            <span className="pr-3 text-xl">
              <FaMapMarkerAlt />
            </span>
            <div className=" flex flex-col ">
              <span className=" text-[22px] font-semibold text-[#333]">
                Address
              </span>
              <span className="text-[#666]">
                37 South Hanover Drive Springfield Gardens, NY 11413
              </span>
            </div>
          </div>
          <div className=" flex items-center mb-5">
            <span className="pr-3 text-xl">
              <MdOutlineAccessTimeFilled />
            </span>
            <div className=" flex flex-col ">
              <span className=" text-[22px] font-semibold text-[#333]">
                Business Hours
              </span>
              <span className="text-[#666]">
                Monday — Friday 9am – 5pm <br /> Saturday — 10am – 3pm <br />{" "}
                Sunday — Closed
              </span>
            </div>
          </div>
        </div>
        <div className="p-5 w-full lg:max-w-[540px]">
          <h1 className="mb-5 text-3xl font-medium">Send Us a Message</h1>

          <form onSubmit={handleSubmit(handleForm)}>
            <div className=" mb-5">
              <label className=" text-sm text-[#666]">Name*</label>
              <input
                type="text"
                value={user?.user.username}
                disabled
                className="p-[7px]  rounded-md w-full  border focus:outline-none text-[#7a7a7a]"
              />
            </div>

            <div className="mb-5">
              <label className=" text-sm text-[#666]">Email*</label>
              <input
                type="email"
                value={user?.user.email}
                disabled
                className=" p-[7px]  rounded-md w-full  border focus:outline-none text-[#7a7a7a]"
              />
            </div>
            <div className="mb-5">
              <label className=" text-sm text-[#666]">Message*</label>
              <textarea
                {...register("message", {
                  required: "Message is required !",
                  minLength: {
                    value: 3,
                    message: "Message must be at least 3 characters !",
                  },
                  maxLength: {
                    value: 250,
                    message: "Message must not exceed 250 characters !",
                  },
                })}
                placeholder="Message"
                className=" p-[7px]  rounded-md w-full  h-[136px] border focus:outline-none text-[#7a7a7a]"
              />
              {errors.message && (
                <p className=" text-red  ">{errors.message.message}</p>
              )}
            </div>
            {user && (
              <button
                type="submit"
                className=" w-full py-2 px-4 bg-[var(--secondary-color)] text-white rounded-md"
              >
                Send
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.622493712565!2d105.79462071095527!3d21.007764388418362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aca68dac9583%3A0x1cf7ddf853080ea1!2zMTE3IMSQLiBUcuG6p24gRHV5IEjGsG5nLCBUcnVuZyBIw7JhIE5ow6JuIENow61uaCwgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1710899811763!5m2!1svi!2s"
          className="w-full h-[340px] border-none"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
