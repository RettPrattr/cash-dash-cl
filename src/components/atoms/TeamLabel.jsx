import React from 'react';
import Link from 'next/link'

function TeamLabel(props) {

    const type = props.type // : number

    return ( 
        <div className={"teamLabel flex flex-row teamLabel-" + type}>
            <div className="container">
                <p>задизайнено и разработано</p>
                <svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M160.367 167.226C179.794 149.658 192 124.255 192 96C192 67.6633 179.723 42.1941 160.197 24.6216C151.397 78.0049 107.585 119.585 53.1316 124.991V181.921C66.0346 188.371 80.5935 192 96 192C110.904 192 125.015 188.604 137.601 182.542C136.88 161.814 129.628 142.745 117.84 127.33C124.665 122.99 131.025 117.984 136.828 112.402C148.889 128.082 157.186 146.807 160.367 167.226ZM28.9807 164.734C11.1017 147.299 0 122.946 0 96C0 69.0541 11.1017 44.7012 28.9807 27.2656V100.689V124.991V164.734ZM53.1316 10.0794V100.689C99.2931 94.9329 135.34 56.6077 137.552 9.43404C124.979 3.38766 110.885 0 96 0C80.5935 0 66.0346 3.62924 53.1316 10.0794Z" fill="black"/></svg>
                <p>командой <b>Капустина</b></p>
            </div>
        </div>
        
    )

}

export default TeamLabel

