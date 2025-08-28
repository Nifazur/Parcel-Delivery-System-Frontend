import { useState, useLayoutEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { gsap } from 'gsap';
import Lottie from 'lottie-react';
import heroAnimation from '@/assets/deliveryman.json';
import { useNavigate } from 'react-router';

const Hero = () => {
  const [trackingId, setTrackingId] = useState('');
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate()

  

  // GSAP animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      tl.from(titleRef.current, { y: 50, opacity: 0 })
        .from(subtitleRef.current, { y: 30, opacity: 0 }, "-=0.5")
        .from(inputRef.current, { y: 30, opacity: 0 }, "-=0.5");
    });

    return () => ctx.revert(); // cleanup
  }, []);

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      navigate(`/track-parcel/${trackingId}`)
    }
  };

  return (
    <section className="min-h-[600px] md:min-h-[700px] lg:min-h-screen flex items-center bg-background relative ">
      {/* Background Video - only visible on mobile/tablet */}
      <div className="hidden sm:flex lg:hidden absolute bottom-0 left-0 w-full justify-end items-end z-0">
        <Lottie
          animationData={heroAnimation}
          loop
          autoplay
          className="w-2/3 h-2/3 object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content (Animated with GSAP) */}
          <div className="space-y-8">
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
            >
              Fast &{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Reliable
              </span>
              <br />
              Delivery Service
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl"
            >
              Track your packages in real-time and experience lightning-fast
              delivery to anywhere in the world. Your trusted shipping partner.
            </p>

            <div ref={inputRef} className="max-w-lg" id='tracking-input'>
              <div className="relative group">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && handleTrackingSubmit(e)
                    }
                    placeholder="Enter your tracking ID"
                    className="w-full pl-12 pr-24 py-4 text-lg bg-background border-2 border-muted focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300 shadow-lg hover:shadow-xl"
                  />
                  <Search className="absolute left-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <button
                    type="button"
                    onClick={handleTrackingSubmit}
                    className="absolute right-2 px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                  >
                    Track
                  </button>
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                <p>Try: TRK-202508333-IEPB5V, or TRK-20250333-IEPB5V</p>
              </div>
            </div>
          </div>

          {/* Right Side - Video (Static) */}
          <div className="hidden lg:flex items-center justify-center lg:justify-end">
            <Lottie
              animationData={heroAnimation}
              loop
              autoplay
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;