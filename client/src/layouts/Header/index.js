import { Container, Logo } from "./styled";

const Header = () => {
  return (
    <Container>
      <Logo src="img/logo.png" />
      <div className="title">Music Production Bot</div>
    </Container>
  );
};

export default Header;
