
import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const { loading, loginWithMagicLink } = useTasks();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); //stop update of page when sending forms
    loginWithMagicLink(email);
  };

  useEffect(() => {
    const checkUser = async () => {
      //const { data: user } = await supabase.auth.getUser();
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log("Error obteniendo sesion: ", error);
      }

      if (data.session) { //user on parameter
        navigate("/");
      }
    };

    checkUser();
    console.log("called");
  }, [navigate]);

  return (
    <div className="container flex flex-row">
      <div className="p-4 size-full">
        <div className="col-md-4 offset-md-4">
          <form onSubmit={handleSubmit} className="card card-body">
            <label htmlFor="email">Write your email:</label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mb-2"
              placeholder="youremail@site.com"
              required
            />
            <div className="ms-auto">
              <button disabled={loading} className="btn btn-primary ">
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
