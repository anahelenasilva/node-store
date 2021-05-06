"use strict";

const repository = require("../repositories/customer-repository");
const ValidationContract = require("../validators/fluent-validator");
const md5 = require("md5");
const emailService = require("../services/email-service");
const authService = require("../services/auth-service");

exports.get = async (request, response, next) => {
  try {
    var data = await repository.get();
    response.status(200).send(data);
  } catch (error) {
    response
      .status(500)
      .send({ message: "Falha ao processar a requisição ", data: error });
  }
};

exports.post = async (request, response, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    request.body.name,
    3,
    "O nome deve conter pelo menos 3 caracteres"
  );

  contract.isEmail(request.body.email, "Email inválido");

  contract.hasMinLen(
    request.body.password,
    6,
    "A senha deve conter pelo menos 6 caracteres"
  );

  if (contract.isValid() == false) {
    response.status(400).send(contract.errors()).end();
    return;
  }

  try {
    var customer = {
      name: request.body.name,
      email: request.body.email,
      password: md5(request.body.password + global.SALT_KEY),
    };

    var data = await repository.create(customer);

    var emailBody = global.EMAIL_TEMPLATE.replace("{0}", request.body.name);
    emailService.send(request.body.email, "Bem vindo ao NodeStore", emailBody);

    response.status(201).send({
      message: "Cliente cadastrado com sucesso",
      customer: data,
    });
  } catch (error) {
    response
      .status(500)
      .send({ message: "Falha ao processar a requisição ", data: e });
  }
};

exports.authenticate = async (request, response, next) => {
  try {
    var data = {
      email: request.body.email,
      password: md5(request.body.password + global.SALT_KEY),
    };

    const customer = await repository.authenticate(data);

    if (!customer) {
      response.status(404).send({
        message: "Usuário ou senha inválidos",
      });

      return;
    }

    const token = await authService.generateToken({
      email: customer.email,
      name: customer.name,
    });

    response.status(200).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name,
      },
    });
  } catch (error) {
    response
      .status(500)
      .send({ message: "Falha ao processar a requisição ", data: e });
  }
};
