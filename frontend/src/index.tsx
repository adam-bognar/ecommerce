
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
				<Route path="/" component={() => <LandingPage />} />
				<Route path="/products/:productID" component={() => <DetailedProductPage />} />
				<Route path={"/products"} component={() => <ProductsPage/>} />
				<Route path={"/cart"} component={() => <CartPage/>} />
				<Route path={"/sign-in"} component={() => <SignInPage/>} />
				<Route path={"/sign-up"} component={() => <SignUpPage/>} />
				<Route path={"/account/:section"} component={() => <AccountPage/>} />

			</Router>
			<Footer />
		</div>
	);
}


render(<App />, document.getElementById('app'));
