const express       = require('express');
const { pool }      = require('../db/db');
const requireAuth   = require('../middleware/authMiddleware');
const router = express.Router();

async function logEvent(data) {
  try {
    await fetch('http://log-service:3003/api/logs/internal', {
      method:  'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service: 'task-service', ...data })
    });
  } catch (_) {}
}

router.use(requireAuth);

router.get('/', async (req, res) => {
  try {
    let result;
    if (req.user.role === 'admin') {
      result = await pool.query(`SELECT t.*, u.username FROM tasks t JOIN users u ON t.user_id = u.id ORDER BY t.created_at DESC`);
    } else {
      result = await pool.query(`SELECT t.*, u.username FROM tasks t JOIN users u ON t.user_id = u.id WHERE t.user_id = $1 ORDER BY t.created_at DESC`, [req.user.sub]);
    }
    res.json({ tasks: result.rows, count: result.rowCount });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

router.post('/', async (req, res) => {
  const { title, description, status = 'TODO', priority = 'medium' } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  try {
    const result = await pool.query(`INSERT INTO tasks (user_id, title, description, status, priority) VALUES ($1,$2,$3,$4,$5) RETURNING *`, [req.user.sub, title, description, status, priority]);
    const task = result.rows[0];
    await logEvent({ level:'INFO', event:'TASK_CREATED', userId: req.user.sub, method:'POST', path:'/api/tasks', statusCode:201, message: `Task created: "${title}"`, meta: { task_id: task.id, title } });
    res.status(201).json({ task });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

router.get('/health', (_, res) => res.json({ status:'ok', service:'task-service' }));
module.exports = router;