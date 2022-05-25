import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../../shared/Loading';

const AddingReview = () => {
    const { data: userOrders, isLoading } = useQuery("addingReview", () => fetch('http://localhost:5000/userOrders').then(res => res.json()));

    // const [productName, setProductName] = useState('');
    const [user] = useAuthState(auth);

    const handleOrderedProduct = (event) => {
        event.preventDefault();

        const reviewerName = user?.displayName;
        const reviewerEmail = user?.email;
        const reviewerSpeech = event.target.comment.value;
        const ratings = parseInt(event.target.rating.value);

        const userReview = {
            reviewerName,
            reviewerEmail,
            reviewerAvatar: user?.photoURL,
            reviewerSpeech,
            ratings
        };

        const putUserReview = async () => {
            const url = `http://localhost:5000/review/${reviewerEmail}`;
            const { data } = await axios.put(url, userReview);
            console.log(data);
            if (data?.acknowledged) {
                toast.success('review setup done');
            }
        };
        putUserReview();

        // console.log(reviewerEmail, reviewerName, productName, reviewerSpeech, ratings);
        event.target.reset();
    };

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <form
                className="card w-96 bg-base-100 shadow-xl mx-auto"
                onSubmit={handleOrderedProduct}
            >
                <div className="card-body">
                    <input
                        type="text"
                        value={user?.displayName}
                        className="input input-bordered w-full max-w-xs mb-4"
                        name="email"
                        disabled
                    />
                    <input
                        type="text"
                        value={user?.email}
                        className="input input-bordered w-full max-w-xs mb-4"
                        name="email"
                        disabled
                    />
                    {/* <div className='mb-4'>
                        <select
                            className="select select-bordered w-full max-w-xs"
                            onClick={event => setProductName(event.target.value)}
                        >
                            <option disabled selected>Choose ordered product</option>
                            {userOrders?.map(userOrder => <option
                                key={userOrder?._id}
                                value={`${userOrder?.toolName}`}
                            >{userOrder?.toolName}</option>)}
                        </select>
                    </div> */}
                    <textarea
                        className="textarea textarea-bordered"
                        placeholder="Enter your feelings about this ordered product"
                        name='comment'
                        required
                    />
                    <input
                        type="number"
                        className="input input-bordered w-full max-w-xs mb-4"
                        placeholder="Enter your rating between 1 to 5"
                        name="rating"
                        required
                    />
                    <div
                        className="card-actions justify-start"
                    >
                        <input
                            type="submit"
                            value="Add review"
                            className='btn btn-primary w-full'
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddingReview;