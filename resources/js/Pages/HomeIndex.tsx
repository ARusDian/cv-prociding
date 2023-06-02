import MasterLayoutCSS from '@/Layouts/MasterLayoutCSS';
import React, { useMemo } from 'react';
import "../../css/app.css"
import KeynoteCard from '@/Components/KeynoteCard';
import GalleryCard from '@/Components/GalleryCard';
import LatestPublication from '@/Components/LatestPublication';
import Carousel from 'react-material-ui-carousel';
import { asset } from '@/Models/Helper';
import { IHomeHeader, IHomeKeynote, IHomeGallery, IHomePublication, IHomeTimeline, IHomeSupport } from '@/Models/Home';

interface Props {
  active: string,
  header: IHomeHeader,
  keynotes: IHomeKeynote[],
  galleries: IHomeGallery[],
  timelines: IHomeTimeline[],
  publications: IHomePublication[],
  supportedBy: IHomeSupport[]
}


const HomeIndex = ({ active, header, keynotes, galleries, timelines, publications, supportedBy }: Props) => {
  const slicedSupportedBy = useMemo(() => {
    //@ts-ignore
    const toBeReturned = [];
    //@ts-ignore
    let currentArray = [];
    supportedBy.forEach((item, index) => {
      currentArray.push(item);
      if ((index + 1) % 4 === 0) {
        //@ts-ignore
        toBeReturned.push(currentArray);
        currentArray = [];
      }
    });
    //@ts-ignore
    if (currentArray.length > 0) toBeReturned.push(currentArray);
    //@ts-ignore
    return toBeReturned;
  }, [supportedBy]);

  return (
    <MasterLayoutCSS active={active}>
      <div className="relative flex flex-col justify-center items-center mt-[65px] h-[700px]">
        <div id='header' className="absolute -z-20 top-0 bottom-0 left-0 right-0 w-full h-full opacity-50" style={{
          backgroundImage: header.background_image_path ? `url(${header.background_image_path})` : "url(" + "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg" + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}>
        </div>
        <div className="flex flex-col justify-between items-center gap-4">
          <img src={header.logo_path ? header.logo_path : asset('root', 'assets/images/logo.png')} alt="" className='w-auto h-60 object-contain' />
          <h1 className="text-xl text-center font-bold">{header.date_stamp ? header.date_stamp : new Date().toLocaleDateString()}</h1>
          <h1 className="text-7xl font-black w-[60%] text-center break-words"> {header.title ? header.title : "International Conference on Innovation in Education and Pedagogy"}</h1>
          <h1 className="text-xl text-center font-bold w-[60%] break-words">{header.subtitle}</h1>
        </div>
      </div>
      <div className="w-[70%] mx-auto mt-10">
        <div id='keynote'>
          <h1 className="text-4xl font-black text-center mb-10">KEYNOTE SPEAKERS</h1>
          <div className="flex flex-col gap-14">
            <div className="flex flex-row justify-around gap-3 items-center">
              {keynotes.map((item) => {
                if (item.rank === 1) {
                  return <KeynoteCard key={item.id} imgSrc={item.img_path} name={item.name} title={item.title} university={item.affiliation} />
                }
              })}
            </div>
            <div className="flex flex-row justify-around gap-3 items-center">
              {keynotes.map((item) => {
                if (item.rank === 2) {
                  return <KeynoteCard key={item.id} imgSrc={item.img_path} name={item.name} title={item.title} university={item.affiliation} />
                }
              })}
            </div>
          </div>
        </div>
        <hr className='border border-gray-100 mt-10' />
        <div id="gallery" className='mt-10'>
          <h1 className="text-4xl font-extrabold text-center mb-10">GALLERY</h1>
          <div className="grid grid-cols-4 gap-6 justify-items-center h-fit">
            {galleries.map((item) => (
              <GalleryCard key={item.id} imgSrc={item.img_path} />
            ))}
          </div>
        </div>
        <div id="timeline">
          <div className="w-full flex flex-col gap-4 mt-10 ">
            <h1 className='text-4xl font-extrabold text-center '>TIMELINE</h1>
            {timelines.map((item) => (
              <img key={item.id} src={item.img_path} alt="" className='h-[600px] object-contain' />
            ))}
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShg_WH3T_eoKPs7bFvKIh7qB8Ohk_yrnkz1w&usqp=CAU" alt="" className='object-cover h-80' />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2gOp_o0HxgwsnD2iyj3XXC2eFq5Q8KyYD6A&usqp=CAU" alt="" className='object-cover h-full' /> */}
          </div>
        </div>
        <div id="latest-publication" className='mt-10'>
          <h1 className='text-center font-bold text-4xl uppercase mb-4'>Latest Publication of Participant</h1>
          <div className="flex flex-row justify-around items-center gap-4">
            {publications.map((item) => (
              <LatestPublication key={item.id} imgSrc={item.cover_img_path} linkTo={item.link_to} />
            ))}
          </div>
        </div>
        <div id="supported-by" className='mt-20'>
          <h1 className='text-center font-bold text-3xl mb-2'>Organized and Supported by</h1>
          <Carousel
            height={250}
            autoPlay={true}
            animation="slide"
            navButtonsAlwaysVisible={true}
            navButtonsProps={{
              style: {
                backgroundColor: 'transparent',
                color: '#494949',
                borderRadius: 0,
                margin: 0,
                width: 30,
                height: 30,
                padding: 0,
                zIndex: 1000
              }
            }}
            indicatorContainerProps={{
              style: {
                marginTop: '-5', // 5
                textAlign: 'center', // 4
                zIndex: '1000'
              }

            }}
            NextIcon={
              <div
                className="bg-opacity-25 bg-gray-700 rounded-full px-4 mr-7 font-mono"
              >
                {">"}
              </div>
            }
            PrevIcon={
              <div
                className="bg-opacity-25 bg-gray-700 rounded-full px-4 ml-7 font-mono"
              >
                {"<"}
              </div>
            }
          >
            {slicedSupportedBy.map((supportBy, index) => (
              <div key={index} className="flex flex-row justify-around items-center h-full">
                {supportBy.map(item => (
                  <img key={item.id} src={item.img_path} alt="" className={'object-contain h-full w-[24%]'} />
                ))}
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </MasterLayoutCSS>
  )
}

export default HomeIndex