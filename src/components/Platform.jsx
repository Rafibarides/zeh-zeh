import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import PropTypes from 'prop-types';

// These values are now relative to BASE_WIDTH of 1440px (desktop) or MOBILE_BASE_WIDTH of 480px
const BASE_PILL_HEIGHT = 70;        // ~4.86% of 1440px
const BASE_PILL_WIDTH = 240;        // ~16.67% of 1440px
const BASE_ICON_SIZE = 30;          // ~2.08% of 1440px
const BASE_FONT_SIZE = 16;          // ~1.11% of 1440px

const Platform = ({ icon, title, link, scale = 1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  
  const bounceVariants = {
    hidden: { 
      scale: 0.8,
      opacity: 0
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 100
      }
    }
  };

  return (
    <motion.a
      ref={ref}
      variants={bounceVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        height: `${BASE_PILL_HEIGHT * scale}px`,
        width: `${BASE_PILL_WIDTH * scale}px`,
        borderRadius: `${(BASE_PILL_HEIGHT / 2) * scale}px`,
        padding: `0 ${20 * scale}px`,
        marginBottom: `${15 * scale}px`,
        textDecoration: 'none',
        cursor: 'pointer',
      }}
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={icon}
        alt={`${title} icon`}
        style={{
          width: `${BASE_ICON_SIZE * scale}px`,
          height: `${BASE_ICON_SIZE * scale}px`,
          marginRight: `${15 * scale}px`
        }}
      />
      <span style={{ 
        fontSize: `${BASE_FONT_SIZE * scale}px`,
        fontWeight: '500'
      }}>
        {title}
      </span>
    </motion.a>
  );
};

Platform.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  scale: PropTypes.number
};

export default Platform;
