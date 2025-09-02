import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ResetPassword() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const userId = searchParams.get('id')
    const token = searchParams.get('token')

    const [formData, setFormData] = useState({
        password: "",
    });

    const [message, setMessage] = useState({
        success: "",
        danger: "",
    });

    const handleValue = (e) => {
        e.preventDefault();

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post(
                // `https://rsmapi.vercel.app/resetpassword/${userId}/${token}`,
                `http://localhost:5000/resetpassword/${userId}/${token}`,
                formData
            );

            setFormData({
                password: "",
            });
            setMessage({
                ...message,
                success: res.data.status,
            });

            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (error) {
            setMessage({
                ...message,
                danger: error.message,
            });

            setFormData({
                password: "",
            });
        } finally {
            setTimeout(
                () =>
                    setMessage({
                        success: "",
                        danger: "",
                    }),
                3000
            );
        }
    };

    return (
        <>
            <div className="wrapper">
                <div className="title">Reset-Password</div>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleValue}
                            required
                        />
                        <label>Password</label>
                    </div>
                    <div className="field">
                        <input type="submit" value="Reset Password" />
                    </div>
                </form>
            </div>
            {
                message.success && (
                    <div className="alert alert-success mt-3" role="alert">
                        {message.success}
                    </div>
                )
            }
            {
                message.danger && (
                    <div className="alert alert-danger mt-3" role="alert">
                        {message.danger}
                    </div>
                )
            }
        </>
    )
}

export default ResetPassword