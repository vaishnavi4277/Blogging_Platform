Frontend setup:
1. cd frontend
2. npm install
3. Create a .env file in frontend root with:
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
   REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
4. npm start

Backend setup:
1. cd backend
2. npm install
3. Create .env from .env.example and set MONGO_URI and JWT_SECRET
4. npm run dev

Notes:
- For image upload from client we use Cloudinary unsigned upload. Create an unsigned upload preset in your Cloudinary dashboard.
- Replace API URL and env vars as needed.
