import React from "react";
import "./global.css";

type User = {
    username?: string;
    userId?: string;
    avatarUrl?: string;
}

function ProfileTab() {
    const [user, setUser] = React.useState<User>();

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
            </div>
        </div>
    );
}

export default ProfileTab;
