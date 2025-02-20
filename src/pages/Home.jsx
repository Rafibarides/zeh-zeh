import { useState, useEffect } from 'react'
import PlatformsContainer from '../components/PlatformsContainer'
import { motion } from 'framer-motion'

// Define base design values
const BASE_WIDTH = 1440;           // reference width for scaling
const BASE_LIGHTS_WIDTH = 800;     // base pixel width for lights image
const BASE_TEXT_WIDTH = 1000;       // base pixel width for text image
const BASE_SUBJECT_WIDTH = 300;      // base pixel width for subject image

const Home = () => {
  // Set up state for lights opacity, text reveal progress,
  // and scaling factor for base design
  const [lightsOpacity, setLightsOpacity] = useState(0);
  const [textReveal, setTextReveal] = useState(0);
  const [scale, setScale] = useState(window.innerWidth / BASE_WIDTH);
  const [textOffset, setTextOffset] = useState(0);
  const [subjectOffset, setSubjectOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Linear ramp up: full opacity (1) and full text reveal at 300px scrollY
      const newOpacity = Math.min(window.scrollY / 300, 1);
      setLightsOpacity(newOpacity);
      setTextReveal(newOpacity);
      setTextOffset(window.scrollY * 0.2);
      setSubjectOffset(window.scrollY * 0.3);
    };

    const handleResize = () => {
      setScale(window.innerWidth / BASE_WIDTH);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <img
        src="/lights.png"
        alt="Lights"
        style={{
          position: 'fixed',               // fixed in viewport
          top: 0,
          left: '50%',                     // center horizontally
          transform: 'translateX(-50%)',   // offset by half its width
          width: `${BASE_LIGHTS_WIDTH * scale}px`, // scales with window size
          height: 'auto',
          opacity: lightsOpacity,         // dynamically controlled by scroll
          mixBlendMode: 'screen',         // using screen blend mode
          zIndex: 3,                     // ensure lights stay above background
          pointerEvents: 'none'           // ensures clicks pass through
        }}
      />
      <div style={{ width: '100vw', position: 'relative', height: '100%' }}>
        <img
          src="/background.png"
          alt="Background"
          style={{
            width: `${BASE_WIDTH * scale}px`, // scales with window size (equals viewport width)
            height: 'auto',                   // maintains the image's aspect ratio
            display: 'block'
          }}
        />
        <img
          src="/text.png"
          alt="Text lights on"
          style={{
            position: 'absolute',             // relative to container, so it scrolls with bg
            top: '45%',                       // centered vertically in the container
            left: '50%',                      // centered horizontally
            transform: `translate(-50%, -50%) translateY(${textOffset}px)`, // include vertical parallax offset
            width: `${BASE_TEXT_WIDTH * scale}px`, // scales with window size
            height: 'auto',
            mixBlendMode: 'screen',           // using screen blend mode
            pointerEvents: 'none',            // ensures clicks pass through
            zIndex: 3,
            maskImage: `linear-gradient(to right, black 0%, black calc(${textReveal * 100}% - 10%), transparent calc(${textReveal * 100}% + 10%), transparent 100%)`,
            WebkitMaskImage: `linear-gradient(to right, black 0%, black calc(${textReveal * 100}% - 10%), transparent calc(${textReveal * 100}% + 10%), transparent 100%)`
          }}
        />
        <img
          src="/text.png"
          alt="Text lights off"
          style={{
            position: 'absolute',             
            top: '45%',                       
            left: '50%',                      
            transform: `translate(-50%, -50%) translateY(${textOffset}px)`,
            width: `${BASE_TEXT_WIDTH * scale}px`,
            height: 'auto',
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: 0.5,
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            top: '47%',
            left: '50%',
            transform: `translate(-50%, -50%) translateY(${subjectOffset}px)`,
            zIndex: 100
          }}
        >
          <motion.img
            src="/subject.png"
            alt="Subject"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              width: `${BASE_SUBJECT_WIDTH * scale}px`,
              height: 'auto',
              zIndex: 100,
              pointerEvents: 'none',
              opacity: 1
            }}
          />
        </motion.div>
        <PlatformsContainer scale={scale} />
      </div>
    </>
  )
}

export default Home
