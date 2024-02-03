export interface ReportsState {
    reports : Report[];
}

export interface Report {
    id: string;
    grindspotId: number;
    grindspotName: string;
    characterName: string;
    seconds: number;
    date: Date;
    totalSilver: number;
    items: Item[];
}

export interface Item {
    id: number;
    itemName: string;
    itemImage: string;
    itemGrade: string;
    amount: number;
    perSilver: number;
}