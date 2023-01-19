import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthProvider";
import UseToken from "../../Hooks/UseToken";

const SignUp = () => {
  const imageBBSecret = process.env.REACT_APP_image_bb_secret;

  const [signedUpuserEmail, setSignedUpUserEmail] = useState("");
  const [token] = UseToken(signedUpuserEmail);

  const { createUser, googleSignIn, updateUserProfile } =
    useContext(AuthContext);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (token) {
    Swal.fire("Your account has been created successfully");
    navigate("/");
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    setError("");
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const role = form.role.value;
    const password = form.password.value;
    const image = form.image.files[0];

    if (password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    fetch(`https://api.imgbb.com/1/upload?key=${imageBBSecret}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        console.log(imageData.data.url);

        const userInfo = {
          name,
          email,
          role,
          image: imageData.data.url,
        };

        createUser(userInfo.email, password)
          .then((result) => {
            const user = result.user;
            console.log(user);
            setUserProfile(userInfo.name, userInfo.image);
            saveUserToDb(userInfo);
          })
          .catch((err) => {
            console.error(err);
            setError(err.message);
          });
      });
  };

  const setUserProfile = (name, photoUrl) => {
    const profile = {
      displayName: name,
      photoURL: photoUrl,
    };

    updateUserProfile(profile)
      .then(() => {})
      .catch((err) => {
        console.error(error);
        setError(err.message);
      });
  };

  const saveUserToDb = (userInfo) => {
    fetch("https://resaledotcom-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged || data.message) {
          setSignedUpUserEmail(userInfo.email);
        }
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: "buyer",
          image: user.photoURL,
        };
        saveUserToDb(userInfo);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section className="p-6 bg-gray-800 text-gray-100">
      <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
        <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 bg-gray-900">
          <span className="block mb-2 text-violet-400">Create Account</span>
          <h1 className="text-5xl font-extrabold text-gray-50">Sign Up</h1>
          <form
            onSubmit={handleSignUp}
            className="self-stretch space-y-3 ng-untouched ng-pristine ng-valid mt-5"
          >
            <div className="text-start">
              <label className="font-bold text-xl">Your name</label>
              <input
                required
                name="name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-md focus:ring focus:ring-violet-400 border-gray-700 p-2 mt-2"
              />
            </div>
            <div className="text-start">
              <label className="font-bold text-xl">Your Email</label>
              <input
                required
                name="email"
                type="email"
                placeholder="Your Email"
                className="w-full rounded-md focus:ring focus:ring-violet-400 border-gray-700 p-2 mt-2"
              />
            </div>
            <div className="text-start">
              <label className="font-bold text-xl mb-2">Your Role</label>
              <select
                required
                name="role"
                className="select select-bordered w-full"
              >
                <option defaultValue>Buyer</option>
                <option>Seller</option>
              </select>
            </div>
            <div className="text-start">
              <label className="font-bold text-xl">Password</label>
              <input
                required
                name="password"
                type="password"
                placeholder="Password"
                className="w-full rounded-md focus:ring focus:ring-violet-400 border-gray-700 p-2 mt-2"
              />
            </div>
            <div className="text-start">
              <label className="font-bold text-xl">
                Upload Your Profile Pic
              </label>
              <input
                required
                name="image"
                type="file"
                className="file-input w-full mt-2"
              />
            </div>
            <p className="text-xl my-2 text-red-600 text-start">{error}</p>
            <button
              type="submit"
              className="w-full py-2 font-semibold rounded bg-violet-400 text-gray-900"
            >
              Sign Up
            </button>
          </form>
          <div className="divider my-5">OR</div>
          <button
            onClick={handleGoogleSignIn}
            className="btn w-full text-white lg:text-xl"
          >
            SignIn with Google
          </button>
          <p className="text-violet-400">
            Already have and account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="btn btn-link"
            >
              Sign In
            </button>{" "}
          </p>
        </div>
        <img
          src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000"
          alt=""
          className="object-cover w-full rounded-md xl:col-span-3 bg-gray-500"
        />
      </div>
    </section>
  );
};

export default SignUp;
