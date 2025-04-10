import { Package, Rabbit, Repeat } from "lucide-react";
import { HeroCard } from "./HeroCards/HeroCards";
import { animate } from "motion";
import { useEffect, useRef } from "preact/hooks";

export default function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    animate(titleRef.current, { opacity: [0, 1], y: [50, 0] }, { duration: 0.6 });
    animate(subtitleRef.current, { opacity: [0, 1], y: [20, 0] }, { delay: 0.2, duration: 0.6 });
    animate(buttonRef.current, { opacity: [0, 1], y: [10, 0] }, { delay: 0.4, duration: 0.6 });

    cardsRef.current.forEach((card, index) => {
      animate(card, { opacity: [0, 1], y: [20, 0] }, { delay: 0.5 + index * 0.4, duration: 0.6 });
    });
  }, []);

  const handleScrollToFeatured = (e) => {
    e.preventDefault();
    const featuredSection = document.getElementById('featured');
    if (featuredSection) {
      featuredSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 sm:py-0">
      <div className="mx-5 px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1
                ref={titleRef}
                className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight"
              >
                Készítsd el a
                <span ref={titleRef} className="block text-amber-300">
                  Saját figuráidat
                </span>
              </h1>
              <p ref={subtitleRef} className="text-xl text-neutral-300">
                
                  Készítsd el a saját figuráidat a legjobb minőségű anyagokból! 
                  Válaszd ki a kedvenc figuráidat vagy kész
                  csomagokat, hogy te is elsajátítsd a tudást!
              
              </p>
            </div>

            <button
            onClick={handleScrollToFeatured}
              ref={buttonRef}
              className="bg-amber-300 text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-amber-400 transition-all duration-300 hover:cursor-pointer"
            >
              Felfedezés
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-1">
            {[
              { title: "Kész figurák", desc: "Előre elkészített prémium minőségű figurák.", icon: <Rabbit className="w-8 h-8 text-amber-300" /> },
              { title: "DIY Csomagok", desc: "Előkészített csomagok amiben minden megtalálható, hogy te is elsajátítsd a tudást és aranyos figurákat készíts.", icon: <Package className="w-8 h-8 text-amber-300" /> },
              { title: "Előfizetéses csomagok", desc: "Előkészített csomagok egyenesen a házadhoz olcsóbban!", icon: <Repeat className="w-8 h-8 text-amber-300" /> },
            ].map((card, index) => (
              <div ref={(el) => (cardsRef.current[index] = el)} key={index}>
                <HeroCard title={card.title} description={card.desc}>{card.icon}</HeroCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
