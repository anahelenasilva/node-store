"use strict";

exports.post = (request, response, next) => {
  response.status(201).send(request.body);
};

exports.put = (request, response, next) => {
  const id = request.params.id;
  response.status(200).send({ id: id, item: request.body });
};

exports.delete = (request, response, next) => {
  response.status(200).send(request.body);
};
