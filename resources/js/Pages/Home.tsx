import React from 'react';
import parse from "html-react-parser";
import MasterLayoutCSS from '@/Layouts/MasterLayoutCSS';
import "../../css/app.css";

interface Props {
  content: any,
  title: string,
  active: string
}

const Home = ({ content, active, title }: Props) => {

  return (
    <MasterLayoutCSS active={active}>
      <div className="w-[80%] sm:w-[70%] mx-auto mt-[10px] pt-4 font-roboto -z-100">
        <div className="break-words pb-4">
          {content ? parse(content.content) : (<p className='text-center'>No content</p>)}
        </div>
      </div>
    </MasterLayoutCSS>
  )
}

export default Home