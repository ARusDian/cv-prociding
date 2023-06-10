import MasterLayoutCSS from '@/Layouts/MasterLayoutCSS';
import React, { useMemo } from 'react';
import "../../css/app.css"
import KeynoteCard from '@/Components/KeynoteCard';
import GalleryCard from '@/Components/GalleryCard';
import LatestPublication from '@/Components/LatestPublication';
import Carousel from 'react-material-ui-carousel';
import moment from 'moment';
import { asset } from '@/Models/Helper';
import { IHomeHeader, IHomeKeynote, IHomeGallery, IHomePublication, IHomeTimeline, IHomeSupport, IHomeNews } from '@/Models/Home';
import News from '@/Components/News';
import {Dialog, DialogContent} from "@mui/material";

interface Props {
  active: string,
  header: IHomeHeader,
  news: IHomeNews,
  keynotes: IHomeKeynote[],
  galleries: IHomeGallery[],
  timelines: IHomeTimeline[],
  publications: IHomePublication[],
  supportedBy: IHomeSupport[]
}


const HomeIndex = ({ active, header, news, keynotes, galleries, timelines, publications, supportedBy }: Props) => {
  const [openGalleryModal, setOpenGalleryModal] = React.useState(false);
  const [galleryIndex, setGalleryIndex] = React.useState(0);

  const slicedSupportedBy = useMemo(() => {
    //@ts-ignore
    const toBeReturned = [];
    //@ts-ignore
    let currentArray = [];
    supportedBy.forEach((item, index) => {
      currentArray.push(item);
      if ((index + 1) % 3 === 0) {
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
    <>
    {/* PaperProps={{ style: {backgroundColor: "transparent", boxShadow: "none"} */}
      <Dialog open={openGalleryModal} onClose={() => setOpenGalleryModal(false)} className='bg-transparent' fullWidth maxWidth="xl" PaperProps={{ style: {backgroundColor: "transparent", boxShadow: "none"}}}>
        <DialogContent className='h-[800px] flex flex-col justify-center'>
        <Carousel
              index={galleryIndex}
              className='bg-red-200 w-10/12 mx-auto '
              height={700}
              animation="slide"
              indicators={false}
              navButtonsAlwaysVisible={true}
              navButtonsProps={{
                style: {
                  backgroundColor: 'transparent',
                  color: '#494949',
                  borderRadius: 0,
                  margin: 0,
                  height: 30,
                  padding: 0,
                  zIndex: 1000
                }
              }}
              NextIcon={
                <div
                  className="bg-opacity-25 bg-gray-200 rounded-full px-4 mr-2 font-mono"
                >
                  {">"}
                </div>
              }
              PrevIcon={
                <div
                  className="bg-opacity-25 bg-gray-200 rounded-full px-4 ml-2 font-mono"
                >
                  {"<"}
                </div>
              }
            >
              {galleries.map((gallery, index) => (
                <img src={gallery.img_path} key={gallery.id} className='object-conatin h-full w-full rounded-lg '/>
              ))}
            </Carousel>
        </DialogContent>
      </Dialog>
      <MasterLayoutCSS active={active}>
        <div className="h-[800px] w-full flex flex-col justify-center items-center relative -z-100">
          <div id='header' className="absolute -z-20 top-0 bottom-0 left-0 right-0 w-full h-full opacity-70" style={{
            backgroundImage: header.background_image_path ? `url(${header.background_image_path})` : "url(" + "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg" + ") center center / cover no-repeat",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundClip: 'border-box',
          }}>
          </div>
          <div className="flex flex-col justify-between items-center gap-2 lg:gap-4 -z-10 w-full">
            <img src={header.logo_path ? header.logo_path : asset('root', 'assets/images/logo.png')} alt="" className='w-auto h-32 xl:h-60 object-contain' />
            <h1 className="text-xl text-center font-bold">{header.date_stamp ? `${moment(header.date_stamp).format("DD MMMM YYYY")}` : moment(new Date().toLocaleDateString()).format("DD MMMM YYYY")}</h1>
            <h1 className="text-4xl xl:text-6xl 2xl:text-7xl font-black w-[60%] text-center break-words"> {header.title ? header.title : "International Conference on Innovation in Education and Pedagogy"}</h1>
            <h1 className="text-base xl:text-xl text-center font-semibold w-[60%] break-words">{header.subtitle}</h1>
          </div>
        </div>
        <div className="w-[80%] sm:w-[70%] mx-auto mt-10">
          <div id="news" className='mb-6'>
            <div className="flex flex-row justify-center p-4">
              <News news={news} />
            </div>
          </div>
          <div id='keynote'>
            <h1 className="text-2xl sm:text-4xl font-black text-center mb-10">KEYNOTE SPEAKERS</h1>
            <div className="flex flex-col gap-14">
              <div className="flex flex-row flex-wrap justify-around gap-3 items-center">
                {keynotes.map((item) => {
                  if (item.rank === 1) {
                    return <KeynoteCard key={item.id} imgSrc={item.img_path} name={item.name} title={item.title} university={item.affiliation} />
                  }
                })}
              </div>
              <div className="flex flex-row flex-wrap justify-around gap-3 items-center">
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
            <h1 className="text-2xl sm:text-4xl font-extrabold text-center mb-10">GALLERY</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center h-fit">
              {/* <div className="flex flex-row flex-wrap md:grid md:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center h-fit"> */}
              {galleries.map((item, index) => (
                <GalleryCard key={item.id} imgSrc={item.img_path} id={index} setGalleryIndex={setGalleryIndex} setOpenGalleryModal={setOpenGalleryModal}/>
              ))}
            </div>
          </div>
          <hr className='border border-gray-100 mt-10' />
          <div id="timeline">
            <div className="w-full flex flex-col gap-4 mt-10 ">
              <h1 className='text-2xl sm:text-4xl font-extrabold text-center '>TIMELINE</h1>
              {timelines.map((item) => (
                <img key={item.id} src={item.img_path} alt="" className='h-full object-contain' />
              ))}
            </div>
          </div>
          <hr className='border border-gray-100 mt-10' />
          <div id="latest-publication" className='mt-10'>
            <h1 className='text-center font-bold text-xl sm:text-4xl uppercase mb-4'>Latest Publication of Participant</h1>
            <div className="flex flex-col xl:flex-row justify-around items-center flex-wrap gap-10 xl:gap-4">
              {publications.map((item) => (
                <LatestPublication key={item.id} imgSrc={item.cover_img_path} linkTo={item.link_to} />
              ))}
            </div>
          </div>
          <hr className='border border-gray-100 mt-10' />
          <div id="supported-by" className='mt-20 mb-4'>
            <h1 className='text-center font-bold text-xl sm:text-3xl mb-2'>Organized and Supported by</h1>
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
                  className="bg-opacity-25 bg-gray-200 rounded-full px-4 mr-7 font-mono"
                >
                  {">"}
                </div>
              }
              PrevIcon={
                <div
                  className="bg-opacity-25 bg-gray-200 rounded-full px-4 ml-7 font-mono"
                >
                  {"<"}
                </div>
              }
            >
              {slicedSupportedBy.map((supportBy, index) => (
                <div key={index} className="flex flex-row justify-around items-center h-full">
                  {supportBy.map(item => (
                    <img key={item.id} src={item.img_path} alt="" className={'object-contain h-full w-[20%] xl:w-[25%]'} />
                  ))}
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </MasterLayoutCSS>
    </>
  )
}

export default HomeIndex