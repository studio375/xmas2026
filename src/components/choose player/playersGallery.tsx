import { Character } from "@/helpers/gameData"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import ArcadeText from "../arcadeText"
import EffectCarousel from '@/addons/effect-carousel/effect-carousel.esm';
import { A11y, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface PlayersGalleryProps{
    characters:Character[],
    onSlideChange(char:Character):void
}
export default function PlayersGallery({characters, onSlideChange}:PlayersGalleryProps){
    return <Swiper 
                className="player-gallery !w-full md:!w-[60%] [&_.swiper-pagination-bullet]:!bg-white"
                modules={[A11y, Navigation, Pagination, EffectCarousel]}
                effect="carousel" 
                grabCursor={true}
                loop={true} 
                loopAdditionalSlides={1}
                slidesPerView={2}
                navigation={true}
                pagination={true}
                onSlideChange={(swiper) => {
                    onSlideChange(characters[swiper.realIndex]);
                }}
            >
        {
            characters.map((character) => {
                return <SwiperSlide key={character.id} className="[&:not(.swiper-slide-active)]:!opacity-50">
                    <div className="relative flex flex-col items-center gap-3">
                        <Image className="h-25 w-auto" src={`/assets/characters/${character.name}/${(character.name).toLowerCase()}-front.png`} width={400} height={100} alt={character.name} />
                        <ArcadeText Tag="span">{character.name}</ArcadeText>
                    </div>
                </SwiperSlide>
            })
        }
    </Swiper>
}