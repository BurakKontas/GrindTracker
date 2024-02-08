export interface ReportsState {
    reports : Report[];
    reporting: Boolean
    reportProps: {
        id: string;
        grindspotId: number;
        time: number;
    }
}

export interface Report {
    id: string;
    grindspotId: number;
    grindspotName: string;
    characterName: string;
    seconds: number;
    date: string;
    totalSilver: number;
    items: Item[];
}

export interface Item {
    id: number;
    itemName: string;
    itemImage: string;
    itemGrade: number;
    amount: number;
    perSilver: number;
}