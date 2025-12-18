import RegisterForm from '../components/auth/RegisterForm';
import AppLayout from '../components/layout/AppLayout';
import MainContainer from '../components/layout/MainContainer';

const RegisterPage = () => {
  return (
    <AppLayout>
      <MainContainer>
        <RegisterForm />
      </MainContainer>
    </AppLayout>
  );
};

export default RegisterPage;