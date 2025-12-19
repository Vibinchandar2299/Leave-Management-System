const AnimatedText = ({ text, className = '' }) => {
  return (
    <span className={`animated-text ${className}`}>
      {text}
    </span>
  );
};

export default AnimatedText;