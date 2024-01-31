interface Product {
    id: number;
    sub_id: number;
    name: string;
    icon_image: string;
    grade_type: number;
    market_main_category: number;
    db_type: string;
}

interface Item {
    id: number;
    sub_id: number;
    name: string;
    icon_image: string;
    grade_type: number;
    market_main_category: number;
    db_type: string;
}

interface Monster {
    id: number;
    sub_id: number;
    name: string;
    icon_image: string;
    db_type: string;
}

interface Title {
    id: number;
    name: string;
    icon_image: string;
    main_category: string;
    db_type: string;
}

interface Node {
    id: number;
    name: string;
    icon_image: string;
    db_type: string;
}

interface Coordinates {
    data: number[][];
}

export interface BdolyticsGrindspotResponse {
    data: {
        id: number;
        name: string;
        icon_image: string;
        items_at_grindspot: Item[];
        monsters_at_grindspot: Monster[];
        titles_at_grindspot: Title[];
        nodes_at_grindspot: Node[];
        coordinates: Coordinates;
        ap: number;
        dp: number;
        db_type: string;
    };
    status: {};
}
