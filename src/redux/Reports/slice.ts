import { createAppSlice } from "../hooks";
import { Report, ReportsState } from "./types";

const initialState: ReportsState = {
    reports: [],
    reporting: false,
    reportProps: {
        id: "",
        grindspotId: 0,
        time: 0,
    }
};

export const reportsSlice = createAppSlice({
    name: "reports",
    initialState,
    selectors: {
        isReporting: (state) => state.reporting,
        getReportProps: (state) => state.reportProps,
        getReports: (state) => state.reports,
        getReport: (state, id: string) => state.reports.find((r) => r.id === id),
        getReportByDate: (state, date: Date) => state.reports.filter((r) => r.date === date),
        getReportByGrindspot: (state, grindspotId: number) => state.reports.filter((r) => r.grindspotId === grindspotId),
        getReportByCharacter: (state, characterName: string) => state.reports.filter((r) => r.characterName === characterName),
        getReportsByDateRange: (state, start: Date, end: Date) => state.reports.filter((r) => r.date >= start && r.date <= end),
        getReportsByGrindspotAndDateRange: (state, grindspotId: number, start: Date, end: Date) => state.reports.filter((r) => r.grindspotId === grindspotId && r.date >= start && r.date <= end),
        getReportsByCharacterAndDateRange: (state, characterName: string, start: Date, end: Date) => state.reports.filter((r) => r.characterName === characterName && r.date >= start && r.date <= end),
        getReportsByGrindspotAndCharacter: (state, grindspotId: number, characterName: string) => state.reports.filter((r) => r.grindspotId === grindspotId && r.characterName === characterName),
        getReportsByGrindspotAndCharacterAndDateRange: (state, grindspotId: number, characterName: string, start: Date, end: Date) => state.reports.filter((r) => r.grindspotId === grindspotId && r.characterName === characterName && r.date >= start && r.date <= end),
    },
    reducers: (create) => ({
        updateStates: create.reducer<Omit<ReportsState, "reporting" | "reportProps">>((state, action) => {
            state.reports = action.payload.reports;
        }),
        addReport: create.reducer<Report>((state, action) => {
            state.reports.push(action.payload);
            console.log("Report added", action.payload)
        }),
        removeReport: create.reducer<string>((state, action) => {
            state.reports = state.reports.filter((r) => r.id !== action.payload);
        }),
        updateReport: create.reducer<Report>((state, action) => {
            const index = state.reports.findIndex((r) => r.id === action.payload.id);
            if (index === -1) throw new Error("Report does not exist");
            state.reports[index] = action.payload;
        }),
        updateReporting: create.reducer<boolean>((state, action) => {
            state.reporting = action.payload;
        }),
        updateReportProps: create.reducer<ReportsState["reportProps"]>((state, action) => {
            state.reportProps = action.payload;
        }),
    }),
});

// Action creators are generated for each case reducer function
export const { updateStates, addReport, removeReport, updateReport, updateReporting, updateReportProps } = reportsSlice.actions;
export const { isReporting, getReportProps, getReport, getReports, getReportByCharacter, getReportByDate, getReportByGrindspot, getReportsByCharacterAndDateRange, getReportsByDateRange, getReportsByGrindspotAndCharacter, getReportsByGrindspotAndCharacterAndDateRange, getReportsByGrindspotAndDateRange } = reportsSlice.selectors;

export default reportsSlice.reducer;