const uuid = require("uuid");

const Conversations = require("../models/conversations.models");
const Participants = require("../models/participants.models");
const Users = require("../models/users.models");

const findAllConversations = async () => {
  const data = await Conversations.findAll({
    include: {
      model: Participants,
      include: {
        model: Users,
      },
    },
  });
  return data;
};

const findConversationById = async (id) => {
  const data = await Conversations.findOne({
    where: {
      id: id,
    },
    include: {
      model: Participants,
      include: {
        model: Users,
      },
    },
  });
  return data;
};

const createConversation = async (obj) => {
  const newConversation = await Conversations.create({
    id: uuid.v4(),
    title: obj.title,
    imgUrl: obj.imgUrl,
    userId: obj.ownerId,
  });
  const participant1 = await Participants.create({
    id: uuid.v4(),
    userId: obj.ownerId,
    conversationId: newConversation.id,
  });
  const participant2 = await Participants.create({
    id: uuid.v4(),
    userId: obj.participantId,
    conversationId: newConversation.id,
  });

  return {
    newConversation,
    participant1,
    participant2,
  };
};

const updateConversation = async (id, obj) => {
  const data = await Conversations.update(obj, {
    where: {
      id: id,
    },
  });
  return data[0];
};

const removeConversation = async (id) => {
  const data = await Conversations.destroy({
    where: {
      id: id,
    },
  });
  return data;
};

module.exports = {
  findAllConversations,
  createConversation,
  findConversationById,
  updateConversation,
  removeConversation,
};

/* prueba creacion de conversacion */
/* createConversation({
  title: "Conversacion luis - fernando", //? Titulo del chat
  ownerId: "9f65cce7-f8f0-4d54-a682-a3ea498c8dae", //? Evertz como owner
  participantId: "2554231b-2250-4c32-9714-3509fbc43b36", //? Sahid como invitado
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err)); */
