import { Character, GAME_DATA } from "@/helpers/gameData"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import ArcadeText from "../arcadeText"
import EffectCarousel from '@/addons/effect-carousel/effect-carousel.esm';
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/virtual';
import { useRef } from "react";

interface PlayersGalleryProps{
    characters:Character[],
    onSlideChange(char:Character):any
}
export default function PlayersGallery({characters, onSlideChange}:PlayersGalleryProps){
    const ref = useRef<any>(null);
    return <Swiper 
                className="!w-[60%] !py-7 [&_.swiper-pagination-bullet]:!bg-white" 
                modules={[Autoplay, Navigation, Pagination, EffectCarousel]}
                effect="carousel" 
                grabCursor={true}
                loop={true} 
                loopAdditionalSlides={1}
                slidesPerView={2}
                navigation={true}
                pagination={true}
                onInit={(swiper) => {ref.current = swiper;}}
                onSlideChange={(swiper) => {
                    if(ref.current) onSlideChange(GAME_DATA.characters[ref.current.realIndex])
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