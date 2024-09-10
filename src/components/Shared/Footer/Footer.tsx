import { Box } from "@mui/material";
import FooterBottom from "./FooterBottom";
import FooterHeader from "./FooterHeader";

const Footer = () => {
    return (
        <Box bgcolor="rgb(17, 26, 34)" color="white" py={5}>
        <FooterHeader />
        <FooterBottom />
      </Box>
    );
  };
  
  export default Footer;