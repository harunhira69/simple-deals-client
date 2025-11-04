import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Component/Home/Home";
import AllProducts from "../Component/AllProducts/AllProducts";
import Register from "../Component/Register/Register";
import MyProduct from "../Component/MyProduct/MyProduct";
import MyBids from "../Component/MyBids/MyBids";
import PrivateRoute from "../Component/PrivateRoute/PrivateRoute";
import ProductDetails from "../Component/ProductDetails/ProductDetails";
import CreateAProduct from "../Component/CreateAProduct/CreateAProduct";
const router = createBrowserRouter([
    {
            path: "/",
          element:<Root></Root>,
 
   children:[
    {
       index:true,
       Component:Home
    },
    {
        path:'allProducts',
        Component:AllProducts
    },
    {
        path:'register',
        Component:Register
    },
    {
        path:'my-products',
        element:<PrivateRoute>
            <MyProduct></MyProduct>
        </PrivateRoute>
    },
    {
        path:'my-bids',
        element:<PrivateRoute>
            <MyBids></MyBids>
        </PrivateRoute>
    },
 {
  path: 'product-details/:id',
  loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`),
  element: <PrivateRoute>
    <ProductDetails />
  </PrivateRoute>
},
{
    path:'createAProduct',
    element:<PrivateRoute>
        <CreateAProduct></CreateAProduct>
    </PrivateRoute>
}

   ]
    }
])

export default router;