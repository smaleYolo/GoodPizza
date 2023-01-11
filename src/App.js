import React from "react";
import {Route, Routes} from "react-router-dom";

import './scss/app.scss'
import {SearchContext} from "./context";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";
import OrderComplete from "./pages/OrderComplete";
import AboutUs from "./components/AboutUs/AboutUs";

function App() {
    const [searchValue, setSearchValue] = React.useState('')

    return (
        <SearchContext.Provider value={{
            searchValue,
            setSearchValue,
        }}>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route path="" element={<Home/>}/>
                    <Route path="/GoodPizza" element={<Home/>}/>
                    <Route path="cart" element={<Cart/>}/>
                    <Route path="pizza/:id" element={<FullPizza/>}/>
                    <Route path="/thanks" element={<OrderComplete/>}/>
                    <Route path="/about" element={<AboutUs/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </SearchContext.Provider>

    )
}

export default App;

