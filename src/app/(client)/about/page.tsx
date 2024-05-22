import Banner from "~/components/client-components/Banner";
import Established from "~/components/client-components/about/Established";
import Mission from "~/components/client-components/about/Mission";
import Team from "~/components/client-components/about/Team";
import Timeline from "~/components/client-components/about/Timeline";

export default function AboutPage() {
  return (
    <>
      <Banner content = {"About us"} />
      <Established />
      <Mission />
      <Timeline />
      <Team />
    </>
  );
}
