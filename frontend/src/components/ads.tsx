import { Box, Typography } from '@mui/material';

export default function Ads() {
  return (
    <Box sx={{
      position: 'fixed',
      right: 0,
      top: 64, // Height of navbar
      width: '300px',
      height: 'calc(100vh - 64px)',
      backgroundColor: 'rgba(56, 54, 54, 0.3)',
      backdropFilter: 'blur(10px)',
      borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '-4px 0 30px rgba(0, 0, 0, 0.3)',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Ads Header */}
      <Box sx={{
        p: 2,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'white', 
            fontWeight: 600,
            textAlign: 'center'
          }}
        >
          Featured Video
        </Typography>
      </Box>

      {/* Video Container */}
      <Box sx={{
        flex: 1,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
                 {/* Video Player */}
         <Box sx={{
           width: '100%',
           height: '200px',
           backgroundColor: 'rgba(0, 0, 0, 0.5)',
           borderRadius: '8px',
           overflow: 'hidden',
           border: '1px solid rgba(255, 255, 255, 0.1)',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center'
         }}>
           <iframe
             width="100%"
             height="100%"
             src="https://www.youtube.com/embed/9_FQW36r0n8?autoplay=1&mute=1&loop=1&playlist=9_FQW36r0n8&controls=1&rel=0"
             title="Featured Video"
             frameBorder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
             allowFullScreen
             style={{
               borderRadius: '8px'
             }}
           />
         </Box>

        {/* Video Description */}
        <Box sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '8px',
          p: 2,
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: 'white', 
              fontWeight: 500,
              mb: 1
            }}
          >
            Latest Product Showcase
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.5
            }}
          >
            Discover our newest collection of premium laptops and accessories. 
            Watch this exclusive video to see the latest features and innovations.
          </Typography>
        </Box>

        {/* Additional Ad Content */}
        <Box sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          p: 2,
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'white', 
              fontWeight: 600,
              mb: 1
            }}
          >
            Special Offer!
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 2
            }}
          >
            Get 20% off on all gaming laptops
          </Typography>
          <Box sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            px: 3,
            py: 1,
            borderRadius: '20px',
            display: 'inline-block',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              transform: 'scale(1.05)'
            }
          }}>
            Shop Now
          </Box>
        </Box>
      </Box>
    </Box>
  );
} 