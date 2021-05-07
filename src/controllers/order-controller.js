"use strict";

const repository = require("../repositories/order-repository");
const guid = require("guid");
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
  const token =
    request.body.token ||
    request.query.token ||
    request.headers["x-access-token"];

  const dataToken = await authService.decodeToken(token);

  const orderToSave = {
    customer: dataToken.id,
    number: guid.raw().substring(0, 6),
    items: request.body.items,
  };

  try {
    var data = await repository.create(orderToSave);
    response.status(200).send({
      message: "Pedido cadastrado com sucesso",
      order: data,
    });
  } catch (error) {
    response
      .status(500)
      .send({ message: "Falha ao processar a requisição ", data: error });
  }
};
