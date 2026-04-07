import { If } from "@components/If/If";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CirclIcon from "@mui/icons-material/Lens";
import CircleOutline from "@mui/icons-material/PanoramaFishEye";
import { color } from "@styles/colors";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect } from "react";
import {
  CarouselLeftChevron,
  CarouselRightChevron,
  CarouselSliderTrackerDot,
} from "./CarouselStyledComponents";

interface CarouselProps<T> {
  items: T[];
  renderItem?: (item: T) => React.ReactNode;
  onItemShown?: (item: T) => void;
  selectedCarouselImage?: string;
}

const Carousel = <T,>({
  items,
  renderItem,
  onItemShown,
  selectedCarouselImage,
}: CarouselProps<T>): React.ReactElement => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedCarouselIdx, setSelectedCarouselIdx] = React.useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = (): void => {
      setSelectedCarouselIdx(emblaApi.selectedScrollSnap());
      if (onItemShown) {
        onItemShown(items[emblaApi.selectedScrollSnap()]);
      }
    };

    // Run once on init
    onSelect();

    // Listen for changes
    emblaApi.on("select", onSelect);

    return (): void => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    if (selectedCarouselImage) {
      const idx = items.findIndex((item) => {
        if (typeof item === "string") {
          return selectedCarouselImage === `/images/firms/${item}.png`;
        }
        return false;
      });
      if (idx !== -1) {
        emblaApi.scrollTo(idx);
      }
    } else {
      emblaApi.scrollTo(0);
    }
  }, [selectedCarouselImage, emblaApi]);

  const scrollNext = (): void => emblaApi?.scrollNext();
  const scrollPrev = (): void => emblaApi?.scrollPrev();
  return (
    <>
      <If condition={selectedCarouselIdx !== 0}>
        <CarouselLeftChevron>
          <ChevronLeftIcon
            style={{
              color: color("SystemLabel1"),
              height: 50,
              width: 50,
            }}
            onClick={scrollPrev}
          />
        </CarouselLeftChevron>
      </If>
      <If condition={selectedCarouselIdx !== items.length - 1}>
        <CarouselRightChevron>
          <ChevronRightIcon
            style={{
              color: color("SystemLabel1"),
              height: 50,
              width: 50,
            }}
            onClick={scrollNext}
          />
        </CarouselRightChevron>
      </If>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {items.map((item, idx) => (
              <div className="embla__slide" key={idx}>
                <div className="embla__slide__number">
                  <span>
                    {renderItem ? renderItem(item) : JSON.stringify(item)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
        {items.map((_, idx) => (
          <CarouselSliderTrackerDot
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
          >
            {idx === selectedCarouselIdx ? (
              <CirclIcon
                style={{
                  color: color("SystemLabel1"),
                  height: 10,
                  width: 10,
                }}
              />
            ) : (
              <CircleOutline
                style={{
                  color: color("SystemLabel1"),
                  height: 10,
                  width: 10,
                }}
              />
            )}
          </CarouselSliderTrackerDot>
        ))}
      </div>
    </>
  );
};

export default Carousel;
