import React from 'react';
import parse from "html-react-parser";
import MasterLayoutCSS from '@/Layouts/MasterLayoutCSS';

interface Props {
  content: any
}

const Home = ({ content }: Props) => {
  return (
      <MasterLayoutCSS> 
        { content ? parse(content.content) : (<>Tidak ada content</>)}
      </MasterLayoutCSS> 
  )
}

export default Home