import axios, { AxiosInstance } from 'axios';
import { BdolyticsRegion } from '../types/Settings/RegionEnum';
import { BdolyticsGrindspotsPagesEnum, BdolyticsGrindspotsResponse } from '../types/Bdolytics/Grindspots';
import { BdolyticsGrindspotResponse } from '../types/Bdolytics/Grindspot';
import { BdolyticsItemResponse } from '../types/Bdolytics/Item';
import { useCookies } from 'react-cookie';
import { BdolyticsMarketDataResponse } from '../types/Bdolytics/MarketData';


class BdolyticsService {
    private readonly bdolytics: AxiosInstance;
    private readonly region;
    private readonly baseURL = "https://apiv2.bdolytics.com"
    constructor(language: string, region: BdolyticsRegion) {
        this.bdolytics = axios.create({
            baseURL: `${this.baseURL}/${language}/${region}`,
        });
        this.region = region;
    }
 
    async getGrindspots(page: BdolyticsGrindspotsPagesEnum): Promise<BdolyticsGrindspotsResponse> {
        let response = await this.bdolytics.get<BdolyticsGrindspotsResponse>(`/db/grindspots?page=1`);
        let response2 = await this.bdolytics.get<BdolyticsGrindspotsResponse>(`/db/grindspots?page=2`);
        response.data.data = response.data.data.concat(response2.data.data)
        return response.data;
    }

    async getGrindspot(id: number): Promise<BdolyticsGrindspotResponse> {
        let response = await this.bdolytics.get<BdolyticsGrindspotResponse>(`/db/grindspot/${id}`);
        return response.data;
    }

    async getItem(id: number): Promise<BdolyticsItemResponse> {
        let response = await this.bdolytics.get<BdolyticsItemResponse>(`/db/item/${id}`);
        return response.data;
    }

    async getImage(image: string): Promise<string> {
        try {
            const baseURL = 'https://cdn.bdolytics.com/img';
            const url = `${baseURL}/${image.toLowerCase()}.webp`;

            const response = await axios.get<ArrayBuffer>(url, {
                responseType: 'arraybuffer',
            });

            const arrayBuffer = response.data;
            const bytes = new Uint8Array(arrayBuffer);
            let binary = '';
            bytes.forEach((byte) => {
                binary += String.fromCharCode(byte);
            });
            const base64 = btoa(binary);
            const dataURL = `data:image/webp;base64,${base64}`;

            return dataURL;
        } catch (error) {
            console.error('Error fetching image:', error);
            throw error;
        }
    }

    async getMarketPriceOfItems(): Promise<BdolyticsMarketDataResponse> {
        const storedData = sessionStorage.getItem(`${this.region}_market_price_data`);
        if (storedData) {
            return JSON.parse(storedData);
        }

        const response = await this.bdolytics.get(`/market/central-market-data`);
        const responseData = response.data;
        sessionStorage.setItem(`${this.region}_market_price_data`, JSON.stringify(responseData));
        setTimeout(() => {
            sessionStorage.removeItem(`${this.region}_market_price_data`);
        }, 3600 * 1000); // 1 saatlik süre (1 saat = 3600 saniye)
        return responseData;
    }
}

export default BdolyticsService;
