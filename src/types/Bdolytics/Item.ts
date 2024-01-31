interface ItemObtainedFromBox {
    id: number;
    sub_id: number;
    name: string;
    icon_image: string;
    grade_type: number;
    market_main_category: number;
    db_type: string;
}

interface ItemDropsAtGrindspot {
    id: number;
    name: string;
    icon_image: string;
    items_at_grindspot: Item[];
    db_type: string;
}

interface ProcessingRecipeIngredient {
    id: number;
    sub_id: number;
    name: string;
    icon_image: string;
    grade_type: number;
    market_main_category: number;
    db_type: string;
    amount: number;
}

interface ProcessingRecipeProduct {
    id: number;
    sub_id: number;
    name: string;
    icon_image: string;
    grade_type: number;
    market_main_category: number;
    db_type: string;
}

interface ProcessingRecipe {
    id: number;
    name: string;
    icon_image: string;
    ingredients: ProcessingRecipeIngredient[];
    products: ProcessingRecipeProduct[];
    action_type: string;
    db_type: string;
}

interface Tooltip {
    [key: string]: any; // You may want to define a more specific type for tooltips
}

interface Item {
    id: number;
    sub_id: number;
    name: string;
    description: string;
    icon_image: string;
    grade_type: number;
    weight: number;
    buy_price: number;
    sell_price: number;
    repair_price: number;
    has_market_data: boolean;
    expiration_period: number;
    tooltip: Tooltip[];
    item_obtained_from_box: ItemObtainedFromBox[];
    item_drops_at_grindspots: ItemDropsAtGrindspot[];
    item_is_used_in_processing_recipes: ProcessingRecipe[];
    db_type: string;
}

export interface BdolyticsItemResponse {
    data: {
        id: number;
        sub_id: number;
        name: string;
        description: string;
        icon_image: string;
        grade_type: number;
        weight: number;
        buy_price: number;
        sell_price: number;
        repair_price: number;
        has_market_data: boolean;
        expiration_period: number;
        tooltip: Tooltip[];
        item_obtained_from_box: ItemObtainedFromBox[];
        item_drops_at_grindspots: ItemDropsAtGrindspot[];
        item_is_used_in_processing_recipes: ProcessingRecipe[];
        db_type: string;
    };
    status: {};
}
