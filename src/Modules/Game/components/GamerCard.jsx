
const GamerCard = ({ user }) => {
  const { userName,score } = user;
 

  return (
    <div className="round">
      <div className="gamerBox">
        <h4 className="userName">Name: {userName}</h4>
        <span className="score">Score: {score}</span>
      </div>
      <div className="connector"></div>
    </div>
  );
};

export default GamerCard;
