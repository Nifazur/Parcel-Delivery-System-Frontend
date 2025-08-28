

import { useEffect, useState } from "react";
import Joyride, { STATUS, type CallBackProps, type Step } from "react-joyride";

import Hero from "./section/Hero";
import OurSpecialties from "./section/OurSpecialties";
import Pricing from "./section/Pricing";
import Review from "./section/Review";
import StepSection from "./section/Step";

const Home = () => {
    const [run, setRun] = useState(false);
    useEffect(() => {
        setRun(true);
    }, []);

    const steps: Step[] = [
        {
            target: "#tracking-input",
            content: (
                <div>
                    <h3 className="text-lg font-bold mb-2">Track Your Parcel</h3>
                    <p className="text-sm text-muted-foreground">
                        Enter your <span className="font-medium">Tracking ID</span> here and click
                        <span className="text-green-600 font-medium"> Track </span> to see the latest status of your parcel.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                        Example: TRK-202508333-IEPB5V
                    </p>
                </div>
            ),
        },
        {
            target: "#step-0",
            content: (
                <div>
                    <h3 className="text-lg font-bold mb-2">Step 1: Booking</h3>
                    <p className="text-sm text-muted-foreground">
                        Customers confirm their order and provide details here.
                    </p>
                </div>
            ),
        },
        {
            target: "#step-1",
            content: (
                <div>
                    <h3 className="text-lg font-bold mb-2">Step 2: Packing</h3>
                    <p className="text-sm text-muted-foreground">
                        Our team carefully packs items with protective materials.
                    </p>
                </div>
            ),
        },
        {
            target: "#step-2",
            content: (
                <div>
                    <h3 className="text-lg font-bold mb-2">Step 3: Transportation</h3>
                    <p className="text-sm text-muted-foreground">
                        Goods are transported efficiently with reliable tracking.
                    </p>
                </div>
            ),
        },
        {
            target: "#step-3",
            content: (
                <div>
                    <h3 className="text-lg font-bold mb-2">Step 4: Delivery</h3>
                    <p className="text-sm text-muted-foreground">
                        Package reaches customer’s doorstep with accuracy & care.
                    </p>
                </div>
            ),
        },
        {
            target: "#basic",
            content: (
                <div>
                    <h3>Basic Delivery</h3>
                    <p>3-5 business days, up to 1kg. Ideal for simple, budget delivery.</p>
                </div>
            ),
        },
        {
            target: "#standard",
            content: (
                <div>
                    <h3>Standard Delivery</h3>
                    <p>1-2 days, up to 3kg, real-time tracking & COD available.</p>
                </div>
            ),
        },
        {
            target: "#express",
            content: (
                <div>
                    <h3>Express Delivery</h3>
                    <p>Same day delivery, up to 5kg, GPS tracking & guaranteed delivery.</p>
                </div>
            ),
        },
    ]
    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status } = data;
        if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div>
            <Joyride
                steps={steps}
                run={run}
                continuous
                showProgress
                showSkipButton
                scrollToFirstStep
                scrollOffset={200}
                spotlightPadding={10}
                callback={handleJoyrideCallback}
                styles={{
                    options: {
                        zIndex: 99999,
                        primaryColor: "#6bdba3"
                    },
                    spotlight: {
                        border: "1px solid #22c55e",
                        borderRadius: "12px",
                    },
                    tooltip: {
                        borderRadius: "12px",
                        fontSize: "14px",
                    },
                }}
            />

            <Hero />
            <StepSection />
            <OurSpecialties />
            <Pricing />
            <Review />

        </div>
    );
};

export default Home;