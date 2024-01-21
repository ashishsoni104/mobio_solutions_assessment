import React from "react";
import Header from "./Header";

const Layout = ({showSearch,isCart}) => {
    return (
        <header>
            <Header 
                showSearch={showSearch}
                isCart={isCart}
            />
        </header>
    )
}

export default Layout;