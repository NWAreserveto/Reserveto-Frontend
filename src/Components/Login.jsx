import { Link } from "react-router-dom";
import {React, useState} from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";


const login = () => {
    alert('you have succesfully logged in!');
}



const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    
    return ( 
        <body>
            <div className="login">
                <form className="login-form">
                    <h1>ورود به حساب کاربری</h1>
                <TextField  id="outlined-basic" sx ={{
                    "& label": {
                        transformOrigin: "right !important",
                        left: "inherit !important",
                        right: "1.75rem !important",
                        fontSize: "small",
                        color: "#807D7B",
                        fontWeight: 400,
                        overflow: "unset"
                    }, 
                    "& legend" : {
                        textAlign: "right", 
                        display: "flex", 
                        justifyContent: "center", 
                        fontSize: "10px"
                    }
                }} 
                    label="ایمیل یا تلفن همراه" variant="outlined" className="email"/>

                <TextField
                    label='رمز'
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    InputProps={{ 
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton className="icon"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            
                            >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        )
                    }}
                    sx={{ 
                        "& label": {
                            transformOrigin: "right !important",
                            left: "inherit !important",
                            right: "1.75rem !important",
                            fontSize: "small",
                            color: "#807D7B",
                            fontWeight: 400,
                            overflow: "unset"
                        }, 
                        "& legend" : {
                            textAlign: "right", 
                            display: "flex", 
                            justifyContent: "center", 
                            fontSize: "10px"
                        }
                    }}
                    className="password"
                    />

                    <button onClick={ login } className="loginButton">ورود</button>

                    
                    <a href="." className="forgetPass">رمز خود را فراموش کرده اید</a>
                    <Link to="/CreateAcc">
                        <button className="createAcc">ثبت نام</button>
                    </Link>
                </form>
            </div>
        </body>
        
    );
}
 
export default  Login;