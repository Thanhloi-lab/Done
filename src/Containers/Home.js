import '../App.css';
import HeroSection from '../components/Home/HeroSection';
import Cards from '../components/Home/Cards'
import Footer from '../components/Common/Footer.js'


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