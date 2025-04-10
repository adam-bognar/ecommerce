
import { Route, Router } from "wouter";

import Footer from './Modules/Footer/Footer';
import NavBar from './Modules/NavBar/NavBar';
import DetailedProductPage from './Pages/DetailedProductPage/DetailedProductPage';
import LandingPage from './Pages/LandingPage/LandingPage';
import './style.css';


import { createContext, render } from "preact";
import { AccountPage } from "./Pages/AccountPage/AccountPage";
import { CartPage } from "./Pages/CartPage/CartPage";
import ProductsPage from './Pages/ProductsPage/ProductsPage';
import { SignInPage } from "./Pages/SignInPage/SignInPage";
import { SignUpPage } from "./Pages/SignUpPage/SignUpPage";

const alma = createContext("");




export function App() {

	return (
		<div className="bg-gradient-to-br from-neutral-900 to-neutral-800">
			<NavBar/>
			<Router>
				<Route path="/ecommerce" component={() => <LandingPage />} />
				<Route path="/ecommerce/products/:productID" component={() => <DetailedProductPage />} />
				<Route path={"/ecommerce/products/"} component={() => <ProductsPage/>} />
				<Route path={"/ecommerce/cart"} component={() => <CartPage/>} />
				<Route path={"/ecommerce/sign-in"} component={() => <SignInPage/>} />
				<Route path={"/ecommerce/sign-up"} component={() => <SignUpPage/>} />
				<Route path={"/ecommerce/account/:section"} component={() => <AccountPage/>} />

			</Router>
			<Footer />
		</div>
	);
}


render(<App />, document.getElementById('app'));
