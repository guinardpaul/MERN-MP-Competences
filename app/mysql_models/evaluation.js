const db = require('../db');

exports.create = function (description, created_at, classe_id, cycle_id, trimestre_id, done) {
  const values = [description, created_at, classe_id, cycle_id, trimestre_id];
  db.get().query('INSERT INTO evaluations (description, created_at, classe_id, cycle_id, trimestre_id) VALUES (?, ?, ?, ?, ?)', values, function (err, result) {
    if (err) return done(err);
    done(null, result);
  });
}

exports.update = function (id, description, created_at, classe_id, cycle_id, trimestre_id, done) {
  const values = [description, created_at, classe_id, cycle_id, trimestre_id, id];
  db.get().query('UPDATE evaluations SET description=?, created_at=?, classe_id=?, cycle_id=?, trimestre_id=? WHERE id=?', values, function (err, result) {
    if (err) return done(err);
    done(null, result);
  });
}

exports.delete = function (id, done) {
  db.get().query('DELETE FROM evaluations WHERE id=?', id, function (err, result) {
    if (err) return done(err);
    done(null, result);
  });
}

exports.getAll = function (done) {
  db.get().query('SELECT e.description, e.created_at, cl.name, cy.literal as cycle_literal, t.literal as trimestre_literal FROM evaluations e INNER JOIN classes cl ON e.classe_id=cl.id INNER JOIN enum_trimestres t ON t.id=e.trimestre_id INNER JOIN enum_cycles cy ON cy.id=e.cycle_id', function (err, result) {
    if (err) return done(err);
    done(null, result);
  });
}