import {useState} from "react";
import useRequest from "../../hooks/use-request";
import {useRouter} from "next/router";

const SigninPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {doRequest, errors} = useRequest({
            url: '/api/users/signin',
            method: 'post',
            body: {email, password},
            onSuccess: () => router.push('/')
        });

    const onSubmit = async (e) => {
        e.preventDefault();

        await doRequest();
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign In</h1>
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
            {errors}
            <button className="btn btn-primary">Sign In</button>
        </form>
    )
}

export default SigninPage;