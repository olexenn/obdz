import Logo from "./Logo";
import MenuLinks from "./MenuLinks";
import NavBarContainer from "./NavBarContainer";

const NavBar = () => {
  return (
    <NavBarContainer>
      <Logo />
      <MenuLinks />
    </NavBarContainer>
  );
};

export default NavBar;
