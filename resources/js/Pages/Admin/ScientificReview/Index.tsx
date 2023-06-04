import ContentCard from '@/Components/Dashboard/ContentCard';
import MainDashboardAdminTailwind from '@/Layouts/MainDashboardAdminTailwind'
import React from 'react';
import "../../../../css/app.css";
import route from 'ziggy-js';
import { InertiaLink } from '@inertiajs/inertia-react';
interface Props {
  contents: [{
    id: number,
    created_at: Date,
    content: string,
    is_active: boolean,
  }]
  // success?: string
}

const Index = ({ contents }: Props) => {
  return (
    <div className='overflow-hidden font-roboto'>
      <MainDashboardAdminTailwind>
        {/* <Banner /> */}
        <div className="flex flex-row gap-4 items-center">
          <p className='font-bold text-2xl'>Scientific Review</p>
          <InertiaLink href={route("sci-rev.create")} className='py-2 px-4 rounded-full text-2xl bg-green-500 hover:bg-[#FFA500] '>+</InertiaLink>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {contents && contents.map((content) => (
            <ContentCard key={content.id} content={content} editURL={route("sci-rev.edit", content.id)} toggleActiveURL='sci-rev.toggle_active' />
          ))}
        </div>
      </MainDashboardAdminTailwind>
    </div>
  )
}


export default Index