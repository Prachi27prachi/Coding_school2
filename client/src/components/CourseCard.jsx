import { useContext } from "react";
import data from "../../data.json";
import { CartContext } from "../context/CartContext";

function CourseCard() {
  const { updateCartCount } = useContext(CartContext);

  const handleCart = (i) => {
    // Get the existing items from localStorage or initialize to an empty array
    let existingCourses = JSON.parse(localStorage.getItem("course")) || [];

    // Add the new clicked item to the array
    existingCourses.push(i);

    // Store the updated array back in localStorage
    localStorage.setItem("course", JSON.stringify(existingCourses));

    // Update cart count context
    updateCartCount();
  };

  return (
    <>
      {data.map((i) => (
        <div className="card" key={i.id}>
          <div className="img_div">
            <img src={i.img} alt="" />
          </div>
          <div className="card_content">
            <h1>{i.title}</h1>
            <p>{i.description}</p>
            <h3>₹ {i.price}</h3>
            <h5>Total time {i.hrs} Hrs</h5>

            <button onClick={() => handleCart(i)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default CourseCard;
