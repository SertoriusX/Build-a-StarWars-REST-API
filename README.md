## Setup Instructions

### 1. Clone the repository and setup both backend and frontend

```bash
# Backend setup
cd flask_app

# Create and activate virtual environment
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
# source venv/bin/activate

#python run.py

# Move to frontend folder
cd ../react_app

# Install frontend dependencies
npm install
npm install react-router-dom
npm install axios
npm run dev
