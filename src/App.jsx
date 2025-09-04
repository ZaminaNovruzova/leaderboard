import { Route, Routes } from "react-router-dom";
import Game from "./Modules/Game/Game";
import Home from "./Modules/Home/View/Home";

const App = () => {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
