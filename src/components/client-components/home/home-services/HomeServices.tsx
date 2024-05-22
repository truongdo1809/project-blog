"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./HomeServices.module.css";
import { ChatBubbleOvalLeftEllipsisIcon, LinkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import 'swiper/css';

import Image from "next/image";
import Rating from "../../Rating";

interface Testimonial {
    quote: string;
    quoteLeftIcon: string;
    quoteRightIcon: string;
    image: string;
    name: string;
    position: string;
    rating: number;
}

const testimonialsData: Testimonial[] = [
    {
        quote: "Sơn không chỉ là một nhân viên xuất sắc mà còn là người có đóng góp lớn cho sự phát triển của Công ty TNHH Giáo dục Edmicro. Sự đa dạng trong kỹ năng và trách nhiệm của Sơn là một nguồn động viên cho toàn bộ đội ngũ.",
        quoteLeftIcon: "fa-quote-left",
        quoteRightIcon: "fa-quote-right",
        image: "https://i.imgur.com/VRD8rgX.png",
        name: "anh Nguyễn Quý Tiến",
        position: "Giám đốc sản phẩm - Edmicro",
        rating: 5
    },
    {
        quote: "Nếu tôi cần tìm kiếm một người đa nhiệm, sáng tạo và có tầm nhìn, anh Sơn là sự lựa chọn hàng đầu. Đối tác và đồng đội của tôi luôn đánh giá cao sự đóng góp và tận tâm của anh trong mọi dự án.",
        quoteLeftIcon: "fa-quote-left",
        quoteRightIcon: "fa-quote-right",
        image: "https://i.imgur.com/cF5iLbN.png",
        name: "Phạm Thị Tâm",
        position: "Trưởng nhóm phát triển sản phẩm - Edmicro",
        rating: 5
    },
    {
        quote: "Ở vị trí Trưởng Nhóm Nhập Liệu, Sơn không chỉ giỏi sử dụng các công nghệ web hiện đại mà còn thể hiện khả năng quản lý nhóm xuất sắc. Sơn đã đưa ra quy tắc và quy chuẩn chung, giúp đảm bảo sự hiệu quả và chất lượng công việc của đội.",
        quoteLeftIcon: "fa-quote-left",
        quoteRightIcon: "fa-quote-right",
        image: "https://i.imgur.com/GWd1JbC.jpg",
        name: "anh Lê Đức Thiệu",
        position: "Trưởng nhóm nội dung - Edmicro",
        rating: 5
    },
    {
        quote: "anh Sơn đã đóng góp lớn vào quá trình phát triển sản phẩm, đặc biệt là khi anh ấy làm vai trò Business Analyst tại Công ty TNHH Giáo dục Edmicro. Sự sáng tạo và chuyên nghiệp của anh đã làm cho mọi buổi họp trở nên sinh động và đưa ra những ý tưởng mới mẻ cho dự án.",
        quoteLeftIcon: "fa-quote-left",
        quoteRightIcon: "fa-quote-right",
        image: "https://i.imgur.com/vpmhLP4.jpg",
        name: "Nguyễn Vũ Thùy Linh",
        position: "Project Manager - Edmicro",
        rating: 5
    },
    {
        quote: "Dưới vai trò Trưởng nhóm Nhập Liệu, Sơn thể hiện sự nhiệt huyết trong việc nhập liệu và quản lý dự án của nhóm. Ngoài ra, dù bận nhưng Sơn luôn sắp xếp thời gian tích cực tham gia các hoạt động như khảo sát người dùng và hỗ trợ các kì thi quốc tế, góp phần làm cho dự án trở nên phong phú và đa chiều, là tấm gương cho các thành viên trong nhóm.",
        quoteLeftIcon: "fa-quote-left",
        quoteRightIcon: "fa-quote-right",
        image: "https://i.imgur.com/WNbUzWM.png",
        name: "Vũ Phương Thanh Lam",
        position: "Biên tập viên nhập liệu - Edmicro",
        rating: 5
    },
    {
        quote: "Ở cấp độ Nhân Viên Outsource, Sơn thể hiện kỹ năng quản lý công việc và giao tiếp xuất sắc. Sơn đã giải quyết công việc ngân hàng một cách triệt để và phối hợp hiệu quả với các bộ phận liên quan.",
        quoteLeftIcon: "fa-quote-left",
        quoteRightIcon: "fa-quote-right",
        image: "https://i.imgur.com/L8i54uK.png",
        name: "Chị Lê Thị Quỳnh Anh",
        position: "Trưởng phòng IOD - MUFG Bank",
        rating: 5
    },
];

const HomeServices: React.FC = () => {
    const [maxHeight, setMaxHeight] = useState<number>(0);

    useEffect(() => {
        const setParagraphHeight = () => {
            const paragraphs = document.querySelectorAll('.testimonial-item p');
            if (paragraphs.length > 0) {
                let maxHeight = 0;
                paragraphs.forEach(p => {
                    const height = p.getBoundingClientRect().height;
                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                });
                setMaxHeight(maxHeight);
            }
        };

        setParagraphHeight();

        window.addEventListener('resize', setParagraphHeight);

        return () => {
            window.removeEventListener('resize', setParagraphHeight);
        };
    }, [maxHeight]);

    return (
        <section className="max-w-[1140px] px-4 h-full mx-auto">
            <div style={{ margin: '3.5rem 0' }}>
                <div className={styles["services-heading"]}>
                    <h2>Our Services</h2>
                </div>
                <p className={styles["services-desc"]}>Ask especially collecting terminated may son expression. Extremely eagerness principle estimable own was man. Men received far his dashwood subjects new.</p>

                <div className="service-wrap">
                    <ul className={styles["service-list"]}>
                        <li className={styles["service-item"]}>
                            <h3 className={styles["service-sub-heading"]}>Web Design</h3>
                            <Image  width={483} height={271} src="https://i.imgur.com/IbGLLHV.jpg" alt="" className={styles["service-img"]} />
                            <div className={styles["service-actions"]}>
                                <button className={styles["service-btn"]}>
                                    <Link href="#">
                                        <PlusIcon className="text-white w-6" />
                                    </Link>
                                </button>
                                <button className={styles["service-btn"]}>
                                    <Link href="#">
                                        <LinkIcon className="text-white w-6" />
                                    </Link>
                                </button>
                            </div>
                        </li>
                        <li className={styles["service-item"]}>
                            <h3 className={styles["service-sub-heading"]}>Graphic Design</h3>
                            <Image    width={483} height={271} src="https://i.imgur.com/bbayDRB.jpg" alt="" className={styles["service-img"]} />
                            <div className={styles["service-actions"]}>
                                <button className={styles["service-btn"]}>
                                    <Link href="#">
                                        <PlusIcon className="text-white w-6" />
                                    </Link>
                                </button>
                                <button className={styles["service-btn"]}>
                                    <Link href="#">
                                        <LinkIcon className="text-white w-6" />
                                    </Link>
                                </button>
                            </div>
                        </li>
                        <li className={styles["service-item"]}>
                            <h3 className={styles["service-sub-heading"]}>Content Creation</h3>
                            <Image   width={483} height={271} src="https://i.imgur.com/yg63l3E.jpg" alt="" className={styles["service-img"]} />
                            <div className={styles["service-actions"]}>
                                <button className={styles["service-btn"]}>
                                    <Link href="#">
                                        <PlusIcon className="text-white w-6" />
                                    </Link>
                                </button>
                                <button className={styles["service-btn"]}>
                                    <Link href="#">
                                        <LinkIcon className="text-white w-6" />
                                    </Link>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className={styles["testimonials"]}>
                    <h3 className="flex text-2xl"><ChatBubbleOvalLeftEllipsisIcon className="w-8" /> Testimonials</h3>
                    <div>
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            navigation={true}
                            loop={true}
                            modules={[Autoplay]}
                            className={styles["testimonials-slides"]}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 3,
                                },
                            }}
                        >
                            {testimonialsData.map((testimonial, index) => (
                                <SwiperSlide key={index}>
                                    <div className={`${styles["testimonial-item"]} testimonial-item`}>
                                        <div className={styles["testimonial-rating"]}>
                                            <Rating rating={testimonial.rating} />
                                        </div>
                                        <p style={{ minHeight: maxHeight }}>
                                            <FontAwesomeIcon className={styles["fa-quote-left"]} icon={faQuoteLeft} />
                                            {testimonial.quote}
                                            <FontAwesomeIcon className={styles["fa-quote-right"]} icon={faQuoteRight} />
                                        </p>
                                        <Image  width={483} height={271} src={testimonial.image} className={styles["testimonial-img"]} alt="" />
                                        <h3>{testimonial.name}</h3>
                                        <h4>{testimonial.position}</h4>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeServices;
