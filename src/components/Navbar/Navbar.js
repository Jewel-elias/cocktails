import "./Navbar.css";
import 'animate.css'
import { getTranslatedText as translate } from "../Localization/Translation";
import { useSelector } from "react-redux";
import { useBetween } from "use-between";


function Navbar() {
  const { locale, setLocale } = useBetween(
    useSelector((state) => state.useSharedLang)
  );

  function toTurkish() {
    const TR = document.querySelector(".turkish-key");
    const EN = document.querySelector(".english-key");

    TR.classList.toggle("current-language");
    EN.classList.remove("current-language");

    setLocale("AR");
  }
  function toEnglish() {
    const TR = document.querySelector(".turkish-key");
    const EN = document.querySelector(".english-key");

    EN.classList.toggle("current-language");
    TR.classList.remove("current-language");

    setLocale("EN");
  }
  return (
    <div className="Navbar" dir="rtl">
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
        integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
        crossOrigin="anonymous"
      ></link>
      <div className="nav-container">

        {/* Switch Language */}
        <div className="nav-buttons-language col-3">
          <span className="nav-language-icons">
            <i className="bi bi-globe"></i>
          </span>
          <span className="turkish-language turkish-key" onClick={toTurkish}>
            {translate("turkish-key", locale)}
          </span>
          <span className="nav-language-icons">|</span>
          <span
            className="english-language current-language english-key"
            onClick={toEnglish}
          >
            {translate("english-key", locale)}
          </span>
        </div>

        <div className="nav-buttons d-flex justify-content-between row">
          {/* Logo */}
          <div className="nav-logo">
            <span>Cocktail Bar</span>
            <i className="fas fa-cocktail animate__animated animate__pulse animate__infinite"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
