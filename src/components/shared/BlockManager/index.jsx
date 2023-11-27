import BrandFooter from '@/components/BrandFooter'
import ItemCards from '@/components/ItemsCards'
import Story from '@/components/Story'
import Video from '@/components/Video'
import FixedButton from '@/components/atoms/FixedButton'
import Form from '@/components/atoms/Form'
import About from '@/components/About'
import BigText from '@/components/BigText'
import Header from '@/components/Header'
import SliderBlock from '@/components/SliderBlock'
import Seo from '@/components/layouts/SEO'
import TextCards from '@/components/TextCards'



const getBlockComponent = ({ __component, ...rest }, index) => {
  let Block;


  // console.log("component", __component)

  switch (__component) {
    case 'blocks.about': Block = About; break;
    case 'blocks.brand-footer': Block = BrandFooter; break;
    case 'blocks.items-cards': Block = ItemCards; break;
    case 'blocks.text-cards': Block = TextCards; break;
    case 'blocks.big-text': Block = BigText; break;
    case 'blocks.video': Block = Video; break;
    case 'blocks.fixed-button': Block = FixedButton; break;
    case 'blocks.form': Block = Form; break;
    case 'blocks.story': Block = Story; break;
    case 'blocks.header': Block = Header; break;
    case 'shared.seo': Block = Seo; break;
    case 'blocks.slider-block': Block = SliderBlock; break;
  }

  return Block ? <Block key={`index-${index}`} {...rest} /> : null;
};

const BlockManager = ({ blocks }) => {
  return <div>{blocks.map(getBlockComponent)}</div>;
};

BlockManager.defaultProps = {
  blocks: [],
};

export default BlockManager;