// сюда импортим ВСЕ блоки проекта

import About from "@/components/About";
import Attention from "@/components/Attention";
import BigFooter from "@/components/BigFooter";



const getBlockComponent = ({ __component, ...rest}, index) => {
    let Block
    switch (__component) {
        case 'blocks.about': Block = About; break;
        case 'blocks.attention': Block = Attention; break;
        case 'blocks.bigFooter': Block = BigFooter; break;
        case 'blocks.hero': Block = Hero; break;
        case 'blocks.hero': Block = Hero; break;
        case 'blocks.hero': Block = Hero; break;
        case 'blocks.hero': Block = Hero; break;
        case 'blocks.hero': Block = Hero; break;
        case 'blocks.hero': Block = Hero; break;
        case 'blocks.hero': Block = Hero; break;
        case 'blocks.hero': Block = Hero; break;

    }
    return Block ? <Block key={index} {...rest} /> : null
}

const BlockManager = ({ blocks }) => { return <div>{blocks.map(getBlockComponent)}</div> }
BlockManager.defaultProps = { blocks: [] }
export default BlockMananger

export function redirectToHomepage() {
    return {
        redirect: {
            destination: `/`,
            permanent: false
        }
    }
}

export function getData(link, locale) {
    const linkToReturn = `/${link}?lang=${locale}`
    const apiUrl = `/pages?link=${link}&_locale=${locale}`
    return {
        data: getStrapiURL(apiUrl),
        link: linkToReturn
    }
}