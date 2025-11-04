
import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../hook/useAuth';
import useAxiosSecure from '../../hook/useAxiosSecure';
// import useAxios from '../../hook/useAxios';

const CreateAProduct = () => {
   const axiosSecure = useAxiosSecure()
    const {user} = useAuth();
    const handleCreateProduct = e=>{
        e.preventDefault();
        const title = e.target.title.value;
        const imageUrl = e.target.imageUrl.value;
        const minPrice = e.target.min_price.value;
        const maxPrice = e.target.max_price.value;
 
        const newProduct = {title,imageUrl,minPrice,maxPrice,
            email:user.email,
            seller_name:user.displayName,
        };

        // axios.post('http://localhost:3000/products',newProduct)
        // .then(data=>{
        //     console.log(data)
        //     if(data.data.insertedId){
        //               Swal.fire({
        //                   position: "top-end",
        //                   icon: "success",
        //                   title: "Your product has been created",
        //                   showConfirmButton: false,
        //                   timer: 1500
        //                 });
        //     }
        // })

        axiosSecure.post('/products',newProduct)
        .then(data=>{
            console.log('after save',data.data)
            if(data.data.insertedId){
                      Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Your product has been created",
                          showConfirmButton: false,
                          timer: 1500
                        });
            }
        })
    }
        return (
      <div className='lg:w-1/2 mx-auto'>
           <form onSubmit={handleCreateProduct}>
              <fieldset className="fieldset">
                {/* name */}
                <label className="label">Title</label>
                <input type="text" className="input"
                 
                  name='title'
                   />
                <label className="label">Image Url </label>

                <input type="text"
                  className="input"
                  name='imageUrl' />

                {/* bid */}
                <label className="label">Minimum Price</label>
                <input type="text" className="input" name='min_price'
                  placeholder='min_price'

                />
                  <label className="label">Maximum Price</label>
                <input type="text" className="input" name='max_price'
                  placeholder='max_price'

                />
                <button className="btn mx-auto btn-neutral mt-4">Add Card</button>
              </fieldset>

            </form>
      </div>
    );
};

export default CreateAProduct;