import axios, { AxiosInstance } from 'axios';
import { BdolyticsRegion } from '../types/Bdolytics/BdolyticsRegionEnum';
import { BdolyticsGrindspotsPagesEnum, BdolyticsGrindspotsResponse } from '../types/Bdolytics/Grindspots';
import { BdolyticsGrindspotResponse } from '../types/Bdolytics/Grindspot';
import { BdolyticsItemResponse } from '../types/Bdolytics/Item';


class BdolyticsService {
    private readonly bdolytics: AxiosInstance;
    private readonly baseURL = "https://apiv2.bdolytics.com"
    constructor(language: string, region: BdolyticsRegion) {
        this.bdolytics = axios.create({
            baseURL: `${this.baseURL}/${language}/${region}/db`,
        });
    }
 
    async getGrindspots(page: BdolyticsGrindspotsPagesEnum): Promise<BdolyticsGrindspotsResponse> {
        let response = await this.bdolytics.get<BdolyticsGrindspotsResponse>(`/grindspots?page=${page}`);
        return response.data;
    }

    async getGrindspot(id: number): Promise<BdolyticsGrindspotResponse> {
        let response = await this.bdolytics.get<BdolyticsGrindspotResponse>(`/grindspot/${id}`);
        return response.data;
    }

    async getItem(id: number): Promise<BdolyticsItemResponse> {
        let response = await this.bdolytics.get<BdolyticsItemResponse>(`/item/${id}`);
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
}

export default BdolyticsService;