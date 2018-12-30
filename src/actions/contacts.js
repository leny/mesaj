/* leny/mesaj
 *
 * /src/actions/contacts.js - Contacts-related actions
 *
 * coded by leny
 * started at 30/12/2018
 */

import ora from "ora";
import jxa from "run-jxa";
import {promisify} from "util";
import home from "user-home";
import fs from "fs";
import {resolve} from "path";
import inquirer from "inquirer";
import autocomplete from "inquirer-autocomplete-prompt";
import fuzzy from "fuzzy";

inquirer.registerPrompt("autocomplete", autocomplete);

const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const contactsCacheFilePath = resolve(home, ".mesaj.contacts.json");

const fetchContacts = async (forceRefresh = false) => {
    if (!forceRefresh && (await exists(contactsCacheFilePath))) {
        const contactsCacheFile = await readFile(contactsCacheFilePath, "utf8");

        return JSON.parse(contactsCacheFile);
    }

    const contacts = await jxa(() => {
        /* eslint-disable new-cap */
        const results = [];

        Object.values(Application("Contacts").people()).forEach(person => {
            person.phones().forEach(phone => {
                results.push({
                    name: person.name(),
                    label: `${person.name()} (${phone.label()})`,
                    value: phone.value(),
                });
            });
        });

        return results;
        /* eslint-enable new-cap */
    });

    await writeFile(contactsCacheFilePath, JSON.stringify(contacts), "utf8");

    return contacts;
};

const chooseContact = async (contacts, defaultInputValue = "") => {
    const {target} = await inquirer.prompt({
        type: "autocomplete",
        name: "target",
        message: "Choose the target contact for your message:",
        source: (_, input = defaultInputValue) =>
            new Promise(res =>
                res(
                    fuzzy
                        .filter(input, contacts, {extract: ({label}) => label})
                        .map(({original: {label}}) => label),
                ),
            ),
    });

    return contacts.find(({label}) => label === target).value;
};

export const chooseContactNumber = async (forceRefreshContacts = false) => {
    const spinner = ora("Fetching contacts…").start();

    const contacts = await fetchContacts(forceRefreshContacts);

    spinner.stop();

    return await chooseContact(contacts);
};

export const chooseNumberFromContact = async (
    contactName,
    forceRefreshContacts = false,
) => {
    const spinner = ora("Search contact infos…").start();

    const contacts = await fetchContacts(forceRefreshContacts);

    spinner.stop();

    const matches = contacts.reduce(
        (arr, contact) => (
            contact.name === contactName && arr.push(contact), arr
        ),
        [],
    );

    if (matches.length === 1) {
        return matches[0].value;
    }

    if (!matches.length) {
        return await chooseContact(contacts, contactName);
    }

    return await chooseContact(matches);
};
