import axios from "axios"

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
LandingPage.getInitialProps = async ({ req }) => {
    console.log(req);

    if (typeof window === 'undefined') {
        console.log('I am on the server!');
        const {data} = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
            headers: req.headers
        });
        return data;
    } else {
        console.log("I'm on the browser");
        const {data} = await axios.get('/api/users/currentuser');
        return data;
    }

    return {color: 'red'};
};

export default LandingPage;