import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import checkIcon from '@mui/icons-material/Check';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import style from '../styles/EditProfile.module.scss';

const currencies = [
    {
      value: 'ML',
      label: 'مرد',
    },
    {
      value: 'FML',
      label: 'زن',
    },
  ];

 const Editprofile = () => {
    const [name, setName] = React.useState('');
    const handleChange = (event) => {
        setName(event.target.value);}
    return (
        <div className={style.EditContainer}>
            <Box 
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                  }}
                noValidate
                autoComplete="off"
            >
                <div style={{margin : '25px'}}>
                    <TextField
                        sx={{ width : '57.5ch',
                        "& .MuiOutlinedInput-root": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            //borderColor: "#2e2e2e",
                          },
                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "var(--secondary-color)",
                              //borderWidth: "2px",
                            },
                          },
                          "&:hover:not(.Mui-focused)": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "var(--secondary-color-lighter)",
                            },
                          },
                        },
                         "& .MuiInputLabel-outlined": {
                           fontWeight: "bold",
                           "&.Mui-focused": {
                             color: "var(--secondary-color)",
                             fontWeight: "bold",
                           },
                         },
                        }}
                        fullWidth
                        required
                        id="fullWidth"
                        label="نام کاربری "
                    />
                    <TextField
                    sx={{ width : '28ch',
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        //borderColor: "#2e2e2e",
                      },
                      "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "var(--secondary-color)",
                          //borderWidth: "2px",
                        },
                      },
                      "&:hover:not(.Mui-focused)": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "var(--secondary-color-lighter)",
                        },
                      },
                    },
                     "& .MuiInputLabel-outlined": {
                       fontWeight: "bold",
                       "&.Mui-focused": {
                         color: "var(--secondary-color)",
                         fontWeight: "bold",
                       },
                     },
                        }}
                        required
                        id="outlined-required"
                        label="نام"

                    />
                    <TextField
                        sx={{ width : '28ch',
                        "& .MuiOutlinedInput-root": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            //borderColor: "#2e2e2e",
                          },
                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "var(--secondary-color)",
                              //borderWidth: "2px",
                            },
                          },
                          "&:hover:not(.Mui-focused)": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "var(--secondary-color-lighter)",
                            },
                          },
                        },
                         "& .MuiInputLabel-outlined": {
                           fontWeight: "bold",
                           "&.Mui-focused": {
                             color: "var(--secondary-color)",
                             fontWeight: "bold",
                           },
                         },
                            }}
                        required
                        id="outlined-required"
                        label=" نام خانوادگی"

                    />
                    <TextField
                        sx={{ width : '28ch',
                        "& .MuiOutlinedInput-root": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            //borderColor: "#2e2e2e",
                          },
                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "var(--secondary-color)",
                              //borderWidth: "2px",
                            },
                          },
                          "&:hover:not(.Mui-focused)": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "var(--secondary-color-lighter)",
                            },
                          },
                        },
                         "& .MuiInputLabel-outlined": {
                           fontWeight: "bold",
                           "&.Mui-focused": {
                             color: "var(--secondary-color)",
                             fontWeight: "bold",
                           },
                         },
                        }}
                        required
                        id="outlined-required"
                        label="ایمیل"
                    />
                    <TextField
                        sx={{ width : '28ch',
                        "& .MuiOutlinedInput-root": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            //borderColor: "#2e2e2e",
                          },
                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "var(--secondary-color)",
                              //borderWidth: "2px",
                            },
                          },
                          "&:hover:not(.Mui-focused)": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "var(--secondary-color-lighter)",
                            },
                          },
                        },
                         "& .MuiInputLabel-outlined": {
                           fontWeight: "bold",
                           "&.Mui-focused": {
                             color: "var(--secondary-color)",
                             fontWeight: "bold",
                           },
                         },
                        }}
                        required
                        id="outlined-required"
                        label="تلفن همراه"
                    />
                    <TextField
                        fullWidth
                        required
                        id="fullWidth"
                        label="آدرس "
                        sx={{ width : '57.5ch',
                        "& .MuiOutlinedInput-root": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            //borderColor: "#2e2e2e",
                          },
                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "var(--secondary-color)",
                              //borderWidth: "2px",
                            },
                          },
                          "&:hover:not(.Mui-focused)": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "var(--secondary-color-lighter)",
                            },
                          },
                        },
                         "& .MuiInputLabel-outlined": {
                           fontWeight: "bold",
                           "&.Mui-focused": {
                             color: "var(--secondary-color)",
                             fontWeight: "bold",
                           },
                         },
                     
                        }}
                    />
                    <TextField
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              //borderColor: "#2e2e2e",
                            },
                            "&.Mui-focused": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "var(--secondary-color)",
                                //borderWidth: "2px",
                              },
                            },
                            "&:hover:not(.Mui-focused)": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "var(--secondary-color-lighter)",
                              },
                            },
                          },
                           "& .MuiInputLabel-outlined": {
                            
                             fontWeight: "bold",
                             "&.Mui-focused": {
                               color: "var(--secondary-color)",
                               fontWeight: "bold",
                             },
                           },

                        }}
                        id="outlined-select-currency"
                        select
                        label="جنسیت"
                        defaultValue="ML"
                    >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                    </TextField>
                    
                </div>
                <div className={style.changebutt}>
                <Stack direction="row" spacing={2} gap={1}>
                    <Button variant="contained" sx={{m :1,bgcolor : 'var(--secondary-color)'}} startIcon={<checkIcon/>}>
                      اعمال تغییرات
                    </Button>
                    <Button variant="outlined" sx={{m :1,borderColor : 'var(--secondary-color)',  color : 'var(--secondary-color)'}} startIcon={<DeleteIcon  sx={{color : 'var(--secondary-color)'}}/>}>
                      حذف تغییرات  
                    </Button>
                </Stack>
                </div>
            </Box>
        </div>
    );
};

export default Editprofile;