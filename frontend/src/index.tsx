// Auto-login as test user
localStorage.clear();

localStorage.setItem(
	"token",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkYWZkYmJmLTM2YWEtNDI1MC05MTQ3LTVlYTc0ZTlmZTA4YSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkpvaG5AZXhhbXBsZS5jb20iLCJleHAiOjE3NzcyMTYwNTl9.ztX8fcqP92xlW1ZjBq0Dt3MNRxYTdzpdpmYU8dqQpCU"  
);
  

const params = new URLSearchParams(window.location.search);
const redirectPath = params.get("redirect");

if (
  redirectPath &&
  window.location.pathname === "/ecommerce/index.html"
) {
  window.history.replaceState(null, "", `/ecommerce${redirectPath}`);
}

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
			<NavBar />
			<Router>
				<Route path="/ecommerce" component={() => <LandingPage />} />
				<Route path="/ecommerce/products/:productID" component={() => <DetailedProductPage />} />
				<Route path="/ecommerce/products/" component={() => <ProductsPage />} />
				<Route path="/ecommerce/cart" component={() => <CartPage />} />
				<Route path="/ecommerce/sign-in" component={() => <SignInPage />} />
				<Route path="/ecommerce/sign-up" component={() => <SignUpPage />} />
				<Route path="/ecommerce/account/:section" component={() => <AccountPage />} />
			</Router>
			<Footer />
		</div>
	);
}

render(<App />, document.getElementById('app'));
