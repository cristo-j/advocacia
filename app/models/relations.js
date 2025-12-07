//foi optado em implementar os relacionamentos em arquivo separado
//porem cada relacionamento pode ser implementado dentro de sua model separadamente
module.exports = function (models) {

  models.vinho.hasMany(models.garrafa, {
    foreignKey: 'id_vinho', //nome da FK
    onDelete: 'RESTRICT', //configuracao da FK
  });

  models.garrafa.belongsTo(models.vinho, {
    foreignKey: 'id_vinho',
    onDelete: 'RESTRICT',
  });
};
