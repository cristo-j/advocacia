//foi optado em implementar os relacionamentos em arquivo separado
//porem cada relacionamento pode ser implementado dentro de sua model separadamente
module.exports = function (models) {

  models.advogado.hasMany(models.processo, {
    foreignKey: 'id_advogado', //nome da FK
    onDelete: 'SET NULL', //configuracao da FK
  });

  models.processo.belongsTo(models.advogado, {
    foreignKey: 'id_advogado',
    onDelete: 'SET NULL',
  });
};
