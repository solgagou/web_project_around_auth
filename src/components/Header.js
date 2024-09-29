import logo from '../images/logo_around.png'
import headerLine from '../images/line.jpg'


function Header() {
    return (
  <header className="header">
<img src={logo} className="header__logo" alt="Around logo" />
<img src={headerLine} className="header__line" alt="a line" />
</header>
    );
}

export default Header;