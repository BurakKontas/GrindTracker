import React from "react";
import "./global.css";
import { useSelector } from "react-redux";
import { getCharacters, getDefaultCharacter, setDefaultCharacter } from "../../../redux/Settings/slice";
import { useAppDispatch } from "../../../redux/hooks";

type User = {
    username?: string;
    userId?: string;
    avatarUrl?: string;
}

function ProfileTab() {
    const [user, setUser] = React.useState<User>();
    const characters = useSelector(getCharacters)
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
            </div>
        </div>
    );
}

export default ProfileTab;
