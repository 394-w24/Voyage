import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home">
        <Header />
        <div className="home-container">
          <Sidebar />
          <div className="home-content">
            {Array.from({ length: 25 }).map((_, index) => (
              <Card key={index} sx={{ maxWidth: 220 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://via.placeholder.com/220x140"
                  alt="Card Image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Card Title {index + 1}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is a media card. You can use this section to describe
                    the content.
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
