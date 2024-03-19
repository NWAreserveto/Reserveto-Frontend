import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{display: 'flex', justifyContent: 'space-between', alignItems: "center", padding: "0px 100px"}}>
          <Box>
            <Button color="inherit">
              <Typography variant="h6" component="div">
                رزروتو
              </Typography>
            </Button>
          </Box>
          <Box>
            <Button color="inherit" >آرایشگران</Button>
            <Button color="inherit" >آرایشگاه ها</Button>
            <Button color="inherit" >خدمات</Button>
          </Box>
          <Box style={{ position: 'relative' }}>
            <Button color="inherit">ورود | ثبت نام</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
