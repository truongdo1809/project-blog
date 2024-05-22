import styles from "./HomeContact.module.css";

export default function HomeContact() {
  return (
    <section className={styles["contact"]}>
      <div className="max-w-[1140px] px-4 h-full mx-auto text-white">
        <h2 className={styles["contact-heading"]}>Any Question?</h2>
        <p className={styles["contact-desc"]}>
          On it differed repeated wandered required in. Then girl neat why yet
          knew rose spot. Moreover property we he kindness greatest be oh
          striking laughter. In me he at collecting affronting.
        </p>
        <div className={styles["contact-actions"]}>
          <button className={styles["action-btn"]}>Contact us</button>
        </div>
      </div>
    </section>
  );
}
