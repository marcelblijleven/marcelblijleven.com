import Header from "@/components/Header";
import Container from "@/components/Container";
import Intro from "@/app/Intro";

export default function About() {
    return (
        <>
            <Header />
            <Container>
                <Intro title={"About me"} description={"Who am I?"} />
            </Container>
        </>
    )
}
