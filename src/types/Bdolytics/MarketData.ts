export interface MarketDataItem {
    item_id: number;
    enhancement_level: number;
    id: number;
    sub_id: number;
    icon_image: string;
    grade_type: number;
    market_main_category: number;
    market_sub_category: number;
    in_stock: number;
    total_trades: number;
    price: number;
    price_change: number;
    fourteen_day_volume: number;
    volume_change: number;
    name: string;
}

export interface BdolyticsMarketDataResponse {
    data: MarketDataItem[];
}
