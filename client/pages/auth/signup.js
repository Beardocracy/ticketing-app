import {useState} from "react";
import axios from "axios";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('/api/users/signup', {
                email, password
            });
            console.log(response.data)
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"/>
            </div>
            {errors.length > 0 && <div className="alert alert-danger">
                <h4>Errors:</h4>
                <ul className="my-0">
                    {errors.map(err => <li key={err.message}>{err.message}</li>)}
                </ul>
            </div>}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    )
}

export default SignupPage;