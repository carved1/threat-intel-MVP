const express = require('express');
const router = express.Router();
const { Url } = require('../database/models');
const { Op } = require('sequelize');

// GET all URLs with pagination and filtering
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 50, threat_type, malware, reporter, min_confidence } = req.query;
    const offset = (page - 1) * limit;
    
    const where = {};
    if (threat_type) where.threat_type = threat_type;
    if (malware) where.malware = { [Op.like]: `%${malware}%` };
    if (reporter) where.reporter = reporter;
    if (min_confidence) where.confidence_level = { [Op.gte]: parseInt(min_confidence) };
    
    const { count, rows } = await Url.findAndCountAll({
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

// GET single URL by ID
router.get('/:id', async (req, res, next) => {
  try {
    const url = await Url.findByPk(req.params.id);
    
    if (!url) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'URL not found'
      });
    }
    
    res.json(url);
  } catch (error) {
    next(error);
  }
});

// POST create new URL
router.post('/', async (req, res, next) => {
  try {
    const url = await Url.create(req.body);
    res.status(201).json(url);
  } catch (error) {
    next(error);
  }
});

// PUT update URL
router.put('/:id', async (req, res, next) => {
  try {
    const url = await Url.findByPk(req.params.id);
    
    if (!url) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'URL not found'
      });
    }
    
    await url.update(req.body);
    res.json(url);
  } catch (error) {
    next(error);
  }
});

// DELETE URL
router.delete('/:id', async (req, res, next) => {
  try {
    const url = await Url.findByPk(req.params.id);
    
    if (!url) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'URL not found'
      });
    }
    
    await url.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
