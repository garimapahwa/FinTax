import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// // routing
import Routes from 'routes';

// // defaultTheme
import themes from 'themes';

// // project imports
import NavigationScroll from 'layout/NavigationScroll';
import './index.css'
// import Popup from 'views/pages/homepage/Popup';



// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
  <>
    {/* <Popup/>  */}

     <StyledEngineProvider injectFirst>
       <ThemeProvider theme={themes(customization)}>
         <CssBaseline />
         <NavigationScroll>
           <Routes />
         </NavigationScroll>
       </ThemeProvider>
     </StyledEngineProvider>

    </>
  );
};

export default App;
