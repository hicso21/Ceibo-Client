import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { sendLoginRequest } from "../state/user";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //const user = useSelector((state) => state.user);

  function handleCallbackResponse(response) {
    const userObject = jwt_decode(response.credential);

    dispatch(
      sendLoginRequest({
        google: true,
        name: userObject.given_name,
        last_name: userObject.family_name,
        email: userObject.email,
        profile_picture: userObject.picture,
        password: userObject.jti
      })
    )
    .then(()=>{
      localStorage.setItem('google', true)
      navigate('/')
    })
  }

  useEffect(() => {
    /* global google */
    google.accounts &&
      google?.accounts.id.initialize({
        client_id: "1083142913474-3tk7dpgpmn8t4blneh5rc0c6go2sl0rg.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
    google?.accounts.id.renderButton(
      document.getElementById("signInDiv"), 
      { theme: "outline", size: "large"}
    );
  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
    </div>
  );
};

export default GoogleLogin;
