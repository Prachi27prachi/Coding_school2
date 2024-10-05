import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/login`,
              formData
            );
      
            if (res && res.data.success) {
              localStorage.setItem("auth", JSON.stringify(res.data));
              navigate("/course");
            }
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
      };

  return (
    <div className='register'>
        <form className='form' onSubmit={handleSubmit}>
            <div className="input_field">
                <label>Email</label>
                <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input_field">
                <label>Password</label>
                <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" className='btn'>
                {isLoading ? 'Loading...' : 'Log In'}
            </button>
        </form>
    </div>
  )
}

export default LoginPage
