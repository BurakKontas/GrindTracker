//@ts-nocheck
import React from "react";
import { createContext, useContext, useState } from "react";

//@ts-check
export const OverwolfContext = createContext<OverwolfProviderValueType>({
    getHotkeys: () => Promise.resolve([]),
    onMessageReceived: () => {},
    getWindow: () => {},
    sendMessage: () => {},
    getCurrentWindow: () => {},
    closeWindow: () => {},
    restoreWindow: () => {},
    openUrlInDefaultBrowser: () => {}
})

export const useOverwolf = () => useContext(OverwolfContext)

export type OverwolfProviderPropsType = {
    children: React.ReactElement
}

export type OverwolfProviderValueType = {
    getHotkeys: () => Promise<OverwolfGetHotkeysResult[]>;
    onMessageReceived: (callback: (message: any) => void) => void;
    getWindow: (windowName: string, callback: (result: any) => void) => void;
    sendMessage: (windowId: string, title: string, content: any, callback: (response: any) => void) => void;
    getCurrentWindow: (callback: (result: any) => void) => void;
    closeWindow: (windowId: string) => void;
    restoreWindow: (windowId: string) => void;
    openUrlInDefaultBrowser: (url: string) => void;
}

const OverwolfProvider: React.FC<OverwolfProviderPropsType> = (props) => {
    const bdogameid = 10864;

    const getHotkeys = (): Promise<OverwolfGetHotkeysResult[]> => {
        return new Promise((resolve, _) => {
            window.overwolf.settings.hotkeys.get((result) => {
                let hotkeys = result.games[10864]
                resolve(hotkeys)
            });
        });
    };

    const onMessageReceived = (callback: (message: any) => void) => {
        window.overwolf.windows.onMessageReceived.addListener((message) => {
            callback(message);
        });
    }

    const getWindow = (windowName: string, callback: (result: any) => void) => {
        window.overwolf.windows.getWindow(windowName, callback);
    }

    const sendMessage = (windowId: string, title: string, content: any, callback: (response: any) => void) => {
        window.overwolf.windows.sendMessage(windowId, title, content, callback);
    }

    const getCurrentWindow = (callback: (result: any) => void) => {
        window.overwolf.windows.getCurrentWindow(callback);
    }

    const closeWindow = (windowId: string) => {
        window.overwolf.windows.close(windowId);
    }

    const restoreWindow = (windowId: string) => {
        window.overwolf.windows.restore(windowId);
    }

    const openUrlInDefaultBrowser = (url: string) => {
        const confirmation = window.confirm(`Do you want to continue and be redirected to \n[${url}] ?`);
        if (confirmation) {
            window.overwolf.utils.openUrlInDefaultBrowser(url);
        }
    }

    return (
        <OverwolfContext.Provider value={{ closeWindow, getCurrentWindow, getHotkeys, getWindow, onMessageReceived, openUrlInDefaultBrowser, restoreWindow, sendMessage }}>
            {props.children}
        </OverwolfContext.Provider>
    )
}

export default OverwolfProvider;

export interface OverwolfGetHotkeysResult {
    IsUnassigned: boolean;
    action_type: number;
    binding: string;
    customModifierKeyCode: any;
    extension_uid: string;
    game_ids: any;
    hold: boolean;
    isPassthrough: boolean;
    modifierKeys: any;
    name: string;
    title: string;
    virtualKeycode: number;
}