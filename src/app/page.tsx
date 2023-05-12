import Header from "@/components/Header";
import Container from "@/components/Container";
import Intro from "@/app/Intro";

export default function Home() {
  return (
      <>
        <Header />
        <Container>
          <Intro title={"Hi"} description={"Not much to see here yet.."} />
        </Container>
      </>
  )
}
