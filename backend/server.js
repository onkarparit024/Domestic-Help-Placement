
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home API
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Domestic Help Placement API is running'
  });
});

// Database health API
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      success: true,
      message: 'API and MySQL connected successfully'
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'Database connection failed'
    });
  }
});

// Get all workers
app.get('/api/workers', async (req, res) => {
  try {
    const [workers] = await pool.query(
      `SELECT id, full_name, phone, email, address,
              gender, experience_years, status
       FROM workers
       ORDER BY id DESC`
    );

    res.json({
      success: true,
      count: workers.length,
      workers
    });
  } catch (error) {
    console.error('Workers API error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Could not load workers',
      error: error.message
    });
  }
});

// Register user
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
      });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();

    if (!cleanName || String(password).length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Enter a name and password of at least 8 characters'
      });
    }

    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [cleanEmail]
    );

    if (existing.length) {
      return res.status(409).json({
        success: false,
        message: 'Email is already registered'
      });
    }

    const hash = await bcrypt.hash(String(password), 12);

    const [result] = await pool.execute(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES (?, ?, ?, 'client')`,
      [cleanName, cleanEmail, hash]
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: result.insertId,
        name: cleanName,
        email: cleanEmail,
        role: 'client'
      }
    });
  } catch (error) {
    console.error('Register API error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

 // Submit helper request
app.post('/api/requests', async (req, res) => {
  try {
    const { name, phone, address, requirement } = req.body;

    if (!name || !phone || !address || !requirement) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields'
      });
    }

    const cleanName = String(name).trim();
    const cleanPhone = String(phone).trim();
    const cleanAddress = String(address).trim();
    const cleanRequirement = String(requirement).trim();

    if (!/^[0-9]{10}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Enter a valid 10-digit mobile number'
      });
    }

    await pool.execute(
      `INSERT INTO clients
       (full_name, phone, address, requirement)
       VALUES (?, ?, ?, ?)`,
      [cleanName, cleanPhone, cleanAddress, cleanRequirement]
    );

    res.status(201).json({
      success: true,
      message: 'Your helper request has been submitted successfully!'
    });
  } catch (error) {
    console.error('Request API error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Could not submit request. Please try again.'
    });
  }
});


// Login user
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    const [rows] = await pool.execute(
      `SELECT id, name, email, password_hash, role, status
       FROM users WHERE email = ? LIMIT 1`,
      [cleanEmail]
    );

    if (!rows.length) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = rows[0];

    if (user.status && user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'Account is not active'
      });
    }

    const matches = await bcrypt.compare(
      String(password),
      user.password_hash
    );

    if (!matches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login API error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// Start server after checking MySQL
async function startServer() {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL connected successfully!');
    connection.release();

    
/* ===== PLACEMENT / BOOKING API ===== */

// Get all placements
app.get('/api/placements', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM placements ORDER BY id DESC'
    );

    res.json({
      success: true,
      placements: rows
    });
  } catch (error) {
    console.error('Get placements error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Could not fetch placements'
    });
  }
});

// Create a placement
app.post('/api/placements', async (req, res) => {
  try {
    const { client_id, worker_id, service_date, notes } = req.body;

    if (!client_id || !worker_id || !service_date) {
      return res.status(400).json({
        success: false,
        message: 'Client ID, Worker ID and Service Date are required'
      });
    }

    const clientId = Number(client_id);
    const workerId = Number(worker_id);

    if (
      !Number.isInteger(clientId) || clientId <= 0 ||
      !Number.isInteger(workerId) || workerId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid client or worker ID'
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO placements
       (client_id, worker_id, service_date, status, notes)
       VALUES (?, ?, ?, 'pending', ?)`,
      [clientId, workerId, service_date, notes || null]
    );

    res.status(201).json({
      success: true,
      message: 'Placement created successfully!',
      placementId: result.insertId
    });
  } catch (error) {
    console.error('Create placement error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Could not create placement. Check client, worker and date.'
    });
  }
});

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MySQL connection failed:', error.message);
    process.exit(1);
  }
}

/* Contact / Helper Request API */
app.post('/api/request', async (req, res) => {
  try {
    const { name, phone, address, requirement } = req.body;

    if (!name || !phone || !address || !requirement) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, address and requirement are required'
      });
    }

    const cleanName = String(name).trim();
    const cleanPhone = String(phone).trim();
    const cleanAddress = String(address).trim();
    const cleanRequirement = String(requirement).trim();

    if (
      !cleanName ||
      !/^[0-9]{10,15}$/.test(cleanPhone.replace(/[\s+-]/g, '')) ||
      !cleanAddress ||
      !cleanRequirement
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please enter valid request details'
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO clients
       (full_name, phone, address, requirement)
       VALUES (?, ?, ?, ?)`,
      [cleanName, cleanPhone, cleanAddress, cleanRequirement]
    );

    return res.status(201).json({
      success: true,
      message: 'Request submitted successfully',
      clientId: result.insertId
    });

  } catch (error) {
    console.error('Request API error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Could not submit request'
    });
  }
});

startServer();
