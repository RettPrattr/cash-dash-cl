import React, {useState} from 'react';

function GameArea(props) {

    const [area, setArea] = useState()

    fetch('/gamearea.svg')
        .then((r) => r.text())
        .then((text) => setArea(text))

      return (
        <>
          <div className="gameArea relative" id='gameArea'>
            <div className='backArea' dangerouslySetInnerHTML={{ __html: area }}></div>
            {/* <div className='point relative rounded' id='gamePoint'><div className='back'></div></div> */}
          </div>
        </>
      )
}

export default GameArea