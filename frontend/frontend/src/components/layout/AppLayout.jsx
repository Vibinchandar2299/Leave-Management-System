import Header from '../common/Header';

const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;