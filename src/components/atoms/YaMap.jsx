import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
// import SocialIcons from './atoms/SocialIcons.jsx';



export default function YaMap(props) {

    // console.log(props.data2)

    const defaultState = {
        center: [55.710129, 37.654610],
        zoom: 15,
        controls: []
    }



    return (
        <section className="map cd12 relative">
            <div className={'map__map relative w-full'}>
                {/* <img src={mask.src} className='map__mask block absolute' /> */}
                <YMaps height={'440px'} query={{ apikey: 'fe365efb-ab51-440e-a7d1-c6b999dd3f87' }}>
                    <Map height={'440px'} defaultState={defaultState}>
                        <Placemark
                            geometry={[55.710129, 37.654610]}
                            options={{
                                iconLayout: 'default#image',
                                iconImageSize: [40, 40]
                            }} />
                        <ZoomControl options={{ float: "right" }} />
                    </Map>
                </YMaps>
            </div>
        </section>
    )
}