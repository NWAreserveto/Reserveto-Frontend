import Navbar from './Navbar';
import LandingMainPic from "../images/img1.jpg"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Typography, Stack, Button } from '@mui/material';
import HaircutGif from '../images/haircut.gif';
import HairdyeGif from '../images/hairdye.gif';
import HairstyleGif from '../images/hairstyle.gif';

function Landing() {
  const theme = createTheme({
      palette: {
        primary: {
          main: '#FFFFFF',
        },
        secondary: {
          main: '#F0F0F0',
        },
      },
    }); 
    return (
      <ThemeProvider theme={theme}>
      <div>
        <Navbar/>
        <Box
          sx={{
            backgroundColor: 'secondary.main',
            padding: '40px',
            margin: '50px 100px',
            borderRadius: '30px',
          }}
        >
          <Stack
            direction="row"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
              margin: '200px',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              }}
            >
              <Typography variant="h2" component="h2" gutterBottom>
                وقتتو هدر نده
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                تست تست تست تست تست
              </Typography>
            </Box>
            <Box>
              <img
                src={LandingMainPic}
                alt="Landing Main"
                style={{
                  maxWidth: '500px',
                  height: 'auto',
                  borderRadius: '8px',
                }}
              />
            </Box>
  
          </Stack>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
            <h2>خدمات</h2>
            <Box>
              <Button>
                <div>
                  <img src={HaircutGif} alt='Haircut' width='150px'/>
                  <div style={{color: "#333333", padding: "0px 0px 0px 25px"}}>اصلاح مو</div>
                </div>
              </Button>
              <Button>
                <div>
                  <img src={HairdyeGif} alt='Hairdye' width='150px'/>
                  <div style={{color: "#333333", padding: "0px 20px 0px 0px"}}>رنگ مو</div>
                </div>
              </Button>
              <Button>
                <div>
                  <img src={HairstyleGif} alt='Hairstyle' width='150px'/>
                  <div style={{color: "#333333", padding: "0px 20px 0px 0px"}}>استایل مو</div>
                </div>
              </Button>
            </Box>
        </Box>
      </div>
      </ThemeProvider>  
  );
}

export default Landing