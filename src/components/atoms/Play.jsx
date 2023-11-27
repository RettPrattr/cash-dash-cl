import React, {useState} from 'react';

function rand(min, max) {
    let val = Math.random() * (max - min) + min;
    return Math.round(val)
}

function appendHtml(el, str) {
    var div = document.createElement('div'); //container to append to
    div.innerHTML = str;
    while (div.children.length > 0) {
      el.appendChild(div.children[0]);
    }
  }

function generateHash() {
    return '0x' + Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
  }

function clearFill(a) {
    a.forEach((i)=>{
        i.attributes.fill.value = '#061017'
    })
}

function animateWalls(el, a) {
    var offsetAnimation = 100
    var offsetTimeout = offsetAnimation
    el.style.left = '50%'
    el.style.top = '100%'
    console.log(a)
    a.forEach((i, index)=>{
        // el.style=`transition: all cubic-bezier(.2,.6,.5,1) ${offsetAnimation * index / 1000 }s`
        // el.animate(
        //     [
        //         {
        //             left: i[0] + 'px',
        //             top: i[1] + 'px'
        //         }
        //     ], {
        //         duration: index * offsetTimeout,
        //         iterations: 1
        //     }
        // )
        i ? el.style=`transform: rotate(${(i[0]-175)/6}deg)` : null
        setTimeout(()=>{
            el.style.left = i[0] + 'px'
            el.style.top = i[1] + 'px'
        }, index * offsetTimeout)
    })
}

export default function startPlay() {
    let fps = 60
    let hash = generateHash()
    let gameArea = document.querySelector( ".gameArea" )
    appendHtml(gameArea, "<div class='point point-"+ hash +" relative rounded' id='gamePoint-"+ hash +"'><div class='back'></div></div>")
    console.log(hash)
    let area = document.querySelector( ".backArea svg" )
    console.log('POINT', document.querySelector( ".gameArea .point-" + hash))
    let c = document.querySelectorAll( ".backArea svg circle" )
    let circles = []
    c?.forEach((i, index)=>{
        circles.push(i.attributes.r.value)
        i.id = 'area-' + index
        console.log(i.attributes)
    })
    var c0 = document.querySelector( ".gameArea #area-0" )
    var c1 = document.querySelector( ".gameArea #area-1" )
    var c2 = document.querySelector( ".gameArea #area-2" )
    var c3 = document.querySelector( ".gameArea #area-3" )
    var c4 = document.querySelector( ".gameArea #area-4" )
    var c5 = document.querySelector( ".gameArea #area-5" )
    let center = area.clientWidth/2
    
    const result = generateGameResult()
    console.log('play')
    console.log(area.clientWidth, area.clientHeight )
    console.log(result)

    let walls = rand(0,0)
    console.log('Total walls: ' + walls)
    let wallsDir = []
    
    console.log(wallsDir)


    let xy = generateLastPoint(result)
    console.log('XY ' + xy)
    let point = document.querySelector( ".gameArea .point-" + hash)
    console.log(xy, point)

    for (var j=0; j <= walls; j++ ) {
        if (j===walls){
            wallsDir.push(xy)
        } else {
            if (j % 2 == 0 ){
                let dir = rand(1,2)
                if(dir === 1) {
                    wallsDir.push([0,rand(0, area.clientWidth)]) // left
                } else {
                    wallsDir.push([area.clientWidth,rand(0, area.clientWidth)]) // right
                }
            } else {
                let dir = rand(1,2)
                if(dir === 1) {
                    wallsDir.push([rand(0, area.clientWidth), area.clientWidth]) // top
                } else {
                    wallsDir.push([rand(0, area.clientWidth),0]) // bottom                
                }
            }
            
        }
        
    }

    animateWalls(point, wallsDir)

    setTimeout(function(){
        var f = (xy[0]-center)*(xy[0]-center) + (xy[1]-center)*(xy[1]-center)
        console.log(f)
        clearFill([c0,c1,c2,c3,c4,c5])
        if (f <= circles[5]*circles[5]) { c5.attributes.fill.value = '#14261A' }
            else {
                if (f <= circles[4]*circles[4]) { c4.attributes.fill.value = '#14261A' }
                    else {
                        if (f <= circles[3]*circles[3]) { c3.attributes.fill.value = '#14261A' }
                        else {
                            if (f <= circles[2]*circles[2]) { c2.attributes.fill.value = '#14261A' }
                            else {
                                if (f <= circles[1]*circles[1]) { c1.attributes.fill.value = '#14261A' }
                                else {
                                    if (f <= circles[0]*circles[0]) { c0.attributes.fill.value = '#14261A' }
                                }
                            }
                        }
                    }
                }
    }, 850)
    setTimeout(function(){
        point.style.opacity = 0
        setTimeout(() => {
            point.remove()
            clearFill([c0,c1,c2,c3,c4,c5])
        }, 200)
    }, 6900)
}

var promo = false,
    user = {
        in: 1000,
        out: 2000,
        balance: 500,
        rtp: {
            target: 1.1,
            current: 1.2
        }
    },
    rtp = {
        target: 0.8,
        current: 0.7
    }

var GRTPchance = rtp.target / rtp.current,
    PRTPchance = user.rtp.target / user.rtp.current,
    profit = user.in - user.out - user.balance,
    RTP = (user.out + user.balance) / user.in


export function generateGameResult() {
    console.log(`GRTP: ${rtp.target}, AGRTP: ${rtp.current}, PRTP: ${user.rtp.target}, APRTP: ${user.rtp.current}`)
    console.log(`GRTP chance: ${rtp.target / rtp.current}, PRTP chance: ${user.rtp.target / user.rtp.current}`)
    // return rand(0,4)
    if (promo) {
        var weights = [
            0.2, 
            0.1, 
            0.2, 
            0.3, 
            0.2,
            0.2
        ]; // probabilities
    } else {
        var weights = [
            rtp.target / rtp.current > 1 ? 0.1 : 0.4, 
            rtp.target / rtp.current > 1 ? 0.3 : 0.2, 
            rtp.target / rtp.current > 1 ? 0.2 : 0.2, 
            rtp.target / rtp.current > 1 ? 0.2 : 0.1, 
            rtp.target / rtp.current > 1 ? 0.2 : 0.1,
            rtp.target / rtp.current > 1 ? 0.2 : 0.1
        ]; // probabilities
    }
    console.log('WEIGHTS: ' + weights)
    var results = [0, 1, 2, 3, 4]; // values to return
    var num = Math.random(),
        s = 0,
        lastIndex = weights.length - 1;

        
    for (var i = 0; i <= lastIndex; ++i) {
        s += weights[i];
        console.log(`num: ${num}, s: ${s}`)
        if (num < s) {
            console.log('FINAL RESULT' + results[i])
            return results[i];
        }
    }
}

export function generateLastPoint(result) {
    console.log('result: ' + result)
    var winArea = document.querySelector( ".gameArea #area-" + result )
    var insideArea = document.querySelector( ".gameArea #area-" + (result + 1) )
    var s = winArea.attributes.r.value
    var i = insideArea ? insideArea.attributes.r.value : 0
    console.log(s)
    var x = 1000
    var y = 1000
    while((x-175)*(x-175) + (y-175)*(y-175) > s*s || (x-175)*(x-175) + (y-175)*(y-175) < i*i) {
        x = rand(10 + 20 * result, 350 - 20 * result)
        y = rand(10 + 20 * result, 350 - 20 * result)
        console.log('RENEW VALUE ' + [x,y])
        if((x-175)*(x-175) + (y-175)*(y-175) < s*s && (x-175)*(x-175) + (y-175)*(y-175) > i*i ){
            return [x,y]
        }
    }

}


