/* leny/mesaj
 *
 * /src/actions/message.js - Message-related actions
 *
 * coded by leny
 * started at 30/12/2018
 */

import inquirer from "inquirer";

export const getMessageContent = async () => {
    const {content} = await inquirer.prompt({
        type: "editor",
        name: "content",
        message: "Enter your message:",
    });

    return (content || "").trim();
};
