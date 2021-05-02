"use strict";

const repository = require("../repositories/customer-repository");
const ValidationContract = require("../validators/fluent-validator");

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
    var data = await repository.create(request.body);
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
