"use client";
import { useEffect } from "react";
import styles from "./HomeBanner.module.css";
import Typed from "typed.js";

export default function HomeBanner() {
  useEffect(() => {
    const options = {
      strings: [
        "Unforgettable Adventures in Japan",
        "Authentic Japanese Experiences",
        "Experience Japan Like Never Before",
        "Dreaming of Japan? Let's Make It Real",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };

    const typed = new Typed(".typed", options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className={styles["home-banner"]}>
        <div className={`${styles["banner-wrap"]}`}>
          <h1>Japan travel</h1>
          <p>
            <span className="typed"></span>
            <span className="typed-cursor" aria-hidden="true"></span>
          </p>
          <button className={styles["get-start"]}>Get started</button>
        </div>
      </div>
    </>
  );
}
