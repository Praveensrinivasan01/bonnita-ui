import { useParams } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Routes } from "./Routes/Routes";
import "./styles.scss"

function App() {
  const  path = window.location.pathname
  return (
    <>
      {path.startsWith("/admin") ? null : <Header  />}
        <Routes />
      {path.startsWith("/admin") ? null : <Footer />}
    </>
  );

}

export default App;
