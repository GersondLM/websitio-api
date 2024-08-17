const db = require('../config/db.config.js');
const Customer = db.Customer;

// Create a new customer
exports.create = (req, res) => {
  let customer = {};

  try{
      customer.Nombre = req.body.Nombre;
      customer.Descripcion = req.body.Descripcion;
      customer.Artista = req.body.Artista;
      customer.Duracion = req.body.Duracion;
      customer.Extension = req.body.Extension;
      customer.Albun = req.body.Albun;
      customer.Año = req.body.Año;
  
      Customer.create(customer).then(result => {    
          res.status(200).json({
              message: "Upload Successfully a musuc with id = " + result.id,
              customer: result,
          });
      });
  }catch(error){
      res.status(500).json({
          message: "Fail!",
          error: error.message
      });
  }
}


// Retrieve all customers
exports.retrieveAllCustomers = async (req, res) => {
    try {
        let customerInfos = await Customer.findAll();
        res.status(200).json({
            message: "Get all Customers' Infos Successfully!",
            customers: customerInfos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
};

// Retrieve a customer by Id
exports.getCustomerById = async (req, res) => {
    try {
        let customerId = req.params.id;
        let customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({
                message: "Musica no encontrado con el id= " + customerId
            });
        }
        res.status(200).json({
            message: "Musica no encontrado con el id = " + customerId,
            customer: customer
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
};

// Filter customers by age
exports.filteringByAge = async (req, res) => {
    try {
        let age = req.query.age;
        let results = await Customer.findAll({
            attributes: ['id', 'Nombre', 'Descripcion', 'Artista', 'Duracion', 'Extension', 'albun', 'Año'],
            where: { age: age }
        });
        res.status(200).json({
            message: "Consigue todos los clientes con edad = " + age,
            customers: results
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
};

// Pagination
exports.pagination = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        const offset = page ? page * limit : 0;
        let data = await Customer.findAndCountAll({ limit: limit, offset: offset });
        const totalPages = Math.ceil(data.count / limit);
        res.status(200).json({
            message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
            data: {
                copyrightby: "Examen Spotify",
                totalItems: data.count,
                totalPages: totalPages,
                limit: limit,
                currentPageNumber: page + 1,
                currentPageSize: data.rows.length,
                customers: data.rows
            }
        });
    } catch (error) {
        res.status(500).send({
            message: "Error ->¡NO se puede completar una solicitud de localización!",
            error: error.message
        });
    }
};

// Pagination, filtering, and sorting
exports.pagingfilteringsorting = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let age = parseInt(req.query.age);
        const offset = page ? page * limit : 0;
        let data = await Customer.findAndCountAll({
            attributes: ['id', 'Nombre', 'Descripcion', 'Artista', 'Duracion', 'Extension', 'albun', 'Año'],
            where: { age: age },
            order: [['Nombre', 'ASC'], ['Descripcion', 'DESC']],
            limit: limit,
            offset: offset
        });
        const totalPages = Math.ceil(data.count / limit);
        res.status(200).json({
            message: "Pagination Filtering Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", age = " + age,
            data: {
                copyrightby: "Examen",
                totalItems: data.count,
                totalPages: totalPages,
                limit: limit,
                ageFiltering: age,
                currentPageNumber: page + 1,
                currentPageSize: data.rows.length,
                customers: data.rows
            }
        });
    } catch (error) {
        res.status(500).send({
            message: "Error -> ¡NO se puede completar una solicitud de localización!",
            error: error.message
        });
    }
};

// Update customer by Id
exports.updateById = async (req, res) => {
    try {
        let customerId = req.params.id;
        let customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({
                message: "No encontrado para actualizar la musica con identificación = " + customerId
            });
        }

        let updatedObject = {
            Nombre: req.body.Nombre,
            Descripcion: req.body.Descripcion,
            Artista: req.body.Artista,
            Duracion: req.body.Duracion,
            Extension: req.body.Extension,
            albun: req.body.albun,
            Año: req.body.Año
        };

        let result = await Customer.update(updatedObject, { returning: true, where: { id: customerId } });

        if (!result) {
            return res.status(500).json({
                message: "Error -> Can not update a customer with id = " + req.params.id,
                error: "Can NOT Updated"
            });
        }

        res.status(200).json({
            message: "Update successfully a music with id = " + customerId,
            customer: updatedObject
        });
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a music with id = " + req.params.id,
            error: error.message
        });
    }
};

// Delete customer by Id
exports.deleteById = async (req, res) => {
    try {
        let customerId = req.params.id;
        let customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({
                message: "Does Not exist a music with id = " + customerId,
                error: "404"
            });
        }

        await customer.destroy();
        res.status(200).json({
            message: "Delete Successfully a music with id = " + customerId,
            customer: customer
        });
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a music with id = " + req.params.id,
            error: error.message
        });
    }
};
