const express = require('express');
const router = express.Router();
const { IpPort } = require('../database/models');
const { Op } = require('sequelize');

// GET all IP:Port combinations with pagination and filtering
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 50, threat_type, malware, reporter, min_confidence } = req.query;
    const offset = (page - 1) * limit;
    
    const where = {};
    if (threat_type) where.threat_type = threat_type;
    if (malware) where.malware = { [Op.like]: `%${malware}%` };
    if (reporter) where.reporter = reporter;
    if (min_confidence) where.confidence_level = { [Op.gte]: parseInt(min_confidence) };
    
    const { count, rows } = await IpPort.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['first_seen_utc', 'DESC']]
    });
    
    res.json({
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      data: rows
    });
  } catch (error) {
    next(error);
  }
});

// GET single IP:Port by ID
router.get('/:id', async (req, res, next) => {
  try {
    const ipPort = await IpPort.findByPk(req.params.id);
    
    if (!ipPort) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'IP:Port combination not found'
      });
    }
    
    res.json(ipPort);
  } catch (error) {
    next(error);
  }
});

// POST create new IP:Port
router.post('/', async (req, res, next) => {
  try {
    const ipPort = await IpPort.create(req.body);
    res.status(201).json(ipPort);
  } catch (error) {
    next(error);
  }
});

// PUT update IP:Port
router.put('/:id', async (req, res, next) => {
  try {
    const ipPort = await IpPort.findByPk(req.params.id);
    
    if (!ipPort) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'IP:Port combination not found'
      });
    }
    
    await ipPort.update(req.body);
    res.json(ipPort);
  } catch (error) {
    next(error);
  }
});

// DELETE IP:Port
router.delete('/:id', async (req, res, next) => {
  try {
    const ipPort = await IpPort.findByPk(req.params.id);
    
    if (!ipPort) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'IP:Port combination not found'
      });
    }
    
    await ipPort.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
