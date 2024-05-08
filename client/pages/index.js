import axios from "axios"
import buildClient from "../api/build-client";

const LandingPage = ({currentUser}) => {
    console.log('I am in the component', currentUser);
    return (
        <div>

            <h1>Landing Page</h1>
        </div>
    );
};

/**
 * getInitialProps runs on the server, except for when a user is arriving at the page from an internal link.
 *
 * Since we are making a request, and that request requires a different domain depending on if we're on the server
 * or browser, I'm checking to see where we are.
 */
LandingPage.getInitialProps = async (context) => {
    const { data } = await buildClient(context).get('/api/users/currentuser')

    return data;
};

export default LandingPage;