
import Hero from './section/Hero';
import OurSpecialties from './section/OurSpecialties';
import Pricing from './section/Pricing';
import Review from './section/Review';
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