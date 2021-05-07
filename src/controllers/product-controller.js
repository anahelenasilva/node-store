"use strict";

const repository = require("../repositories/product-repository");
const ValidationContract = require("../validators/fluent-validator");
const guid = require("guid");
const azure = require("azure-storage");
var config = require("../config");

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

  let fileName = guid.raw().toString() + ".jpg";
  try {
    // const blobSvc = azure.createBlobService(config.containerConnectionString);
    // let rawData = request.body.image;
    // let matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    // let type = matches[1];
    // let buffer = new buffer(matches[(2, "base64")]);
    // await blobSvc.createBlockBlobFromText(
    //   "product-images",
    //   fileName,
    //   buffer,
    //   {
    //     contentType: type,
    //   },
    //   function (error, result, response) {
    //     if (error) {
    //       fileName = "default-product.png";
    //     }
    //   }
    // );
  } catch (error) {}

  let product = {
    title: request.body.title,
    slug: request.body.slug,
    description: request.body.description,
    price: request.body.price,
    active: true,
    tags: request.body.tags,
    //image: "teste",
    image: `https://nodestoreana.blob.core.windows.net/product-images/${fileName}`,
  };

  try {
    var data = await repository.create(product);
    response.status(200).send(data);
  } catch (error) {
    response
      .status(500)
      .send({ message: "Falha ao processar a requisição ", data: error });
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
    var data = await repository.delete(request.body.id);
    response.status(200).send(data);
  } catch (error) {
    response
      .status(500)
      .send({ message: "Falha ao processar a requisição ", data: e });
  }
};
