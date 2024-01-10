import { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import {
  signInWithGoogle,
  signInWithEmailPassword,
  useAuthState,
} from "../../Utilities/firebaseUtils";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Login.css";

const bgImages = [
  "https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgsean-oulashin-KMn4VEeEPR8-unsplash.jpg",
  "https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgammie-ngo-vcu-OZBxxRk-unsplash.jpg",
  "https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgjezael-melgoza-alY6_OpdwRQ-unsplash.jpg",
  "https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgjorge-alcala-fbtHV94f-bA-unsplash.jpg",
  "https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgtheodor-lundqvist-WHhbYArwFt8-unsplash.jpg",
  "https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgstefan-pflaum-ytZOB9FLIqk-unsplash.jpg"
];

const Login = () => {
  const [loadedImages, setLoadedImages] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();
  const fillInTestAccount = () => {
    setEmail("test@example.com");
    setPassword("testpassword");
  };

  useEffect(() => {
    Promise.all(
      bgImages.map((imageUrl) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => resolve(imageUrl);
        });
      })
    ).then((loadedUrls) => {
      setLoadedImages(loadedUrls);
    });
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/preferences");
    }
  }, [user, navigate]);

  return (
    <div className="login-page">
      <Carousel
        autoPlay
        interval={12000}
        animation="fade"
        duration={1500}
        indicators={false}
        navButtonsAlwaysVisible={false}
        fullHeightHover={false}
        className="carousel"
      >
        {loadedImages.map((image, index) => (
          <div
            key={index}
            className="bgImage"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </Carousel>
      <span className="poster"></span>
      <span className="login">
        <div className="icon-title-container">
          <img
            className="login-icon"
            src="https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgAvatar-UI-Unicorn-V2.svg"
          />
          <p className="login-title">Voyage</p>
        </div>
        <div className="slogan-container">
          <p className="login-slogan">Great having you at Voyage💖</p>
        </div>
        <div className="login-container">
          <div className="email-container">
            <p className="email-prompt">Login</p>
            <FormControl className="email-form">
              <OutlinedInput
                className="email-input"
                type={"text"}
                value={email}
                placeholder={"Email or phone number"}
                sx={{
                  "& fieldset": { border: "none" },
                }}
                onChange={(e) => setEmail(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <AccountCircleIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className="password-container">
            <p className="password-prompt">Password</p>
            <FormControl className="password-form">
              <OutlinedInput
                className="password-input"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder={"Enter Password"}
                sx={{
                  "& fieldset": { border: "none" },
                }}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className="other-service-container">
            <FormControlLabel
              control={<Switch defaultChecked className="switch" />}
              label="Remember me"
            />
            <Button
              variant="text"
              disableRipple
              className="beta-account-button"
              onClick={fillInTestAccount}
            >
              Use Beta Account
            </Button>
          </div>
          <div className="signin-container">
            <Button
              variant="contained"
              className="sign-in-button"
              onClick={() => signInWithEmailPassword(email, password)}
            >
              Sign in
            </Button>
          </div>
          <span className="bottom-line" />
          <div className="google-signin-container">
            <Button
              variant="contained"
              className="google-sign-in-button"
              onClick={signInWithGoogle}
            >
              <img src="https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgGoogle.svg" />
              <p className="google-signin">Or sign in with Google</p>
            </Button>
          </div>
        </div>
      </span>
    </div>
  );
};

export default Login;
