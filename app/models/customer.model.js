module.exports = (sequelize, Sequelize) => {
    const music = sequelize.define('music', {    
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Nombre: {
            type: Sequelize.STRING
        },
        Descripcion: {
            type: Sequelize.STRING
        },
        Artista: {
            type: Sequelize.STRING
        },
        Duracion: {
            type: Sequelize.INTEGER
        },
        Extension: {
            type: Sequelize.STRING
        },
        Albun: {
            type: Sequelize.STRING
        },
        Año: {
            type: Sequelize.INTEGER
        }
    });
    
    return music;
}
