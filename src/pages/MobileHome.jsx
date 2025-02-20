import { useState, useEffect } from 'react'
import PlatformsContainer from '../components/PlatformsContainer'

// Define mobile base design values
const MOBILE_BASE_WIDTH = 480;           // reference width for scaling on mobile
const MOBILE_LIGHTS_WIDTH = 300;         // base pixel width for lights image (mobile)
const MOBILE_TEXT_WIDTH = 500;           // base pixel width for text image (mobile)
const MOBILE_SUBJECT_WIDTH = 180;         // base pixel width for subject image (mobile)

const MobileHome = () => {
  // Set up state for lights opacity, text reveal progress,
  // and scaling factor for mobile design
  const [lightsOpacity, setLightsOpacity] = useState(0);
  const [textReveal, setTextReveal] = useState(0);
  const [scale, setScale] = useState(window.innerWidth / MOBILE_BASE_WIDTH);
  const [textOffset, setTextOffset] = useState(0);
  const [subjectOffset, setSubjectOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Full opacity and text reveal at 300px scrollY
      const newOpacity = Math.min(window.scrollY / 300, 1);
      setLightsOpacity(newOpacity);
      setTextReveal(newOpacity);
      setTextOffset(window.scrollY * 0.1);
      setSubjectOffset(window.scrollY * 0.15);
    };

    const handleResize = () => {
      setScale(window.innerWidth / MOBILE_BASE_WIDTH);
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
          width: `${MOBILE_LIGHTS_WIDTH * scale}px`, // scales on mobile
          height: 'auto',
          opacity: lightsOpacity,          // scroll-controlled opacity
          mixBlendMode: 'screen',           // using screen blend mode
          zIndex: 3,                       // ensure lights stay above background
          pointerEvents: 'none'            // ensures clicks pass through
        }}
      />
      <div style={{ width: '100vw', position: 'relative', height: '140vh' }}>
        <img
          src="/background.png"
          alt="Background"
          style={{
            width: '100vw',                
            height: '100%',               
            objectFit: 'cover',            
          }}
        />
        <img
          src="/text.png"
          alt="Text lights on"
          style={{
            position: 'absolute',          
            top: '40%',
            left: '50%',
            transform: `translate(-50%, -50%) translateY(${textOffset}px)`,
            width: `${MOBILE_TEXT_WIDTH * scale}px`,
            height: 'auto',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            zIndex: 3,
            maskImage: `linear-gradient(to right, black 0%, black calc(${textReveal * 100}% - 10%), transparent calc(${textReveal * 100}% + 10%), transparent 100%)`,
            WebkitMaskImage: `linear-gradient(to right, black 0%, black calc(${textReveal * 100}% - 10%), transparent calc(${textReveal * 100}% + 10%), transparent 100%)`,
          }}
        />
        <img
          src="/text.png"
          alt="Text lights off"
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: `translate(-50%, -50%) translateY(${textOffset}px)`,
            width: `${MOBILE_TEXT_WIDTH * scale}px`,
            height: 'auto',
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: 0.5,
          }}
        />
        <img
          src="/subject.png"
          alt="Subject"
          style={{
            position: 'absolute',
            top: '43%',
            left: '50%',
            transform: `translate(-50%, -50%) translateY(${subjectOffset}px)`,
            width: `${MOBILE_SUBJECT_WIDTH * scale}px`,
            height: 'auto',
            zIndex: 4,
            pointerEvents: 'none'
          }}
        />
        <PlatformsContainer 
          scale={scale}
          containerStyle={{ top: '55%', bottom: 'auto', left: '50%', transform: 'translateX(-50%)' }}
        />
      </div>
    </>
  )
}

export default MobileHome
