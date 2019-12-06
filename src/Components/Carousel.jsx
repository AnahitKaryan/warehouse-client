import React, { Component } from 'react';

import product from './../assets/images/product.jpg';
import sender from './../assets/images/sender.jpg';
import w1 from './../assets/images/w1.jpg';
import w2 from './../assets/images/w2.jpg';
import w3 from './../assets/images/w3.jpg';

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Container
} from 'reactstrap';

const items = [
    {
        id: 1,
        Img : w2
    },
    {
        id: 2,
        Img : sender
    },
    {
        id: 3,
        Img : w1
    },
    {
        id: 4,
        Img : product
    },
    { 
        id: 5,
        Img : w3
    }
];

class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
        return (
            <CarouselItem
              className="custom-tag"
              tag="div"
              key={item.id}
              onExiting={this.onExiting}
              onExited={this.onExited}
            >
                <img src = {item.Img} width="100%" alt={item.altText}></img>
                <CarouselCaption className="text-danger" captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
          );
    });

    return (
        <Container fluid className="slide">
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                  {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        </Container>
    );
  }
}

export { Slide };