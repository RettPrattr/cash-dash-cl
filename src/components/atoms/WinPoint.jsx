import React from 'react';

function WinPoint(props) {

      return (
        <>
            <div className={"winPoint rounded w-fit mrs x" + props.value
                + (props.value === 0.5 ? ' gray' : '')
                + (props.value === 1 ? ' gray' : '')
                + (props.value === 2 ? ' violent' : '')
                + (props.value === 3 ? ' violent' : '')
                + (props.value === 5 ? ' green' : '')
            }>
                <p><span>x{props.value}</span></p>
            </div>
        </>
      )
}

export default WinPoint