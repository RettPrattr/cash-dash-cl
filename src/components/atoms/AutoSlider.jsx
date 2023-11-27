import useWindowDimensions from '../hooks/useWindowDimensions'
import Image from 'next/image'
import Flickity from 'react-flickity-component'
import findImageUrl from '../utils/findImageUrl'


export default function AutoSlider (images, cl) {

    const [width, height] = useWindowDimensions();

    const title = 'We are creating a smarter, greener energy future, today'
    const subtitle = 'dhuiwhdiuawhd'
    const text = 'Technology that brings the utility to the customer, and revenue to grid resources'
    const buttonText = 'Start now'


    // console.log("IMAGES", images.images.data.length)


    // console.log("HERE AUTOO,", images)

    const slides = [
        {
            src: 'image',
            description: 'Lorem ipsum lorem ipsum dolores el amet de candido',
            title: 'Коллаборация ТЦ Неглинная и Сандуны'
        },
        {
            src: 'image',
            description: 'We are creating a smarter, greener energy future, today',
            title: 'Коллаборация Капустин и Сандуны'
        },
        {
            src: 'image',
            description: 'Technology that brings the utility to the customer',
            title: 'Коллаборация ТЦ Неглинная и Капустин'
        }
    ]

    // console.log("VALUE", findImageUrl(images, 'url'))

    // const slideNoSlider = [
    //     {
    //         src: 'case-inc88-slider-1',
    //         description: 'Lorem ipsum lorem ipsum dolores el amet de candido',
    //         title: 'Коллаборация ТЦ Неглинная и Сандуны'
    //     },
    //     {
    //         src: 'case-inc88-slider-2',
    //         description: 'We are creating a smarter, greener energy future, today',
    //         title: 'Коллаборация Капустин и Сандуны'
    //     },
    //     {
    //         src: 'case-inc88-slider-3',
    //         description: 'Technology that brings the utility to the customer',
    //         title: 'Коллаборация ТЦ Неглинная и Капустин'
    //     }
    // ]

    const flickityOptions = {
        initialIndex: 1,
        wrapAround: true,
        // autoPlay: 2000
    }

    return (
        <section className={'AutoSlider'}>      
                
            {images.images.data.length === 1 ? <div className='flex flex-row'>
                            {/* <div className="title cd4 cm4 flex flex-col justify-end mbl">
                                <Image quality={100} width={1000} className='logo mb' height={100} src='/images/image.webp'></Image>
                                <h2>{slides[0].title}</h2>
                            </div> */}
                            <div className="w-full">
                                <Image
                                    className='photo'
                                    src={findImageUrl(images, 'url')}                                    
                                    width={700}
                                    height={400}
                                    quality={100}
                                    alt={''}
                                />
                            </div>
                            {/* <div className="description cd4 cm4 mtl">
                                <h4>{slides[0].description}</h4>
                            </div> */}
                        </div> : 
                        <Flickity
                            className={'carousel relative'} // default ''
                            elementType={'div'} // default 'div'
                            options={flickityOptions} // takes flickity options {}
                            disableImagesLoaded={false} // default false
                            reloadOnUpdate={true}
                        >
                        {images?.images?.data?.map((s, i) => {
                            console.log(findImageUrl(s, 'url'))
                            return (
                                // <div className="slider-slide">
                                    <div key={i} className={'flex slider w-full items-center justify-center' + (width > 800 ? ' flex-row' : ' flex-col')}>
                                        {/* <div className={"title cd4 cm4 flex flex-col justify-end" + (width > 800 ? '  mbl' : ' mb mt')}>
                                            <Image quality={100} width={1000} className='logo mb' height={100} src='/images/image.webp'></Image>
                                            <h2>{s.title}</h2>
                                        </div> */}
                                        <div className="con">
                                            <Image
                                                className='photo'
                                                src={findImageUrl(s, 'url')}                                    
                                                width={700}
                                                height={400}
                                                quality={100}
                                                alt={''}
                                            />
                                        </div>
                                        {/* <div className={"description cd4 cm4 mtl" + + (width > 800 ? '  mtl' : ' mt mbm')}>
                                            <h4>{s.description}</h4>
                                        </div> */}
                                    </div>
                                // {/* </div> */}
                            )
                        })}
                        </Flickity>
            }
        </section>
    )
}