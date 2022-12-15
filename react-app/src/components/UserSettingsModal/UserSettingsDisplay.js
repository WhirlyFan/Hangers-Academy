const UserSettingsDisplay = ({ sessionUser }) => {
    return (
        <div className="container">
            <div className="top-banner">

            </div>
            <div className="bottom-container">
                <div className="top-half">
                    <span style={{color: "black"}}>{sessionUser.username}</span>
                </div>
                <div className="bot-half">
                    <div className="username-container">
                        <span className="username-label"></span>
                        <span className="username" style={{color: "black"}}>{sessionUser.username}</span>
                    </div>
                    <div className="email-container">
                        <span className="email-label"></span>
                        <span className="email" style={{color: "black"}}>{sessionUser.email}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UserSettingsDisplay;
