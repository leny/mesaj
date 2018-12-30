/* leny/mesaj
 *
 * /src/actions/services.js - Services-related actions
 *
 * coded by leny
 * started at 30/12/2018
 */

import ora from "ora";
import jxa from "run-jxa";
import inquirer from "inquirer";

export const chooseService = async () => {
    const spinner = ora("Fetching services…").start();

    /* eslint-disable new-cap */
    const services = await jxa(() =>
        Object.values(Application("Messages").services())
            .filter(service => service.enabled())
            .map(service => service.name()),
    );
    /* eslint-enable new-cap */

    spinner.stop();

    const {service} = await inquirer.prompt({
        type: "list",
        name: "service",
        choices: services,
    });

    return service;
};
