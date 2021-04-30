"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const repository = require("../repositories/product-repository");
const ValidationContract = require("../validators/fluent-validator");

exports.get = async (request, response, next) => {
  try {
    var data = await repository.get();
    response.status(200).send(data);
  } catch (error) {
    response
      .status(500)
      .send({ message: "Falha ao processar a requisição ", data: e });
  }
};

exports.getBySlug = async (request, response, next) => {
  try {
    var data = await repository.getBySlug(request.params.slug);
    response.status(200).send(data);
  } catch (error) {
    response
      .status(500)
      .send({ message: "Falha ao processar a requisição ", data: e });
  }
};

exports.getById = async (request, response, next) => {
  try {
    var data = await repository.getById(request.params.id);
    response.status(200).send(data);
  } catch (error) {
    response
      .status(500)
      .send({ message: "Falha ao processar a requisição ", data: e });
  }
};

exports.getByTag = async (request, response, next) => {
  try {
    var data = await repository.getByTag(request.params.tag);
    response.status(200).send(data);
  } catch (error) {
    response
      .status(500)
      .send({ message: "Falha ao processar a requisição ", data: e });
  }
};

exports.post = async (request, response, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    request.body.title,
    3,
    "O título deve conter pelo menos 3 caracteres"
  );

  contract.hasMinLen(
    request.body.slug,
    3,
    "O slug deve conter pelo menos 3 caracteres"
  );

  contract.hasMinLen(
    request.body.description,
    3,
    "A descrição deve conter pelo menos 3 caracteres"
  );

  if (contract.isValid() == false) {
    response.status(400).send(contract.errors()).end();
    return;
  }

  try {
    var data = await repository.create(request.body);
    response.status(200).send(data);
  } catch (error) {
    response
      .status(500)
      .send({ message: "Falha ao processar a requisição ", data: e });
  }
};

exports.put = async (request, response, next) => {
  try {
    var data = await repository.update(request.params.id, request.body);
    response.status(200).send(data);
  } catch (error) {
    response
      .status(500)
      .send({ message: "Falha ao processar a requisição ", data: e });
  }
};

exports.delete = async (request, response, next) => {
  try {
    var data = await repository.delete(request.params.id);
    response.status(200).send(data);
  } catch (error) {
    response
      .status(500)
      .send({ message: "Falha ao processar a requisição ", data: e });
  }
};
