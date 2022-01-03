import '../App.css';
import HeroSection from '../components/HeroSection';
import Cards from '../components/Cards'
import Footer from '../components/Footer.js'


function Home(){
    return(
        <>
            <HeroSection/>
            <Cards />
            <Footer />
        </>
    )
}

export default Home;