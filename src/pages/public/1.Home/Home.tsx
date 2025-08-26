
import Hero from './section/hero';
import OurSpecialties from './section/OurSpecialties';
import Pricing from './section/Pricing';
import Review from './section/review';
import Step from './section/Step';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Step></Step>
            <OurSpecialties></OurSpecialties>
            <Pricing></Pricing>
            <Review></Review>
        </div>
    );
};

export default Home;