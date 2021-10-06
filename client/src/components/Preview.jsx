import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import React, { useState } from 'react';

export default function Preview({konten}) {
  const [slide, setSlide] = useState(0)
  const slideRef = React.createRef()
  return (
    <div className='flex flex-col'>
    <div className='flex self-end gap-5'>
      <button className={`${slide === 0 ?'border-b-2 border-ungu-terang font-bold' : ''} text-lg py-1 px-7 font-semibold`} onClick={() => {slideRef.current.goTo(0); setSlide(0)}}>Soal</button>
      <button className={`${slide === 1 ?'border-b-2 border-ungu-terang font-bold' :''} text-lg py-1 px-7 font-semibold`} onClick={() => {slideRef.current.goTo(1); setSlide(1)}}>Pembahasan</button>
    </div>
    <Slide ref={slideRef} arrows={false} transitionDuration={0} duration={9999999999} defaultIndex={0} canSwipe={true} easing='ease' autoplay={false}>
      <div className='break-words each-slide' key={konten.kode}>
        <h1 className='text-md font-semibold'>{konten.materi}-{konten.subMateri}</h1>
          <div className='bg-ungu-terang px-5 py-8 w-full rounded-md'>
            <div className='inline-block w-full
                text-xl font-poppins font-semibold text-ungu-gelap' 
            dangerouslySetInnerHTML={{__html:konten.soal}}/>
        </div>
      </div>
      <div className='break-words each-slide' key={konten.kode}>
      <h1 className='text-md font-semibold'>{konten.materi}-{konten.subMateri}</h1>
        <div className='bg-ungu-terang px-5 py-8 w-full rounded-md'>
          <div className='inline-block
            	text-xl font-poppins font-semibold text-ungu-gelap' 
          dangerouslySetInnerHTML={{__html:konten.pembahasan}}/>
      </div>
    </div>
    </Slide>
    </div>
  )
}