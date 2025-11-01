import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const ProductDetails = () => {
  const { _id: productId } = useLoaderData();
  const { user } = useContext(AuthContext)
  const [bids, setBids] = useState([])

  const bidModalRef = useRef(null)



  useEffect(() => {
    fetch(`http://localhost:3000/product/bids/${productId}`)
      .then(res => res.json())
      .then(data => {
        // Ensure we always set an array

        setBids(data)
        console.log('Bids for this product:', data);
      })
      .catch(err => console.error('Error loading bids:', err));
  }, [productId]);




  const handleBidModal = () => {
    bidModalRef.current.showModal()
  }


  const handleBidSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    console.log({ productId, name, email, bid })

    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      bid_price: bid,

    }
    fetch('http://localhost:3000/bids', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newBid)
    })
      .then(res => res.json())
      .then(data => {
        console.log('after bid', data)
        if(data.insertedId){
          bidModalRef.current.close()
            Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your bid has been placed",
          showConfirmButton: false,
          timer: 1500
        });
        newBid._id=data.insertedId;
        const newBids = [...bids,newBid]
        newBids.sort((a,b)=>b.bid_price-a.bid_price)
        setBids(newBids)
        }
      
      })

  }


  return (
    <div>
      <div>

      </div>
      {/* product info */}
      <div>
        <button
          onClick={handleBidModal}
          className="btn btn-primary w-full">I want to Buy this product</button>

        <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <form onSubmit={handleBidSubmit}>
              <fieldset className="fieldset">
                {/* name */}
                <label className="label">Name</label>
                <input type="text" className="input"
                  readOnly
                  name='name'
                  defaultValue={user?.displayName} />
                <label className="label">Email</label>

                <input type="email"
                  className="input" readOnly
                  defaultValue={user?.email}
                  name='email' />

                {/* bid */}
                <label className="label">Bid</label>
                <input type="text" className="input" name='bid'
                  placeholder='your bid amount'

                />
                <button className="btn btn-neutral mt-4">Place Your Bid</button>
              </fieldset>

            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      {/* bids for this product */}
      <div>
        <h3 className='text-3xl'>Bids for this product: <span className='text-purple-400'>{bids.length}</span></h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  SL No.
                </th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             
              {
                bids.map((bid, index) => <tr>
                  <th>
                    {index + 1}
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {bid.buyer_email}

                  </td>
                  <td>{bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>)
              }
             



            </tbody>
            {/* foot */}



          </table>
        </div>
      </div>
    </div>

  );
};

export default ProductDetails;