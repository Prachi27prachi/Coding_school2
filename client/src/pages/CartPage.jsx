import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false); // For toggling payment modal
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const navigate = useNavigate();

  // Load the cart items from localStorage when the component mounts
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("course")) || [];
    setCartItems(storedCartItems);
  }, []);

  // Function to remove an item from the cart
  const handleRemove = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("course", JSON.stringify(updatedCartItems));
  };

  // Function to handle opening the checkout modal
  const handleCheckout = () => {
    setShowModal(true); // Show the modal with payment form
  };

  // Function to handle form submission for payment
  const handlePayment = (e) => {
    e.preventDefault();

    // Simulate a payment process and clear the cart
    setCartItems([]);
    setShowModal(false);
    localStorage.removeItem("course");

    // Show success message and redirect
    alert("Payment successful!");
    navigate("/");
  };

  // Function to handle input changes for card details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

   // Function to calculate total price
   const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };


  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.title} width="100" height="100" />
              <div className="item-details">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <h4>Price: ₹{item.price}</h4>
                <h5>Time: {item.hrs} Hrs</h5>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          {/* Total Price Section */}
          <div className="total-price">
            <h3>Total Price: ₹{calculateTotalPrice()}</h3>
          </div>

          <div className="checkout">
            <h3>Total Items: {cartItems.length}</h3>
            <button onClick={handleCheckout} className="checkout-btn">
              Checkout
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Modal for Payment Form */}
      {showModal && (
        <div className="modal-page">
          <div className="modal">
            <div className="modal-content">
              <h2>Enter Card Details</h2>
              <form onSubmit={handlePayment} className="pay-form">
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={cardDetails.expiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="pay-btn">
                  Pay Now
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
