import React from "react"
import { useBdolyticsAPI } from "../../hooks/useBdolyticsApi"

export type GrindHeaderData = {
    name: string;
    image: string;
}

type GrindHeaderProps = {
    data: GrindHeaderData;
    style?: React.CSSProperties;
    imageStyle?: React.CSSProperties;
    titleStyle?: React.CSSProperties;
    inlineElements?: React.ReactNode;
}

export const GrindHeader: React.FC<GrindHeaderProps> = (props) => {
    const [image, setImage] = React.useState<string>("")
    
    const { getImage } = useBdolyticsAPI()
    const data = props.data

    React.useEffect(() => {
        async function init() {
            if(data.image == "") return
            let image = await getImage(data.image)
            setImage(image!)
            console.log(image)
        }
        init()
    }, [data])
    return (
        <div style={props.style}>
            <img src={image} style={props.imageStyle || { width: 40, height: 40 }} />
            <span style={props.titleStyle}>{data.name}</span>
            {props.inlineElements}
        </div>
    ) 
}