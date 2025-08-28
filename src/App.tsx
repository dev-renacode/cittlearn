import Footer from "./components/Footer.tsx";
import Hero from "./components/Hero.tsx";
import Navbar from "./components/Navbar.tsx";
import Proyectos from "./components/Proyectos.tsx";
import SobreCittLearn from "./components/SobreCittLearn.tsx";
import Tracks from "./components/Tracks.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <SobreCittLearn />
      <Proyectos />
      <Tracks />
      <Footer />
    </>
  );
}

export default App;
