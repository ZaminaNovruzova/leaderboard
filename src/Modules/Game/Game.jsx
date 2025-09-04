import { useState } from "react";
import { gameDatas } from "../../db/dataBase";
import GamerCard from "./components/GamerCard";
import Background from "../../components/Background";
const Game = () => {

  //* variables
  const umumiScoreAnimasiyaMuddeti = 2000; //*ms
  const neceMilliSeconddaBirArtimOlacaq = 20; //*ms

  const [solKomanda, setsolKomanda] = useState([
    gameDatas.teamA.map((oyuncu) => ({ ...oyuncu, score: 0 })),
  ]);

  const [sagKomanda, setsagKomanda] = useState([
    gameDatas.teamB.map((oyuncu) => ({ ...oyuncu, score: 0 })),
  ]);
  const [hazirdaOynanir, setHazirdaOynanir] = useState(false);
  const [cempion, setCempion] = useState(null);

  const randomScoreSecenFunksiya = () => {
    Math.floor(Math.random() * 3000 + 1); //*max 2999 verir deye+1 yazdim ki max 3000 olsun
  };

  const scoreAnimation = (randomSecilenHedef, raundIndexi, playerId, teref) => {
    let cariScore = 0;
    const neceDefeArtimOlacaq = Math.max(
      1,
      Math.floor(umumiScoreAnimasiyaMuddeti / neceMilliSeconddaBirArtimOlacaq)
    ); //*en azi 1 addim olmalidir 0 addim ola bilmez
    const herDefeNeQederArtacaq = Math.ceil(
      randomSecilenHedef / neceDefeArtimOlacaq
    );
    const interval = setInterval(() => {
      cariScore += herDefeNeQederArtacaq; //*her millisaniyede meselen 100 addim artirir
      const gosterilecekScore =
        cariScore >= randomSecilenHedef ? randomSecilenHedef : cariScore; //*hedefe beraber olana qeder artir

      const raunddakiScorelariYenile = (evvelkiRaund) => {
        const copy = evvelkiRaund.map((raund, mapinRaundIndexi) => {
          if (mapinRaundIndexi !== raundIndexi) {
            return raund;
          } else {
            return raund.map((oyuncu) => {
              console.log(oyuncu, "salam");
              if ((oyuncu.userId = playerId)) {
                return { ...oyuncu, score: gosterilecekScore };
              } else {
                return oyuncu;
              }
            });
          }
        });
        console.log(copy, "sss");
        return copy;
      };

      if (teref === "sol") {
        setsolKomanda(raunddakiScorelariYenile);
      } else {
        setsagKomanda(raunddakiScorelariYenile);
      }
      if (gosterilecekScore === randomSecilenHedef) {
        clearInterval(interval); //*burda ne yazilacaq
      }
    }, neceMilliSeconddaBirArtimOlacaq);
  };

  const raunduBaslat = (hansiTeref) => {
    const indikiRaundlar = hansiTeref === "sol" ? solKomanda : sagKomanda;
    const RaundlariYenile =
      hansiTeref === "sol" ? setsolKomanda : setsagKomanda;

    const roundColumnIndex = indikiRaundlar.length - 1;
    console.log(roundColumnIndex, "bu round indexi");
    const cariRoundColumn = indikiRaundlar[roundColumnIndex];
    if (!cariRoundColumn || cariRoundColumn.length <= 1) return;

    const hedefler = cariRoundColumn.map(() => randomScoreSecenFunksiya());
    cariRoundColumn.forEach((player, index) =>
      scoreAnimation(
        roundColumnIndex,
        hansiTeref,
        player.userId,
        hedefler[index]
      )
    );
    const winners = [];
    for (let i = 0; i < cariRoundColumn.length; i += 2) {
      const birinciOyuncu = cariRoundColumn[i];
      const ikinciOyuncu = cariRoundColumn[i + 1];
    }
    if (!ikinciOyuncu) {
      winners.push({ ...birinciOyuncu, score: 0 });
      continue;
    }
    let winner;
    if (hedefler[i] >= hedefler[i + 1]) {
      winner = { ...birinciOyuncu, score: 0 };
    } else {
      winner = { ...ikinciOyuncu, score: 0 };
    }
    winners.push(winner);
  };
    setTimeout(() => {
    RaundlariYenile((prev) => [...prev, winners]);
  }, DURATION + 50);

const novbetiRaunduOynat = () => {
  if (busy || champion) return;
  setBusy(true);

  raunduBaslat("left");
  raunduBaslat("right");

  setTimeout(() => {
    const leftSide = solKomanda[solKomanda.length - 1];
    const rightSide = sagKomanda[sagKomanda.length - 1];
    const leftSolo = Array.isArray(leftSide) && leftSide.length === 1 ? leftSide[0] : null;
    const rightSolo = Array.isArray(rightSide) && rightSide.length === 1 ? rightSide[0] : null;

        if (leftSolo && rightSolo && !champion) {
      const leftTarget = randomScoreSecenFunksiya()
      const rightTarget = randomScoreSecenFunksiya();

      animatePlayer("left", leftRounds.length - 1, leftSolo.userId, leftTarget);
      animatePlayer("right", rightRounds.length - 1, rightSolo.userId, rightTarget);

      setTimeout(() => {
        setChampion(
          leftTarget >= rightTarget ? leftSolo.userName : rightSolo.userName
        );
        setBusy(false);
      }, DURATION + 50);
    } else {
      setBusy(false);
    }
  }, DURATION + 60);
};

const resetGame = () => {
  setLeftRounds([gameDatas.teamA.map((p) => ({ ...p, score: 0 }))]);
  setRightRounds([gameDatas.teamB.map((p) => ({ ...p, score: 0 }))]);
  setChampion(null);
  setBusy(false);
};
  return (
    <>
      <Background />
      <section className="gamePage">
        <div className="container">
          <div className="row">
            <div className="leftSide"></div>
            <button className="roundButton"></button>
            <div className="rightSide"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Game;

//     const colIdx = getRounds.length - 1;
//     const currentCol = getRounds[colIdx];
//     if (!currentCol || currentCol.length <= 1) return; // artıq təkdirsə oynatma

//     // Hədəfləri əvvəlcədən təyin edək və animasiyaya başlayaq
//     const targets = currentCol.map(() => randTarget());
//     currentCol.forEach((p, i) =>
//       animatePlayer(side, colIdx, p.userId, targets[i])
//     );

//     // Qalibləri hesabla (yan-yana olan cütlüklər)
//     const winners = [];
//     for (let i = 0; i < currentCol.length; i += 2) {
//       const a = currentCol[i];
//       const b = currentCol[i + 1];
//       if (!b) {
//         // tək qalan avtomatik keçir
//         winners.push({ ...a, score: 0 });
//         continue;
//       }
//       const winner =
//         targets[i] >= targets[i + 1] ? { ...a, score: 0 } : { ...b, score: 0 };
//       winners.push(winner);
//     }

//     // Animasiya bitdikdən sonra növbəti sütunu əlavə et
//     setTimeout(() => {
//       setRounds((prev) => [...prev, winners]);
//     }, DURATION + 50);
//   };

//   // Hər iki tərəfdə round oynat
//   const playNextRound = () => {
//     if (busy || champion) return;
//     setBusy(true);

//     playSideRound("left");
//     playSideRound("right");

//     // Final yoxlaması (hər iki tərəfdə 1 nəfər qalanda)
//     setTimeout(() => {
//       const l = leftRounds[leftRounds.length - 1];
//       const r = rightRounds[rightRounds.length - 1];
//       const leftSolo =
//         Array.isArray(l) && l.length === 1 ? l[0] : null;
//       const rightSolo =
//         Array.isArray(r) && r.length === 1 ? r[0] : null;

//       // Final varsa, mərkəzdə iki nəfəri də animasiya ilə “oynat” və çempionu çıxar
//       if (leftSolo && rightSolo && !champion) {
//         const lTarget = randTarget();
//         const rTarget = randTarget();

//         // Finalı vizual kartlara yazmaq üçün son sütundakı həmin oyunçuların score-larını yenilə
//         animatePlayer("left", leftRounds.length - 1, leftSolo.userId, lTarget);
//         animatePlayer(
//           "right",
//           rightRounds.length - 1,
//           rightSolo.userId,
//           rTarget
//         );

//         setTimeout(() => {
//           setChampion(
//             lTarget >= rTarget ? leftSolo.userName : rightSolo.userName
//           );
//           setBusy(false);
//         }, DURATION + 50);
//       } else {
//         setBusy(false);
//       }
//     }, DURATION + 60);
//   };

//   const resetGame = () => {
//     setLeftRounds([gameDatas.teamA.map((p) => ({ ...p, score: 0 }))]);
//     setRightRounds([gameDatas.teamB.map((p) => ({ ...p, score: 0 }))]);
//     setChampion(null);
//     setBusy(false);
//   };

//   return (
//     <>
//       <Background />
//       <section className="gamePage">
//         <div className="container">
//           <div className="row" style={{ display: "flex", justifyContent: "space-between" }}>
//             {/* SOL — bütün round sütunları */}
//             <div className="leftSide" style={{ display: "flex", gap: 60 }}>
//               {leftRounds.map((col, ci) => (
//                 <div key={`L-${ci}`} className={`col col-${ci}`}>
//                   {col.map((p) => (
//                     <GamerCard key={p.userId} user={p} />
//                   ))}
//                 </div>
//               ))}
//             </div>

//             {/* Mərkəz nəzarət düymələri */}
//             <div className="centerCtrl" style={{ alignSelf: "center", textAlign: "center" }}>
//               {!champion ? (
//                 <button disabled={busy} onClick={playNextRound} className="start">
//                   {leftRounds.length === 1 && rightRounds.length === 1
//                     ? "Oyuna başla!"
//                     : "Növbəti round"}
//                 </button>
//               ) : (
//                 <>
//                   <h2 style={{ color: "#fff", marginBottom: 8 }}>
//                     Champion: {champion}
//                   </h2>
//                   <button onClick={resetGame}>Yenidən başlat</button>
//                 </>
//               )}
//             </div>

//             {/* SAĞ — bütün round sütunları */}
//             <div className="rightSide" style={{ display: "flex", gap: 60 }}>
//               {rightRounds.map((col, ci) => (
//                 <div key={`R-${ci}`} className={`col col-${ci}`}>
//                   {col.map((p) => (
//                     <GamerCard key={p.userId} user={p} />
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
