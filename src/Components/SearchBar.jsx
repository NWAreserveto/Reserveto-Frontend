import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import APIendpointSearchBarber from "../API/APIendpointSearchBarber";
import { useState } from "react";

const SearchBar = ({ setParentSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchQueryChanged = async (event, value) => {
    setSearchQuery(value);

    if (value !== "") {
      setLoading(true);
      try {
        const response = await APIendpointSearchBarber(value);
        const options = response.map((barber) => ({
          label: `${barber.first_name} ${barber.last_name}`,
          value: barber.id,
        }));
        setSearchOptions(options);
        console.log("Options:", searchOptions);
      } catch (error) {
        console.error("Error fetching search options:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchOptions([]);
    }
  };
  return (
    <Autocomplete
      sx={{ width: "400px" }}
      id="search_bar"
      noOptionsText="موردی یافت نشد"
      filterOptions={(x) => x}
      options={searchOptions}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          value={searchQuery}
          onChange={(event) =>
            handleSearchQueryChanged(event, event.target.value)
          }
          variant="outlined"
          margin="normal"
          placeholder="جستجو"
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ marginRight: "-30px" }}
              >
                <IconButton onClick={() => setParentSearch(searchQuery)}>
                  <SearchIcon
                    fontSize="large"
                    sx={{
                      color: "var(--secondary-color)",
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              marginTop: "-8px",
              height: "50px",
              minWidth: "100%",
              fontSize: "20px",
              color: "var(--secondary-color)",
              "&:hover fieldset": {
                borderColor: "var(--secondary-color)",
                borderWidth: "2px",
              },
              "&:focus-within fieldset": {
                borderColor: "var(--secondary-color)",
                borderWidth: "2px",
              },
              "&:active fieldset": {
                borderColor: "var(--secondary-color)",
              },
            },
          }}
        />
      )}
      renderOption={(props, option) => <li {...props}>{option.label}</li>}
    />
  );
};

export default SearchBar;
