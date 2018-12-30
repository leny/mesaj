#!/usr/bin/env node
/* leny/mesaj
 *
 * /src/index.js - Main entry point
 *
 * coded by leny
 * started at 30/12/2018
 */

import commander from "commander";
import chalk from "chalk";
import {chooseContactNumber, chooseNumberFromContact} from "./actions/contacts";
import {getMessageContent} from "./actions/message";
import {chooseService} from "./actions/services";
import {send} from "./actions/sender";

const {version, description} = require(`${__dirname}/../package.json`);

commander.version(version);
commander.description(
    `${description}.\nIf no option are given, the target contact and message will be prompted.`,
);

commander.option("-c, --contact <contact>", "target contact to send message");
commander.option("-m, --message <message>", "message to send");
commander.option(
    "-s, --service",
    "choose the account in charge of sending the message",
);
commander.option("-r, --refresh", "refresh cache info for contacts");

commander.action(async ({service, contact, message, refresh}) => {
    try {
        let transport = 0,
            target,
            content;

        if (service) {
            transport = await chooseService();
        }

        if (!contact) {
            target = await chooseContactNumber(refresh);
        } else {
            target = await chooseNumberFromContact(contact, refresh);
        }

        if (!message) {
            content = await getMessageContent();
        } else {
            content = message;
        }

        await send(transport, target, content);

        console.log(
            "🎉",
            chalk.green("Success:"),
            "Your message as been sent.",
        );
    } catch (err) {
        console.log(
            "😵",
            chalk.red("Oops:"),
            "An error occured:",
            err.message.toString(),
        );
    }
});

commander.parse(process.argv);
