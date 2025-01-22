import "./App.css";
import MaterialTable from "./component/MaterialTable";
import { dummyArray } from "./dummy";
import { personColumns } from "./dummy/columnDef";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PersonIcon from "@mui/icons-material/Person";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const statsCards = [
    {
      title: "Total Transactions",
      value: "₦2,456,789",
      icon: (
        <TrendingUpIcon
          sx={{ fontSize: { xs: 32, sm: 36, md: 40 }, color: "#4CAF50" }}
        />
      ),
      change: "+14% from last month",
    },
    {
      title: "Active Users",
      value: "1,234",
      icon: (
        <PersonIcon
          sx={{ fontSize: { xs: 32, sm: 36, md: 40 }, color: "#2196F3" }}
        />
      ),
      change: "+7% from last month",
    },
    {
      title: "Total Revenue",
      value: "₦789,123",
      icon: (
        <PaymentsIcon
          sx={{ fontSize: { xs: 32, sm: 36, md: 40 }, color: "#FF9800" }}
        />
      ),
      change: "+21% from last month",
    },
    {
      title: "Active Wallets",
      value: "3,456",
      icon: (
        <AccountBalanceWalletIcon
          sx={{ fontSize: { xs: 32, sm: 36, md: 40 }, color: "#9C27B0" }}
        />
      ),
      change: "+10% from last month",
    },
  ];

  return (
    <Container
      maxWidth={false}
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: "100vw",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          py: { xs: 2, sm: 2.5, md: 3 },
        }}
      >
        {/* Welcome Section */}
        <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{
              mb: 1,
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "2.25rem",
              },
            }}
          >
            Welcome back, Admin
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: {
                xs: "0.875rem",
                sm: "1rem",
              },
            }}
          >
            Here's what's happening with your transactions today.
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid
          container
          spacing={{ xs: 2, sm: 2.5, md: 3 }}
          sx={{ mb: { xs: 2, sm: 3, md: 4 } }}
        >
          {statsCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  borderRadius: 2,
                  bgcolor: "background.default",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    mb: { xs: 1, sm: 1.5, md: 2 },
                  }}
                >
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                    sx={{
                      fontSize: {
                        xs: "0.8rem",
                        sm: "0.875rem",
                      },
                    }}
                  >
                    {card.title}
                  </Typography>
                  {card.icon}
                </Box>
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  sx={{
                    mb: 1,
                    fontSize: {
                      xs: "1.25rem",
                      sm: "1.5rem",
                      md: "2rem",
                    },
                  }}
                >
                  {card.value}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.875rem",
                    },
                  }}
                >
                  {card.change}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Quick Summary Cards */}
        <Card sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: { xs: 1.5, sm: 2 },
              }}
            >
              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{
                  fontSize: {
                    xs: "1.1rem",
                    sm: "1.25rem",
                    md: "1.5rem",
                  },
                }}
              >
                Recent Activity
              </Typography>
            </Box>
            <Grid container spacing={{ xs: 2, sm: 2.5 }}>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    bgcolor: "#f5f5f5",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{
                      fontSize: {
                        xs: "0.8rem",
                        sm: "0.875rem",
                      },
                    }}
                  >
                    Last Transaction
                  </Typography>
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    sx={{
                      fontSize: {
                        xs: "1.1rem",
                        sm: "1.25rem",
                        md: "1.5rem",
                      },
                    }}
                  >
                    ₦145,000
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.875rem",
                      },
                    }}
                  >
                    2 minutes ago
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    bgcolor: "#f5f5f5",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{
                      fontSize: {
                        xs: "0.8rem",
                        sm: "0.875rem",
                      },
                    }}
                  >
                    Today's Volume
                  </Typography>
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    sx={{
                      fontSize: {
                        xs: "1.1rem",
                        sm: "1.25rem",
                        md: "1.5rem",
                      },
                    }}
                  >
                    ₦2,890,000
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#4CAF50",
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.875rem",
                      },
                    }}
                  >
                    +15.3% from yesterday
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Material Table */}
        <Box
          sx={{
            overflowX: "auto",
            width: "100%",
          }}
        >
          <MaterialTable data={dummyArray} columns={personColumns} />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
