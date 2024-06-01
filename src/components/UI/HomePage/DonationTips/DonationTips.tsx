"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import blood1 from "@/assets/images/blood1.jpg";

const tips = [
  "Stay hydrated: Drink plenty of water before donating.",
  "Eat a healthy meal: Avoid fatty foods, and eat a balanced meal before your donation.",
  "Bring an ID: Make sure to bring a form of identification.",
  "Get plenty of rest: Ensure you have had enough sleep the night before.",
  "Wear comfortable clothing: Preferably with sleeves that can be easily rolled up.",
  "Avoid heavy lifting: Refrain from heavy physical activity for at least 24 hours post-donation.",
  "Inform the staff: Let the donation center staff know if you are feeling unwell.",
  "Post-donation care: Eat snacks and drink fluids provided after donating, and stay seated for 15-20 minutes.",
];

const guidelines = [
  "Eligibility: Ensure you meet the eligibility criteria for donating blood.",
  "Frequency: You can donate whole blood every 56 days, plasma every 28 days, and platelets every 7 days up to 24 times a year.",
  "Health Check: Undergo a health screening and discuss your medical history with the staff.",
  "Hydration: Avoid alcohol before donation and drink plenty of water.",
  "Iron Levels: Maintain healthy iron levels in your diet.",
  "Follow-Up: Follow any additional instructions provided by the donation center staff.",
];

const TabPanel = ({ children, value, index }: any) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const DonationTips: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${blood1.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        py: 5,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom sx={{fontSize: {
              xs: "32px",
              sm: "32px",
              md: "32px",
              lg: "48px",
            }}}>
          Blood Donation Tips and Guidelines
        </Typography>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Tips" />
            <Tab label="Guidelines" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Card
              sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: "#fff" }}
            >
              <CardContent>
                <List>
                  {tips.map((tip, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={tip} />
                      </ListItem>
                      {index < tips.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Card
              sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: "#fff" }}
            >
              <CardContent>
                <List>
                  {guidelines.map((guideline, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={guideline} />
                      </ListItem>
                      {index < guidelines.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </TabPanel>
        </Box>
      </Container>
    </Box>
  );
};

export default DonationTips;
