const WilderModel = require("../models/Wilder");

module.exports = {
  create: (req, res) => {
    WilderModel.init().then(() => {
      const wilder = new WilderModel(req.body);
      wilder
        .save()
        .then((result) => {
          res.json({ success: true, result: result });
        })
        .catch((err) => {
          res.json({ success: false, result: err });
        });
    });
  },
  findall: (req, res) => {
    WilderModel
    .find({})
    .then(wilders => 
      res.json({ success: true, result: wilders }))
    .catch((err) => {
      res.json({ success: false, result: err })
    })
  },
  update: (req, res) => {
    WilderModel
    .findById(req.params._id)
    .then(wilder => {
      if (wilder) {
        Object.assign(wilder, req.body);
        wilder
        .save()
        .then(() => res.json({ success: true, result: wilder }))
        .catch((err) => {
          res.json({ success: false, result: err })})
      } else {
        res.status(404).json({ message: 'not found' })
      }})
  },
  delete: (req, res) => {
    WilderModel.findByIdAndRemove(req.params._id)
    .then(wilder => {
      if (!wilder) {
        res.status(404).send({
          message: `Cannot delete wilder with id=${req.params._id}. Maybe wilder was not found!`
        });
      } else {
        res.send({
          message: "wilder was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + req.params._id
      });
    })
  },
  deleteAll: (req, res) => {
    WilderModel.deleteMany({})
    .then(wilders => {
      if (!wilders) {
        res.status(404).send({
          message: `Cannot find wilder with city=${req.params.city}. Maybe wilder was not found!`
        });
      } else {
        res.send({ message: 'All the wilders are removed !'})
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all wilders."
      });
    });
  },
  findAllCity: (req, res) => {
    WilderModel.find({ city: req.params.city })
    .then(wilder => {
      res.send(wilder);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving wilders."
      });
    });
  }
};