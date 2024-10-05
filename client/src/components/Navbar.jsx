import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();

  const { cartCount, updateCartCount } = useContext(CartContext);

  // Update the cart count when the component mounts
  useEffect(() => {
    updateCartCount();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>Coding School</h1>
      <div className="register_container">
        <ul>
          {localStorage.getItem("auth") ? (
            <>
              <li onClick={() => navigate("/cart")}>
                Cart <span> {cartCount} </span>
              </li>
              <li onClick={handleLogout}>
                Logout
              </li>
            </>
          ) : (
            <>
              <li id="login" onClick={() => navigate("/login")}>
                Log In
              </li>
              <li id="signup" onClick={() => navigate("/signup")}>
                Sign Up
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
