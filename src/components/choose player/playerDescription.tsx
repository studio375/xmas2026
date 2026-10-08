import { Character } from "@/helpers/gameData";
import ClassicText from "../classicText";

interface PlayerDescriptionData{
    character: Character
}
export default function PlayerDescription({character}:PlayerDescriptionData){
    return <div className="w-[35%] bg-white p-5">
        <ClassicText addClassName="text-[#000] text-[28px] font-bold">{character.name}</ClassicText>
        <ClassicText Tag={'span'} addClassName="text-[#000] text-[20px] mt-0 block">{character.role}</ClassicText>
        <ClassicText Tag={'span'} addClassName="text-[#000] text-[15px] mt-1 block">{character.description}</ClassicText>
    </div>
}