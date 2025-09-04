import Background from "../../components/Background";
import GamerCard from "./components/GamerCard";
// // import GamerCard from "./components/GamerCard";
// // import { gameDatas } from "../../db/dataBase";
// const Game = () => {
//   return (
//     <>
//
//       {/* <GamerCard user={gameDatas} /> */}
//     <div>salam</div>
//       {/* <GamerCard/> */}
//     </>
//   );
// };

// export default Game;

const Game = () => {
  return (
    <>
      <Background />
      <div className="gamerList">
        <GamerCard />
      </div>
      
      <div>
        <h1>salam</h1>
      </div>
    </>
  );
};

export default Game;
