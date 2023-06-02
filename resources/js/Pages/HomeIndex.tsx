import MasterLayoutCSS from '@/Layouts/MasterLayoutCSS';
import React, { useEffect } from 'react';
import "../../css/app.css"
import KeynoteCard from '@/Components/KeynoteCard';
import GalleryCard from '@/Components/GalleryCard';
import LatestPublication from '@/Components/LatestPublication';
import Carousel from 'react-material-ui-carousel';
import route from 'ziggy-js';
import { asset } from '@/Models/Helper';

interface Props {
  active: string
}

const galleryContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


const HomeIndex = ({ active }: Props) => {
  return (
    <MasterLayoutCSS active={active}>
      <div id='header' className="flex flex-col justify-center items-center mt-[65px] h-[700px]" style={{
        backgroundImage: "url(" + "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg" + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="flex flex-col justify-between items-center gap-4">
            <img src={asset('root', 'assets/images/logo.png')} alt="" className='w-auto h-60 object-contain' />
          <h1 className="text-xl text-center">{new Date().toLocaleDateString()}</h1>
          <h1 className="text-7xl font-bold text-center w-[60%]">International Conference on Innovation in Education and Pedagogy</h1>
          <h1 className="text-lg text-center w-[60%]">The 1st ICIEP in collaboration with TING-XI 2019
            Atria Hotel Serpong, Indonesia</h1>
        </div>
      </div>
      <div className="w-[70%] mx-auto mt-4">
        <div id='keynote'>
          <h1 className="text-4xl font-extrabold text-center mb-10">KEYNOTE SPEAKER</h1>
          <div className="flex flex-col gap-14">
            <div className="flex flex-row justify-around gap-3 items-center">
              <KeynoteCard imgSrc='https://iciep.researchsynergy.org/wp-content/uploads/2019/08/WhatsApp-Image-2019-07-26-at-19.34.12-150x150.jpeg' name='Prof. Orat Dorajat M.Bus Ph.D' title='Rector' university='Universitas Terbuka' />
              <KeynoteCard imgSrc='https://iciep.researchsynergy.org/wp-content/uploads/2019/08/WhatsApp-Image-2019-07-26-at-19.34.12-150x150.jpeg' name='Prof. Orat Dorajat M.Bus Ph.D' title='Rector' university='Universitas Terbuka' />
            </div>
            <div className="flex flex-row justify-around gap-3 items-center">
              <KeynoteCard imgSrc='https://iciep.researchsynergy.org/wp-content/uploads/2019/08/WhatsApp-Image-2019-07-26-at-19.34.12-150x150.jpeg' name='Prof. Orat Dorajat M.Bus Ph.D' title='Rector' university='Universitas Terbuka' />
              <KeynoteCard imgSrc='https://iciep.researchsynergy.org/wp-content/uploads/2019/08/WhatsApp-Image-2019-07-26-at-19.34.12-150x150.jpeg' name='Prof. Orat Dorajat M.Bus Ph.D' title='Rector' university='Universitas Terbuka' />
              <KeynoteCard imgSrc='https://iciep.researchsynergy.org/wp-content/uploads/2019/08/WhatsApp-Image-2019-07-26-at-19.34.12-150x150.jpeg' name='Prof. Orat Dorajat M.Bus Ph.D' title='Rector' university='Universitas Terbuka' />
            </div>
          </div>
        </div>
        <div id="gallery" className='mt-10'>
          <h1 className="text-4xl font-extrabold text-center mb-10">GALLERY</h1>
          <div className="grid grid-cols-4 grid-rows-3 gap-6 justify-items-center h-fit">
            {galleryContent.map((item) => (
              <GalleryCard key={item} imgSrc='https://www.ruparupa.com/blog/wp-content/uploads/2022/03/white-wall-living-room-have-sofa-decoration-3d-rendering.jpg' />
            ))}
          </div>
        </div>
        <div id="timeline">
          <div className="w-full flex flex-col gap-4 mt-10 ">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShg_WH3T_eoKPs7bFvKIh7qB8Ohk_yrnkz1w&usqp=CAU" alt="" className='object-cover h-80' />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2gOp_o0HxgwsnD2iyj3XXC2eFq5Q8KyYD6A&usqp=CAU" alt="" className='object-cover h-full' />
          </div>
        </div>
        <div id="latest-publication" className='mt-10'>
          <LatestPublication />
        </div>
        <div id="supported-by" className='mt-10'>
          <h1 className='text-center font-bold text-4xl'>Organized and Supported by</h1>
          <Carousel
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
              <button
                className="bg-opacity-25 bg-gray-700 rounded-full px-4 mr-7 font-mono"
              >
                {">"}
              </button>
            }
            PrevIcon={
              <button
                className="bg-opacity-25 bg-gray-700 rounded-full px-4 ml-7 font-mono"
              >
                {"<"}
              </button>
            }
          >
            <div className="flex flex-row justify-around items-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShg_WH3T_eoKPs7bFvKIh7qB8Ohk_yrnkz1w&usqp=CAU" alt="" className={'object-contain h-80 w-[33.3%]'} />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2gOp_o0HxgwsnD2iyj3XXC2eFq5Q8KyYD6A&usqp=CAU" alt="" className='object-contain h-80 w-[33.3%] ' />
            </div>
            <div className="flex flex-row justify-around items-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShg_WH3T_eoKPs7bFvKIh7qB8Ohk_yrnkz1w&usqp=CAU" alt="" className={'object-contain h-80 w-[33%]'} />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2gOp_o0HxgwsnD2iyj3XXC2eFq5Q8KyYD6A&usqp=CAU" alt="" className='object-contain h-80 w-[33%] ' />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2gOp_o0HxgwsnD2iyj3XXC2eFq5Q8KyYD6A&usqp=CAU" alt="" className='object-contain h-80 w-[33%] ' />
            </div>
          </Carousel>
        </div>
      </div>
    </MasterLayoutCSS>
  )
}

export default HomeIndex