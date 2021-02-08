const uuidv4 = require('uuid/v4'); 

module.exports = app => {
    const customerWalletsDB = app.data.customerWallets;
    const controller = {};

    const{
      customerWallets: customerWalletsMock,
    } = customerWalletsDB;

    controller.listCustomerWallets = (req, res) => res.status(200).json(customerWalletsDB);
  
    controller.saveCustomerWallets = (req, res) => {
      customerWalletsMock.data.push({
        matricula: uuidv4(),
        matricula2: uuidv4(),
        CPF: req.body.CPF,
        nome: req.body.nome,
        dataDenasci: req.body.dataDenasci,
        Telefone1: req.body.Telefone1,
        Telefone2: req.body.Telefone2,
        email: req.body.email,
        cargo: req.body.cargo,
        estado: req.body.estado,
      });

      res.status(201).json(customerWalletsMock);
    }

    controller.removeCustomerWallets = (req, res) => {
      const{
        customerId,
      } = req.params;
      
      const foundCustomerIndex = customerWalletsMock.data.findIndex(customer => customer.id = customerId);
    
      if (foundCustomerIndex = -1){
        res.status(404).json({
          message:'Funcionario não encontrado na base de dados',
          success: false,
          customerWallets: customerWalletsMock,
        });
      }else {
       customerWalletsMock.data.splice(foundCustomerIndex, 1);
       res.status(200).json({
         message: 'Funcionario encontrado e deletado com sucesso.',
         success: true,
         customerWallets: customerWalletsMock,
       });
      }
    }
    
    controller.updateCustomerWallets = (req, rest) => {
      const{
        customerId,
       } =req.params;
       const foundCustomerIndex = customerWalletsMock.data.findIndex(customer => customer.id = customerId );
       if(foundCustomerIndex = -1){
         res.status(404).json({
           message: 'funcionario nao encontrado na base de dados',
           success: false,
           customerWallets: customerWalletsMock,
         });
       }else{
         const newCustomer = {
           matricula: customerId,
           CPF: req.body.CPF,
           nome: req.body.nome,
           dataDenasci: req.body.dataDenasci,
           Telefone1: req.body.Telefone1,
           Telefone2: req.body.Telefone2,
           email: req.body.email,
           cargo: req.body.cargo,
           estado: req.body.estado,
           datadeCriacao: new Date()

         };

        customerWalletsMock.data.splice(foundCustomerIndex, 1, newCustomer);

        res.status(200).json({
          message: 'Funcionario encontrado e atualizado com sucesso!',
          success: true,
          customerWallets: customerWalletsMock,  
        });
       }
    }

    return controller;
  }