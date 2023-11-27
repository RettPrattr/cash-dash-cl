import React, { useState } from 'react';
import Button from '@/components/atoms/Button'

function Attention(props) {

    const [visible, setVisible] = useState(true)

    console.log(process.env.API_LINK + props.fetchUrl)

    const type = props.type // : number

    const imageWidth = 100
    const imageHeight = 100

    const attentionText = 'У нас большие скидки!'
    const buttonLink = '#'
    const buttonText = 'Перейти'
    const closeText = 'Закрыть'

    // TYPE 1&2
    if ( type === 1 || type === 2 ) {
        return (
            <section className={'attention attention-' + type + ' flex flex-row ' + (visible === false && ' hidden ')}>
                <div className="container">
                    <div className="flex cd12 justify-between items-center">
                        <p className='attentionText'>{attentionText}</p>
                        <div className="flex flex-row items-center">
                            { buttonText &&
                                <Button type={2} href={buttonLink} text={buttonText}/> }
                            { closeText && 
                                <Button type={4} onClick={() => setVisible(false)} text={closeText}/> }
                        </div>
                    </div>
                </div>
            </section>
        )}

    // TYPE 3
    if ( type === 3 ) {
        return (
            <section className='attention attention-2 flex flex-row'>
                <div className="container">
                    <div className="cd12 justify-between">
                    </div>
                </div>
            </section>
        )}
}

export default Attention