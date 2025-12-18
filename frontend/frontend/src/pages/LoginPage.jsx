import LoginForm from '../components/auth/LoginForm';
import videoSrc from '../assets/clg video.mp4';

const LoginPage = () => {
  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <video
        autoPlay
        muted
        loop
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 0
      }} />
      
      <div style={{
        position: 'relative',
        zIndex: 1,
        height: '100%'
      }}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;