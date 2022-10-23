import { mapToStyles } from "@popperjs/core/lib/modifiers/computeStyles";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";




import Dashboard from "../../views/admin/Dashboard";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import Settings from "../../views/admin/Settings"
import Tables from "../../views/admin/Tables";
import Maps from "../../views/admin/Maps";
import useAuth from "../../hooks/useAuth";
import ShopKeeperSidebar from "../../components/Sidebar/ShopKeeperSidebar";
import CustomerSidebar from "../../components/Sidebar/CustomerSidebar";
import Profile from "../PrivateCommon/Profile";
import EditProfile from "../PrivateCommon/EditProfile";
import AddShopsOrProductCatagory from "../ShopKeeper/AddShopsOrProductCatagory";
import ShowShop from "../ShopKeeper/ShowShop";
import ShowProductCatagory from "../ShopKeeper/ShowProductCatagory";
import AddProduct from "../ShopKeeper/AddProduct";
import ShowProduct from "../ShopKeeper/ShowProduct";
import EditProduct from "../ShopKeeper/EditProduct";
import AddAdmin from "../Admin/AddAdmin";
import ShowAllUsers from "../Admin/ShowAllUsers";
import ShowAllShop from "../Admin/ShowAllShop";
import ShowAllProCat from "../Admin/ShowAllProCat";
import ShowAllProduct from "../Admin/ShowAllProduct";
import Orders from "../Customer/Orders";




export default function CommonDashboard() {
  const { user } = useAuth()
  return (
    <>

      {user.type === 'Admin' ? <AdminSidebar /> :
        user.type === 'ShopKeeper' ?
          <ShopKeeperSidebar /> : <CustomerSidebar />}
      <div className="relative md:ml-64 bg-blueGray-100">

        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {user.type === 'Admin' ?
            // admin route
            <Switch>
              <Route path="/dashboard/admin" component={Profile} />
              <Route path="/dashboard/edit-profile" component={EditProfile} />
              <Route path="/dashboard/add-admin" component={AddAdmin} />
              <Route path="/dashboard/all-users" component={ShowAllUsers} />
              <Route path="/dashboard/show-all-shops" component={ShowAllShop} />
              <Route path="/dashboard/show-all-product-catagory" component={ShowAllProCat} />
              <Route path="/dashboard/show-all-product" component={ShowAllProduct} />
              <Redirect from="/dashboard/" to="/dashboard/admin" />
            </Switch> :
            user.type === 'ShopKeeper' ?
              // shopkeeper route
              <>
                <Switch>
                  <Route path="/dashboard/shopkeeper" component={Profile} />
                  <Route path="/dashboard/edit-profile" component={EditProfile} />
                  <Route path="/dashboard/add-shops" component={AddShopsOrProductCatagory} />
                  <Route path="/dashboard/show-all-shops" component={ShowShop} />
                  <Route path="/dashboard/add-product-catagory" component={AddShopsOrProductCatagory} />
                  <Route path="/dashboard/show-all-product-catagory" component={ShowProductCatagory} />
                  <Route path="/dashboard/add-produts" component={AddProduct} />
                  <Route path="/dashboard/show-all-products" component={ShowProduct} />
                  <Route path="/dashboard/edit-product/:id" component={EditProduct} />
                  <Redirect from="/dashboard" to="/dashboard/shopkeeper" />
                </Switch>
              </>

              :
              // customer route
              <Switch>
                <Route path="/dashboard/customer" component={Profile} />
                <Route path="/dashboard/edit-profile" component={EditProfile} />
                <Route path="/dashboard/orders" component={Orders} />

                <Redirect from="/dashboard" to="/dashboard/customer" />
              </Switch>}


        </div>
      </div>
    </>
  );
}
