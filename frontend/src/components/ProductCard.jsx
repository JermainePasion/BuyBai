import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: 300,           
        borderRadius: 2,
        boxShadow: 3,
      }}
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <CardActionArea>

        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            height: 200,            
            objectFit: 'contain',    
          }}
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product.name}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Stock: {product.quantity}
          </Typography>

          <Typography 
            variant="h6" 
            color="primary" 
            sx={{ mt: 3 }} 
          >
            ₱{product.price.toLocaleString()}
          </Typography>
        </CardContent>
      </CardActionArea>


    </Card>
  );
}
