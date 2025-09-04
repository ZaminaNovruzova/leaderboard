const Background = () => {
  return (
    <div className="bg-bracket">
      {/* <!-- Mərkəzdə ziqzaq + top (SVG) --> */}
      <svg className="crest" viewBox="0 0 100 100" aria-hidden="true">
        {/* <!-- Qızılı kontur üçün daha qalın xətt --> */}
        <polyline
          className="zigzag gold"
          points="50,0 56,8 44,16 56,24 44,32 56,40 44,48 56,56 44,64 56,72 44,80 50,100"
        />
        {/* <!-- Ağ “iç” xətt --> */}
        <polyline
          className="zigzag white"
          points="50,0 56,8 44,16 56,24 44,32 56,40 44,48 56,56 44,64 56,72 44,80 50,100"
        />

        {/* <!-- Mərkəzdə futbol topu --> */}
        <g className="ball">
          <circle cx="50" cy="50" r="13" fill="#fff" stroke="#d4a01e" />
          {/* <!-- sadələşdirilmiş panellər --> */}
          <polygon points="50,40 54,43 53,48 47,48 46,43" fill="#d4a01e" />
          <polygon points="58,45 61,49 59,53 55,52 56,47" fill="#d4a01e" />
          <polygon points="42,45 44,47 45,52 41,53 39,49" fill="#d4a01e" />
          <polygon
            points="45,55 50,57 55,55 54,60 50,62 46,60"
            fill="#d4a01e"
          />
        </g>
      </svg>
    </div>
  );
};

export default Background;
