import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const UpdateForm = () => {
    const review = useLoaderData();
    const { _id, serviceName } = review;
    
    const { user } = useContext(AuthContext);
    

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = user?.email || 'unregistered';
        const message = form.message.value;
        console.log(name, email, message);

        const review = {
            serviceID: _id,
            serviceName: serviceName,
            name,
            email,
            message,
        }

        fetch(`https://photo-artisan-server.vercel.app/reviews/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })


        return (
            <div className="hero min-h-screen bg-fuchsia-900">
                <h2 className='text-5xl text-dark bg-dark'>text</h2>

                <div className="hero-content flex-col lg:flex-row glass">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Leave Your Review Here</h1>
                        <p className="py-6">You are always appreceated for giving your valuable opinion on any service provided by me</p>
                    </div>

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl" data-theme='night'>
                        <form onSubmit={handleSubmit} className="card-body rounded-xl glass">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Enter name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="text" defaultValue={user?.email} placeholder="Your email" className="input input-bordered w-full" readOnly />
                            </div>
                            <div className="form-control">
                                <textarea name='message' className="textarea textarea-bordered w-full" placeholder="Your review"></textarea>
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary glass">Update Your Review</button>

                            </div>
                        </form>
                    </div>
                </div>




                {/* modal */}

                {/* <label htmlFor="my-modal" className="btn">Update</label>

                <form onSubmit={handleUpdate}>
                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <input type="text" name='name' placeholder="Your name" className="input input-bordered w-full max-w-xs" />
                            <input type="text" name='email' placeholder="Enter email" className="input input-bordered w-full max-w-xs" defaultValue={user?.email} readOnly />
                            <input type="textarea" name='message' placeholder="Your review" className="input input-bordered w-full max-w-xs" />
                            <div className="modal-action">
                                <label htmlFor="my-modal" className="btn" onClick={handleUpdate}>Update Your Review</label>
                            </div>
                        </div>
                    </div>

                </form> */}
            </div>
        );
    };
};

export default UpdateForm;