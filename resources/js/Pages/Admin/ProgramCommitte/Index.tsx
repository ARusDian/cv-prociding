import ContentCard from '@/Components/Dashboard/ContentCard';
import MainDashboardAdminTailwind from '@/Layouts/MainDashboardAdminTailwind'
import React from 'react';
import "../../../../css/app.css";
import route from 'ziggy-js';

const content = [1, 2, 3];

interface Props {
  contents: [{
    id: number,
    created_at: Date,
    is_active: boolean,
  }]
}

const Index = ({ contents }: Props) => {
  return (
    <div className='overflow-hidden font-roboto'>
      <MainDashboardAdminTailwind>
        <div className="flex flex-row gap-4 items-center">
          <p className='font-bold text-2xl'>Program Comitte</p>
          <a href={route("proc.create")} className='py-2 px-4 rounded-full text-2xl bg-[#FFA500] hover:bg-[#ffc14d] '>+</a>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {contents && contents.map((content) => (
            <ContentCard key={content.id} content={content} editURL={route("proc.edit", content.id)} />
          ))}
          {/* {content.map(e => (
            <ContentCard key={e} editURL={route("proc.edit", e)} />
          ))} */}
        </div>
      </MainDashboardAdminTailwind>
    </div>
  )
}

export default Index