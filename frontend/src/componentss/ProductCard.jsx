import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

export default function ProductCard({ product }) {
  return (
    <Card
      sx={{
        width: 300,               // consistent width
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardActionArea>
        {/* Fixed image box with "contain" to avoid cutting */}
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
          {/* Truncate long product names */}
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
