import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';

const ProductCarousel = props => {
  const pictures = [
    {
      src: props.carouselImages[0],
      altText: 'pic 1',
      caption: '1 of 3'
    },
    {
      src: props.carouselImages[1],
      altText: 'pic 2',
      caption: '2 of 3'
    },
    {
      src: props.carouselImages[2],
      altText: 'pic 3',
      caption: '3 of 3'
    },
    {
      src: props.carouselImages[3],
      altText: 'pic 3',
      caption: '3 of 3'
    }
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === pictures.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? pictures.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  const slides = pictures.map(pictures => {
    return (
      <CarouselItem
        onExiting = { () => setAnimating(true)}
        onExited = { () => setAnimating(false)}
        key = {pictures.src}
      >

        <img src={pictures.src} alt={pictures.altText} />
        <CarouselCaption captionText = {pictures.caption} />

      </CarouselItem>
    );
  });
  return (
    <Carousel
      className= "cardImgCarousel"
      activeIndex = {activeIndex}
      next = {next}
      previous = {previous}
      // className = {props.className}
    >

      <CarouselIndicators items={pictures} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
};

export default ProductCarousel;
