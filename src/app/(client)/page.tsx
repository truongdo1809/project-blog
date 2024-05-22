import HomeAbout from "~/components/client-components/home/home-about/HomeAbout";
import HomeBanner from "~/components/client-components/home/home-banner/HomeBanner";
import HomeContact from "~/components/client-components/home/home-contact/HomeContact";
import HomeServices from "~/components/client-components/home/home-services/HomeServices";

export default function Home() {
  return (
    <main>
      <HomeBanner />
      <HomeServices />
      <HomeAbout />
      <HomeContact />
      
    </main>
  );
}