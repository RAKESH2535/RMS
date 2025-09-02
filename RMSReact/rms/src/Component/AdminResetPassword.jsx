import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import forgot from '../assets/images/login/01s.png'

function AdminResetPassword() {

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
        <section className="login-content">
            <div className="container">
                <div className="row align-items-center justify-content-center height-self-center">
                    <div className="col-lg-8">
                        <div className="card auth-card">
                            <div className="card-body p-0">
                                <div className="d-flex align-items-center auth-content">
                                    <div className="col-lg-7 align-self-center">
                                        <div className="p-3">
                                            <h2 className="mb-2">Reset Password</h2>
                                            <p>Enter your email address and we'll send you an email with instructions to reset your password.</p>
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="floating-label form-group">
                                                            <input name="password" className="floating-input form-control" value={formData.password} type="password" required onChange={handleValue} />
                                                            <label>Password</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary">Reset</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 content-right">
                                        <img src={forgot} className="img-fluid image-right" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
            </div>
        </section>
    )
}

export default AdminResetPassword
