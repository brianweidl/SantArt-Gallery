import React, { useEffect, useState } from "react";
import "./ConfirmPurchase.css";
import axios from "axios";
import useCart from "../../../customHooks/useCart";
import { useSelector } from "react-redux";

const ConfirmPurchase = () => {
	//Me traje esto de payment
	const { cart } = useCart();
	const contactInfo = useSelector((state) => state.contactInfo);

	const getPaintings = async () => {
		const paintings = [];
		for (let i = 0; i < cart.length; i++) {
			const dbPaiting = await axios.get(`/painting/get/${cart[i]}`);
			paintings.push(dbPaiting.data);
		}
		return paintings;
	};

	const [paintings, setPaintings] = useState([]);

	useEffect(() => {
		getPaintings()
			.then((res) => setPaintings(res))
			.catch((err) => console.log(err));
	}, [cart]);

	useEffect(() => {
		const script = document.createElement("script");

		const attr_data_preference = document.createAttribute("data-preference-id");
		attr_data_preference.value = localStorage.getItem("preferenceId");

		script.src =
			"https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
		script.setAttributeNode(attr_data_preference);

		// Elemento en el que renderizo, div, boton
		document.getElementById("button1").appendChild(script);
		return () => {
			document.getElementById("button1").removeChild(script);
		};
	}, []);

	return (
		<div className="divContainerConfirmPurchase">
			<h1>Confirm purchase</h1>
			<div className="divContainerDetailsPurchase">
				<div className="divContainerInputsDetailPurchase">
					<h3>Billings details</h3>

					{contactInfo ? (
						<div>
							<div>Name :{contactInfo.firstName + contactInfo.lastName}</div>
							<div>Email: {contactInfo.email}</div>
							<div>Telephone: {contactInfo.telephone}</div>
							<div>Post Code: {contactInfo.postCode}</div>
							<div>City: {contactInfo.city}</div>
							<div>Street: {contactInfo.street}</div>
							<div>Number: {contactInfo.streetNumber}</div>
							<div>Floor: {contactInfo.floor}</div>
							<div>Unit: {contactInfo.unit}</div>
						</div>
					) : (
						<div>A</div>
					)}
				</div>
				<div className="divContainerItemsPurchase">
					<h3>Your order</h3>
					{paintings &&
						paintings.map((painting, i) => (
							<div key={i} className="divContainerProductCart">
								<div>
									<p>{painting.title}</p>
									<img src={painting.photos[0].url} alt={painting.title} />
								</div>
								<p>USD$ {painting.price}</p>
							</div>
						))}
					<div className="divContainerButtonMercadoPago">
						<button id="button1"></button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmPurchase;