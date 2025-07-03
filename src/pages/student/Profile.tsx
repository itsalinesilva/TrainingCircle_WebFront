import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, Typography, Container, Box, Avatar } from '@mui/material';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar 
                sx={{ width: 100, height: 100, mr: 3 }}
                src={user?.photoURL || ''}
                alt={user?.displayName || 'User'}
              />
              <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                  {user?.displayName || 'Student Profile'}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Account Information
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography><strong>Name:</strong> {user?.displayName || 'Not provided'}</Typography>
                <Typography><strong>Email:</strong> {user?.email || 'Not provided'}</Typography>
                <Typography><strong>Account Created:</strong> {user?.metadata?.creationTime || 'Unknown'}</Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Training Information
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography>Your training information will be displayed here.</Typography>
                {/* Add more training-specific information as needed */}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Profile;
