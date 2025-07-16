import "./HomePage.css";
import Navbar from "../components/Navbar";

const HomePage = ({ currUser, handleLogout }) => {
    return (
        <div className="homepage">
            <Navbar currUser={currUser} handleLogout={handleLogout} />
            <div className="home-content">
                <div className="home-left">
                    <img
                        src="/task-image.jpg"
                        alt="Task Illustration"
                        className="home-illustration"
                    />
                </div>
                <div className="home-right">
                    <h1 className="home-title">Task Reminder</h1>
                    <p className="home-text">
                        Stay on top of your work and manage tasks easily. Our task reminder app ensures you never miss a deadline.
                    </p>
                    <p className="home-user">Welcome - {currUser.fullName}</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
