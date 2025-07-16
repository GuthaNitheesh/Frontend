import "./contactPage.css";
import Navbar from "../components/Navbar";
const ContactPage = ({currUser,handleLogout}) => {
    return (
        <>
        <Navbar currUser={currUser} handleLogout={handleLogout} />
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>Have questions about our Task Management System? We'd love to hear from you!</p>

            <h3>Contact Information</h3>
            <p>Email: guthanitheesh@gmail.com</p>
            <p>Phone: +91-9059779824</p>
            <p>Address: 123, Software Street, Hyderabad, India</p>

            <h3>Follow Us</h3>
            <ul>
                <li><a href="https://linkedin.com/in/gutha-nitheesh">LinkedIn</a></li>
                <li><a href="https://github.com/GuthaNitheesh">GitHub</a></li>
                <li><a href="https://nitheesh-dev-space.lovable.app">Portfolio</a></li>
            </ul>


            <h3>Send Us a Message</h3>
            <form className="contact-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" rows="5" required></textarea>
                <button type="submit">Submit</button>
            </form>
            <div className="small-logo">
                    <img
                src="/pngegg.png"
                alt="Task Management Process"
                style={{ height: "30px", width: "30px", borderRadius: "50%" }}
            />
            <h3>Our Task Management Process</h3>
            </div>
    
           
        </div>
        </>
    );
};

export default ContactPage;
