"use strict";

const bcrypt = require("bcryptjs");

/**  @type {import('sequelize-cli').Migration} **/
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("12345678", salt);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John Doe",
          email: "julian@gmail.com",
          password: hash,
          remember_token: "no",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("User", null, {});
  },
};
