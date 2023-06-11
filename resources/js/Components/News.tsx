import React from 'react'
import { IHomeNews } from '@/Models/Home';


interface Props {
  news: IHomeNews
}

const News = ({ news }: Props) => {
  return (
    <div className='flex flex-col lg:flex-row w-full md:w-[80%] gap-4 h-fit lg:h-[370px]'>
      <div className="lg:h-full w-full lg:w-[60%]">
        <img src={news.image} className='object-contain lg:object-cover h-full w-full' />
      </div>
      <div className="flex flex-col lg:w-[45%] py-2 gap-2 lg:justify-between h-full">
        <div className="flex flex-col gap-2 overflow-hidden">
          <h1 className='font-bold text-lg lg:text-2xl'>{news.title}</h1>
          <p className='break-words h-[100px] lg:h-full overflow-hidden text-sm lg:text-base'> {news.content} </p>
        </div>
        <a href={news.link_to} className='text-sm text-blue-500 hover:text-blue-600'>Read More {">>>"}</a>
      </div>
    </div>
  )
}

export default News