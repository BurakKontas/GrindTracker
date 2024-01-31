import React from "react";
import "./global.css";
import { useSelector } from "react-redux";
import { getCharacters, getDefaultCharacter, getLanguage, getRegion, setDefaultCharacter, setLanguage, setRegion } from "../../../redux/Settings/slice";
import { useAppDispatch } from "../../../redux/hooks";
import { BdolyticsRegion } from "../../../types/Settings/RegionEnum";
import { BdolyticsLanguageFlags, BdolyticsLanguages } from "../../../types/Settings/LanguageEnum";
import { Capitalize } from "../../../helpers/capitalize";

type User = {
    username?: string;
    userId?: string;
    avatarUrl?: string;
}

function ProfileTab() {
    const [user, setUser] = React.useState<User>();
    const characters = useSelector(getCharacters)
    const region = useSelector(getRegion)
    const language = useSelector(getLanguage)
    const defaultCharacter = useSelector(getDefaultCharacter)
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        //@ts-ignore
        window.overwolf.profile.getCurrentUser((res) => {
            if (res.success && res.username) {
                setUser({
                    username: res.displayName,
                    userId: res.userId,
                    avatarUrl: res.avatar
                });
            }
        });
    }, []);

    const regionMap: { [key: string]: string } = {};
    const languageMap: { [key: string]: string } = {};

    for (const key in BdolyticsRegion) {
        if (BdolyticsRegion.hasOwnProperty(key)) {
            //@ts-ignore
            regionMap[BdolyticsRegion[key]] = key;
        }
    }

    for (const key in BdolyticsLanguages) {
        if (BdolyticsLanguages.hasOwnProperty(key)) {
            //@ts-ignore
            languageMap[BdolyticsLanguages[key]] = key;
        }
    }

    return (
        <div className="profile-tab-container">
            <div className="profile-tab-container-header">
                <h1>Profile</h1>
                <p>Manage your profile information.</p>
            </div>
            <div>
                <img className="avatar-image" src={user?.avatarUrl} alt="avatar" />
                <div className="user-info">
                    <p className="username">Username: <code>{user?.username}</code></p>
                    <p className="user-id">UserID: <code>{user?.userId}</code></p>
                </div>
                {/* select default character */}
                <div className="profile-tab-container-default-character">
                    <label>Default Character:</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {characters.length > 0 ? (
                            <select style={{ marginLeft: 10, paddingRight: 100 }} value={defaultCharacter!.name} onChange={(e) => dispatch(setDefaultCharacter(e.target.value))}>
                                {characters.map((character) => (
                                    <option key={character.name} value={character.name}>
                                        {character.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p style={{ marginLeft: 10 }}>No characters found.</p>
                        )}
                    </div>
                </div>
                {/* Select Region */}
                <div className="profile-tab-container-default-character">
                    <label>Region:</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* @ts-ignore */}
                        <select style={{ marginLeft: 10, paddingRight: 98 }} value={region} onChange={(e) => dispatch(setRegion(e.target.value))}>
                            {Object.keys(BdolyticsRegion).map((region) => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Select Language */}
                <div className="profile-tab-container-default-character">
                    <label>Language:</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* @ts-ignore */}
                        <select style={{ marginLeft: 10, paddingRight: 38 }} value={language} onChange={(e) => dispatch(setLanguage(e.target.value))}>
                            {Object.entries(languageMap).map(([languageValue, languageKey]) => (
                                <option key={languageValue} value={languageValue}>
                                    <p>{languageKey}</p>
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileTab;
