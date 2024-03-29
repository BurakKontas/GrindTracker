import React from "react"
import { useAppSelector } from "../../redux/hooks";
import { getLanguage, getRegion } from "../../redux/Settings/slice";
import { useBdolyticsAPI } from "../../hooks/useBdolyticsApi";
import { BdolyticsTooltipTypes } from "../../types/Bdolytics/TooltipTypes";
import { useOverwolf } from "../../hooks/useOverwolf";

export interface Item {
    id: number;
    name: string;
    image: string;
    grade_type: number;
}

export enum GradeTypes {
    Grade4 = "#d36200",
    Grade3 = "#f6c232",
    Grade2 = "#0391c4",
    Grade1 = "#5ff369",
    Grade0 = "#ffffff",
}

type Props = {
    drop: Item;
    type: BdolyticsTooltipTypes;
    containerStyle?: React.CSSProperties;
    inlineElement?: React.ReactElement
}

export const DropItem = ({ drop, type, containerStyle, inlineElement }: Props) => {
    const language = useAppSelector(getLanguage)
    const region = useAppSelector(getRegion)
    const { getImage } = useBdolyticsAPI()
    const { openUrlInDefaultBrowser } = useOverwolf()

    let [image, setImage] = React.useState<string>("")
    React.useEffect(() => {
        const fetchImage = async () => {
            // Önbellek kontrolü
            const cachedImage = sessionStorage.getItem(`image_${drop.image}`);
            if (cachedImage) {
                setImage(cachedImage);
            } else {
                // Resmi al ve önbellekte sakla
                const response = await getImage(drop.image);
                sessionStorage.setItem(`image_${drop.image}`, response!);
                setImage(response!);
            }
        };

        fetchImage();
    }, [drop.id, drop.image, getImage]);

    return (
        <a 
            onClick={(event) => {
                event.preventDefault();
                openUrlInDefaultBrowser(`https://bdolytics.com/${language}/${region}/db/${type}/${drop.id}`)
            }}
            href={`https://bdolytics.com/${language}/${region}/db/${type}/${drop.id}`} 
            style={{...containerStyle}}
            key={drop.id + drop.name}
        >
            <div style={{
                borderColor: GradeTypes[`Grade${drop.grade_type}` as keyof typeof GradeTypes],
                borderWidth: 0.2,
                borderStyle: "solid", // Add this line to specify the border style
                display: "inline-block", // Add this line to make the div inline-block
                padding: 1
            }}>
                <img key={drop.id} style={{
                    width: 30,
                    height: 30,
                    border: "none", // Add this line to remove the default image border
                }} src={image} alt={`Item ${drop.id}`} />
            </div>
            {inlineElement}
        </a>
    )

}