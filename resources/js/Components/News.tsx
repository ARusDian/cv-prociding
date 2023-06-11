import React from 'react'
import { IHomeNews } from '@/Models/Home';


interface Props {
  news: IHomeNews
}

const News = ({ news }: Props) => {
  console.log(news);
  return (
    <div className='flex flex-row w-[80%] gap-4 h-[370px]'>
      <div className="h-full w-[60%]">
        <img src={news.image} className='object-cover h-full w-full' />
      </div>
      <div className="flex flex-col w-[45%] py-2 gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <h1 className='font-bold text-2xl'>{news.title}</h1>
          <p> {news.content} </p>
        </div>
        <a href={news.link_to} className='text-sm text-blue-500 hover:text-blue-600'>Read More {">>>"}</a>
      </div>
    </div>
  )
}

export default News