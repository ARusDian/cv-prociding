import ContentCard from '@/Components/Dashboard/ContentCard';
import MainDashboardAdminTailwind from '@/Layouts/MainDashboardAdminTailwind'
import Banner from '@/Components/Jetstream/Banner';
import React, { useEffect, useState } from 'react';
import "../../../../css/app.css";
import route from 'ziggy-js';

interface Props {
  contents: [{
    id: number,
    created_at: Date,
    content: string,
    is_active: boolean,
  }]
}

const Index = ({ contents }: Props) => {

  return (
    <div className='overflow-hidden font-roboto'>
      <MainDashboardAdminTailwind>
        <div className="flex flex-row gap-4 items-center">
          <p className='font-bold text-2xl'>Program Committe</p>
          <a href={route("proc.create")} className='py-2 px-4 rounded-full text-2xl bg-green-500 hover:bg-[#FFA500] '>+</a>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {contents && contents.map((content) => (
            <ContentCard key={content.id} content={content} editURL={route("proc.edit", content.id)} toggleActiveURL='proc.toggle_active'/>
          ))}
        </div>
      </MainDashboardAdminTailwind>
    </div>
  )
}

export default Index