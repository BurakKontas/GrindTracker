import React from "react";
import { createContext, useContext } from "react";
import { useAppDispatch } from "../redux/hooks";
import { ReportsState } from "../redux/Reports/types";
import { updateStates } from "../redux/Reports/slice";

export const UpdateReportsContext = createContext<UpdateReportsProviderValueType>(null);

export const useUpdateReports = () => {
    const context = useContext(UpdateReportsContext);
    if (!context) {
        throw new Error("useUpdateReports must be used within a UpdateReportsProvider");
    }

    return context;
};

export type UpdateReportsProviderPropsType = {
    children: React.ReactElement
}

export type UpdateReportsProviderValueType = null;

const UpdateReportsProvider: React.FC<UpdateReportsProviderPropsType> = (props) => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        console.log("UpdateReportsProvider Starting to listen to storage...")
        window.addEventListener("storage", (e) => {
            if (e.key !== "persist:reports") return;

            const reportsJson = e.newValue! || "{}";
            const reports = JSON.parse(reportsJson);
            const reportsState: ReportsState = {
                reports: JSON.parse(reports)
            };
            dispatch(updateStates(reportsState))
        });

        return () => 
            window.removeEventListener("storage", () => {});

    }, [])

    return (
        <UpdateReportsContext.Provider value={null}>
            {props.children}
        </UpdateReportsContext.Provider>
    )
}

export default UpdateReportsProvider;