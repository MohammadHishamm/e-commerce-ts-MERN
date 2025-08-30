
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



interface props {
  id: string;
  title: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, title, price, image }: props) {
  return (
    <Card sx={{ 
      height: "400px", 
      width: "280px",
      display: "flex", 
      flexDirection: "column",
      backgroundColor: 'rgba(56, 54, 54, 0.3)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div" 
          noWrap
          sx={{ color: 'white' }}
        >
          {title}
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
        >
          ${price.toLocaleString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          fullWidth 
          variant="contained"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.5)'
            }
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
