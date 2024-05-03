import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import style from "../styles/SearchTab.module.scss";



const SearchTab = () => {
  return (
    <div className={style.searchTab}>
      <TextField
        variant="standard"
        margin="normall"
        fullWidth
        placeholder="جستجو"
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{ paddingLeft: "10px" }}
            >
              <SearchIcon
                fontSize="large"
                sx={{ color: "var(--secondary-color-lighter)" }}
              />
            </InputAdornment>
          ),
          disableUnderline: true,
          sx: {
            height: "30px",
            fontSize: "30px",
            color: "var(--secondary-color-lighter)",
          },
        }}
      />
      <h4>
        لینک های مهم
      </h4>
      <ul>
        <li>
          <a href="/">اطراف من</a>
        </li>
        <li>
          <a href="/">اطراف من</a>
        </li>
        <li>
          <a href="/">اطراف من</a>
        </li>
        <li>
          <a href="/">اطراف من</a>
        </li>
      </ul>
    </div>
  );
};

export default SearchTab;
