const TestComponent = () => {
  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: 'white',
      margin: '2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2>Frontend is Working! ✅</h2>
      <p>React app is running successfully</p>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  );
};

export default TestComponent;