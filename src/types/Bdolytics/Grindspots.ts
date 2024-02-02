interface Product {
    id: number;
    name: string;
    sub_id: number;
    db_type: string;
    grade_type: number;
    icon_image: string;
    market_main_category: number;
}

export interface Grindspot {
    id: number;
    sub_id: number;
    name: string;
    icon_image: string;
    grade_type: number | null;
    products: Product[];
    ap: number,
    dp: number,
    db_type: string,
    main_category: any,
    sub_category: any
}

export interface BdolyticsGrindspotsResponse {
    data: Grindspot[];
}


export enum BdolyticsGrindspotsPagesEnum {
    PAGE1 = 1,
    PAGE2 = 2,
}