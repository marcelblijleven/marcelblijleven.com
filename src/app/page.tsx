import Header from "@/components/Header";
import Container from "@/components/Container";
import Intro from "@/app/Intro";

export default function Home() {
  return (
      <>
        <Header />
        <Container>
          <Intro title={"Welcome"} description={"Not much to see here yet.."} />
        </Container>
      </>
  )
}
