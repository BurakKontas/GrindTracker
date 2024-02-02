import React from "react";
import { useBdolyticsAPI } from "../../hooks/useBdolyticsApi";

export type GrindHeaderData = {
    name: string;
    image: string;
};

type GrindHeaderProps = {
    data: GrindHeaderData;
    style?: React.CSSProperties;
    imageStyle?: React.CSSProperties;
    titleStyle?: React.CSSProperties;
    inlineElements?: React.ReactNode;
};

export const GrindHeader: React.FC<GrindHeaderProps> = (props) => {
    const { getImage } = useBdolyticsAPI();
    const data = props.data;

    const [image, setImage] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchImage = async () => {
            // Önbellek kontrolü
            const cachedImage = sessionStorage.getItem(`image_${data.image}`);
            if (cachedImage) {
                setImage(cachedImage);
            } else {
                // Resmi al ve önbellekte sakla
                if (data.image !== "") {
                    const response = await getImage(data.image);
                    sessionStorage.setItem(`image_${data.image}`, response!);
                    setImage(response!);
                }
            }
        };

        fetchImage();
    }, [data.image, data.name, getImage]);

    return (
        <div style={props.style}>
            {image && <img src={image} style={props.imageStyle || { width: 40, height: 40 }} />}
            <span style={props.titleStyle}>{data.name}</span>
            {props.inlineElements}
        </div>
    );
};
