import Image from "next/image";
import styles from "./HomeAbout.module.css";

export default function HomeAbout() {
  return (
    <section className="max-w-[1140px] px-4 h-full mx-auto">
      <div className={styles["about"]}>
        <div className={styles["about-content"]}>
          <h2 className={styles["about-heading"]}>About us</h2>
          <h3 className={styles["about-sub-heading"]}>
            What Sets Our Business Apart for Your Selection
          </h3>
          <p className={styles["about-desc"]}>
            Boy favourable day can introduced sentiments entreaties. Noisier
            carried of in warrant because. So mr plate seems cause chief widen
            first. Two differed husbands met screened his. Bed was form wife out
            ask draw. Wholly coming at we no enable. Offending sir delivered
            questions now new met. Acceptance she interested.
          </p>
          <div className={styles["about-action"]}>
            <button className={styles["action-btn"]}>More about us</button>
          </div>
        </div>
        <div className={styles["about-img"]}>
          <Image width={500} height={500} src="https://i.imgur.com/2oaIp5J.png" alt="About img" />
        </div>
      </div>
    </section>
  );
}
