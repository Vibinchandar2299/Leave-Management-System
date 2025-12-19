const MainContainer = ({ children, className = '' }) => {
  return (
    <div className={`content-container ${className}`}>
      {children}
    </div>
  );
};

export default MainContainer;