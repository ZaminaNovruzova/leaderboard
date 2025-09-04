import { NavLink } from "react-router-dom";
import Background from "../../../components/Background";
const Home = () => {
  return (
    <>
      <Background />
      <section className="homePage">
        <div className="container">
          <div className="row">
            <h2 className="title">Oyuna xoşgəldiniz!</h2>
            <NavLink to="/game">Oyuna keçid edin!</NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
