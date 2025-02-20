import { motion } from 'framer-motion';
import Platform from './Platform';
import { platforms } from '../utils/platformsArray';
import PropTypes from 'prop-types';

const PlatformsContainer = ({ containerStyle = {}, scale = 1 }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Default container style for desktop
  const defaultContainerStyle = {
    position: 'absolute',
    bottom: '9%',           // default for desktop
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      // merge any custom style for mobile overrides
      style={{ ...defaultContainerStyle, ...containerStyle }}
    >
      {platforms.map((platform, index) => (
        <Platform
          key={index}
          icon={platform.icon}
          title={platform.title}
          link={platform.link}
          scale={scale}
        />
      ))}
    </motion.div>
  );
};

PlatformsContainer.propTypes = {
  containerStyle: PropTypes.object,
  scale: PropTypes.number
};

export default PlatformsContainer;
