const Classes = require('../sequelize_models/models').Classes;

module.exports = router => {
  /**
   * Get All Classes
   */
  router.get('/classes', (req, res, next) => {
    Classes.findAll({
        attributes: ['id', 'name', 'cycle_id']
      })
      .then(result => {
        console.log(result);
        return res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json(err);
      });
  });

  /**
   * Get One Classe by Id
   */
  router.get('/classes/:id', (req, res, next) => {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Classes.findById(req.params.id)
        .then(result => {
          console.log('result: ', result);
          res.status(200).json(result);
        })
        .catch(err => {
          console.log('err: ', err);
          res.status(400).json(err);
        });
    }
  });

  router.get('/classes/nom/:name', (req, res, next) => {
    if (!req.params.name) {
      res.status(400).json({
        success: false,
        message: 'name not provided'
      });
    } else {
      Classes.findOne({
          name: req.params.name
        })
        .then(result => {
          console.log('result: ', result);
          res.status(200).json(result);
        })
        .catch(err => {
          console.log('err: ', err);
          res.status(40).json(err);
        });
    }
  });

  /**
   * Save Classe
   */
  router.post('/classes', (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        message: 'name not provided'
      });
    } else if (!req.body.cycle_id) {
      return res.status(400).json({
        success: false,
        message: 'cycle_id not provided'
      });
    } else {
      Classes.create(req.body)
        .then(result => {
          console.log('result: ', result);
          res.status(200).json(result);
        })
        .catch(err => {
          console.log('err: ', err);
          res.status(400).json(err);
        });
    }
  });

  /**
   * Update Classe
   */
  router.put('/classes/:id', (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'body not provided'
      });
    } else if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Classes.update(req.body, {
          where: {
            id: req.params.id
          }
        })
        .then(result => {
          console.log('result: ', result);
          res.status(201).json(result);
        })
        .catch(err => {
          console.log('err: ', err);
          res.status(400).json(err);
        });
    }
  });

  /**
   * Delete Classe
   */
  router.delete('/classes/:id', (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Classes.destroy({
          where: {
            id: req.params.id
          }
        })
        .then(result => {
          console.log('result: ', result);
          res.status(200).json(result);
        })
        .catch(err => {
          console.log('err: ', err);
          res.status(400).json(err);
        });
    }
  });

  return router;
};