import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { IoRestaurantOutline } from 'react-icons/io5'
import {MdPlace} from 'react-icons/md'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BiBed} from 'react-icons/bi'
import React, { useState } from "react";

export const CategoriesLogo = () => {
    const [restaurantColor, setRestaurantColor] = useState(false)
    const [mapColor, setMapColor] = useState(false)
    const [cartColor, setCartColor] = useState(false)
    const [bedColor, setBedColor] = useState(false)

    return(
      <Router>
        <Link to="/restaurant"> 
          <div className={(restaurantColor ? "text-white" : "text-gray-400") + " flex flex-col justify-center items-center w-32 fill-current border p-4" } onMouseOver={() => setRestaurantColor(true)} onMouseOut={() => setRestaurantColor(false)}>
              <span>
                <IoRestaurantOutline size={26} style={ restaurantColor ? {color: "white"} : {color: "#47c8ff"}}/>
              </span>
              Restaurants
          </div>
        </Link>
        <Link to="/restaurant"> 
        <div className={(mapColor ? "text-white" : "text-gray-400") + " flex flex-col justify-center items-center w-32 fill-current border p-4" } onMouseOver={() => setMapColor(true)} onMouseOut={() => setMapColor(false)} >
              <span>
                <MdPlace size={26} style={ mapColor ? {color: "white"} : {color: "#32cc6f"}}/>
              </span>
              Places
          </div>
        </Link>
        <Link to="/restaurant"> 
        <div className={(cartColor ? "text-white" : "text-gray-400") + " flex flex-col justify-center items-center w-32 fill-current border p-4" } onMouseOver={() => setCartColor(true)} onMouseOut={() => setCartColor(false)}>
              <span>
                <AiOutlineShoppingCart size={26} style={ cartColor ? {color: "white"} : {color: "#fa8b0c"}}/>
              </span>
              Shopping
          </div>
        </Link>
        <Link to="/restaurant"> 
        <div className={(bedColor ? "text-white" : "text-gray-400") + " flex flex-col justify-center items-center w-32 fill-current border p-4" } onMouseOver={() => setBedColor(true)} onMouseOut={() => setBedColor(false)}>
              <span>
                <BiBed size={26} style={bedColor ? {color: "white"} : { color: "#f5548e"}}/>
              </span>
              Hotels
          </div>
        </Link>
        {/* Route to anoter Component */}
        <Switch>
          <Route path="/restaurant">

          </Route>
        </Switch>
      </Router>
    );
}