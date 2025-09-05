import { useState } from "react";
import { gameDatas } from "../../db/dataBase";
import GamerCard from "./components/GamerCard";
import Background from "../../components/Background";

//*global deyissen ve funksiya

const umumiScoreAnimasiyaMuddeti = 2000; //*ms
const neceMilliSeconddaBirArtimOlacaq = 20; //*ms

const randomScoreSecenFunksiya = () => {
  return Math.floor(Math.random() * 3000 + 1); //*max 2999 verir deye+1 yazdim ki max 3000 olsun
};

//*hedefe catana qeder animasiyali artim edecek

function scoreAnimation({
  funksiyaIleRandomSecilecekHedef,
  roundIndex,
  playerId,
  komandaTerefi,
  setLeft,
  setRight,
}) {

  let cariScore = 0;
  const neceDefeArtimOlacaq = Math.max(
    1,
    Math.floor(umumiScoreAnimasiyaMuddeti / neceMilliSeconddaBirArtimOlacaq)
  );
  const herDefeNeQederArtacaq = Math.ceil(
    funksiyaIleRandomSecilecekHedef / neceDefeArtimOlacaq
  );

  const interval = setInterval(() => {
    cariScore += herDefeNeQederArtacaq;
    const gosterilecekScore =
      cariScore >= funksiyaIleRandomSecilecekHedef
        ? funksiyaIleRandomSecilecekHedef
        : cariScore;

    //*komanda scorelarini cari rounda gore her intervalda her raundda  yenileyecek

    const updater = (prev) =>
      sutunlardakiScoreYenile(prev, roundIndex, playerId, gosterilecekScore);

    if (komandaTerefi === "sol") setLeft(updater);
    else setRight(updater);

    if (gosterilecekScore === funksiyaIleRandomSecilecekHedef) {
      clearInterval(interval);
    }
  }, neceMilliSeconddaBirArtimOlacaq);
}

//*score yenileyen funksiya

const sutunlardakiScoreYenile = (columns, raundIndexi, playerId, newScore) => {
  return columns.map((column, colIndexi) => {
  
    if (colIndexi !== raundIndexi) return column;
    return column.map((oyuncu) =>
      oyuncu.userId === playerId ? { ...oyuncu, score: newScore } : oyuncu
    );
  });
};

function scoreGoreQalibiSec(oyunRoundu, scorelar) {
  const winners = [];
  for (let i = 0; i < oyunRoundu.length; i += 2) {
    const birinciOyuncu = oyunRoundu[i];
    const ikinciOyuncu = oyunRoundu[i + 1];
    if (!ikinciOyuncu) {
      winners.push({ ...birinciOyuncu, score: 0 });
      continue;
    }
    let winner;
    if (scorelar[i] >= scorelar[i + 1]) {
      winner = { ...birinciOyuncu, score: 0 };
    } else {
      winner = { ...ikinciOyuncu, score: 0 };
    }
    winners.push(winner);
  }
  return winners;
}

const Game = () => {
  const [solKomanda, setSolKomanda] = useState([
    //*team a cagirdiq
    gameDatas.teamA.map((p) => ({ ...p, score: 0 })),
  ]);

  const [sagKomanda, setSagKomanda] = useState([
    //*team b cagirdiq
    gameDatas.teamB.map((p) => ({ ...p, score: 0 })),
  ]);

  const [hazirdaOynanir, setHazirdaOynanir] = useState(false);
  const [cempion, setCempion] = useState(null);

  const raunduBaslat = (side) => {
    const columns = side === "sol" ? solKomanda : sagKomanda; //*columns ya sag komandaya beraber olur yada sol komandaya

    const setColumns = side === "sol" ? setSolKomanda : setSagKomanda;

    const roundIndex = columns.length - 1;
    const currentColumn = columns[roundIndex];
    if (!currentColumn || currentColumn.length <= 1) return;
    const hedefScorelar = currentColumn.map(() => randomScoreSecenFunksiya());
    currentColumn.forEach((player, index) => {
      scoreAnimation({
        funksiyaIleRandomSecilecekHedef: hedefScorelar[index],
        roundIndex,
        playerId: player.userId,
        komandaTerefi: side,
        setLeft: setSolKomanda,
        setRight: setSagKomanda,
      });
    });
    //*round bitende walib teyin olunur

    setTimeout(() => {
      const winners = scoreGoreQalibiSec(currentColumn, hedefScorelar);
      setColumns((prev) => [...prev, winners]);
    }, umumiScoreAnimasiyaMuddeti + 50);
  };

  const finalaBaslaEgerHazirdir = () => {
    const soldakiSonuncuRound = solKomanda.length - 1;
    const sagdakiSonuncuRound = sagKomanda.length - 1;


    const soldakiSonuncuSutun = solKomanda[soldakiSonuncuRound];
    const sagdakiSonuncuSutun = sagKomanda[sagdakiSonuncuRound];

    const soldakiSonuncuOyuncu =
      Array.isArray(soldakiSonuncuSutun) && soldakiSonuncuSutun.length === 1
        ? soldakiSonuncuSutun[0]
        : null;
    const sagdakiSonuncuOyuncu =
      Array.isArray(sagdakiSonuncuSutun) && sagdakiSonuncuSutun.length === 1
        ? sagdakiSonuncuSutun[0]
        : null;

    if (!soldakiSonuncuOyuncu || !sagdakiSonuncuOyuncu || cempion) return;

    const leftTarget = randomScoreSecenFunksiya();
    const rightTarget = randomScoreSecenFunksiya();

    scoreAnimation({
      funksiyaIleRandomSecilecekHedef: leftTarget,
      roundIndex: soldakiSonuncuRound,
      playerId: soldakiSonuncuOyuncu.userId,
      komandaTerefi: "sol",
      setLeft: setSolKomanda,
      setRight: setSagKomanda,
    });

    scoreAnimation({
      funksiyaIleRandomSecilecekHedef: rightTarget,
      roundIndex: sagdakiSonuncuRound,
      playerId: sagdakiSonuncuOyuncu.userId,
      komandaTerefi: "sag",
      setLeft: setSolKomanda,
      setRight: setSagKomanda,
    });

    setTimeout(() => {
      setCempion(
        leftTarget >= rightTarget ? soldakiSonuncuOyuncu.userName : sagdakiSonuncuOyuncu.userName
      );
      setHazirdaOynanir(false);
    }, umumiScoreAnimasiyaMuddeti + 50);
  };
  const novbetiRaunduOynat = () => {
    if (hazirdaOynanir || cempion) return; //*oyun gedrse ve ya cempion artiq seiclibse
    setHazirdaOynanir(true);

    raunduBaslat("sol"); //*else halinda
    raunduBaslat("sag");

    setTimeout(() => {
      finalaBaslaEgerHazirdir();
      if (!cempion) setHazirdaOynanir(false);
    }, umumiScoreAnimasiyaMuddeti + 60);
  };

  const resetGame = () => {
    setSolKomanda([gameDatas.teamA.map((p) => ({ ...p, score: 0 }))]);
    setSagKomanda([gameDatas.teamB.map((p) => ({ ...p, score: 0 }))]);
    setCempion(null);
    setHazirdaOynanir(false);
  };

  return (
    <>
      <Background />
      <section className="gamePage">
        <div className="container">
          <div className="row">
            <div className="leftSide">
              {solKomanda.map((sutun, sutunIndex) => (
                <div
                  key={`sol-${sutunIndex + 1}`}
                  className={`sutun sutun-${sutunIndex + 1}`}
                >
                  {sutun.map((player) => (
                    <GamerCard key={player.userId} user={player} />
                  ))}
                </div>
              ))}
            </div>
            <div className="centerCtrl">
              {!cempion ? (
                <button
                  disabled={hazirdaOynanir}
                  onClick={novbetiRaunduOynat}
                  className="roundButton"
                >
                  {solKomanda.length === 1 && sagKomanda.length === 1
                    ? "Oyuna basla!"
                    : "novbeti round"}
                </button>
              ) : (
                <div className="gameOver">
                  <h3>Champion: {cempion}</h3>
                  <button onClick={resetGame} className="start">oyunu yeniden baslat</button>
                </div>
              )}
            </div>
            <div className="rightSide">
              {sagKomanda.map((sutun, sutunIndex) => (
                <div
                  key={`sag-${sutunIndex + 1}`}
                  className={`sutun sutun-${sutunIndex + 1}`}
                >
                  {sutun.map((player) => (
                    <GamerCard key={player.userId} user={player} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Game;
