import { useState } from "react";
import { TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const but = () => {
    alert("Finally.");
}

const CreateAcc = () => {
    const [isChecked, setIsChecked] = useState(false);
    const handleOnChange = () => {
        setIsChecked(!isChecked);
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const [check, setCheck] = useState(false);

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const handleNameChange = e => {
      setName(e.target.value);
      if (e.target.validity.valid) {
        setNameError(false);
      } else {
        setNameError(true);
      }
    };

    const[email, setEmail] = useState("");
    const[emailError, setEmailError] = useState("");

    const handleEmailChange = e => {
        setEmail(e.target.value);
        if (e.target.validity.valid){
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    }

    const [password, setPassword] = useState("");
    const [passwordError, setpasswordError] = useState("");

    const handlePassChange = e => {
        setPassword(e.target.value);
        if (e.target.validity.valid){
            setpasswordError(false);
        } else {
            setpasswordError(true);
        }
    }



    return (

        <div className="createAccount">
            <h1>ساخت اکانت</h1>
            <TextField 
            required
            id="outlined-basic" label="نام کاربری" variant="outlined" type="text" sx={{"& label": {
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
                    }}}  className="username" 
                    value={name}
                    onChange={ handleNameChange }
                    error={ nameError }
                    helperText={ nameError ? "نام کاربری خود را وارد کنید" : ""}
                    inputProps={{
                        pattern: "[A-Za-z ]+"
                    }}
                    /> <br />
            <TextField id="outlined-basic" label="ایمیل" variant="outlined" type="text" sx={{"& label": {
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
                    }}} className="email"
                    value={email}
                    onChange={handleEmailChange}
                    error={emailError}
                    helperText={emailError ? "ایمیل خود را وارد کنید" : ""}
                    inputProps={{
                        type: "email"
                    }}
                    /> <br />
            
            <TextField
                    label='رمز'
                    variant="outlined"
                    type={showPassword ? "text" : "password"} 
                    InputProps={{ 
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton className="icon1"
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
                    value={password}
                    onChange={handlePassChange}
                    error={passwordError}
                    helperText={passwordError ? "رمز خود را وارد کنید" : ""}
                    inputProps={{
                        pattern: "[a-zA-Z0-9._:$!%-]+"
                    }}

                    />

            <TextField
                    label='تایید رمز'
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    InputProps={{ 
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton className="icon1"
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
                    value={password}
                    onChange={handlePassChange}
                    error={passwordError}
                    helperText={passwordError ? "رمز خود را وارد کنید" : ""}
                    inputProps={{
                        pattern: "[a-zA-Z0-9._:$!%-]+"
                    }}
                    />
                <div className="check">
                    <p>
                    نوع عضویت:
                    <FormControlLabel control={<Checkbox  />} label="کاربر"/>
                    <FormControlLabel  control={<Checkbox  />} label="آرایشگر" />
                    </p>
                </div>
            
            <button onClick={ but} className="SignUp">ثبت نام</button>
            

        </div>
    );
}
 
export default CreateAcc;