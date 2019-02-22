
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'First Note', content: 'Test note text', userId: 1 },
        {title: 'Second Note', content: 'Test note text different text', userId: 1 }
      ]);
    });
};
