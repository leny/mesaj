/* leny/mesaj
 *
 * /src/pre-install.js - Pre-install message
 *
 * coded by leny
 * started at 30/12/2018
 */

import chalk from "chalk";

if (process.platform !== "darwin") {
    const message = [
        "😱",
        chalk.red("Oops! Wrong platform!"),
        "\n",
        chalk.cyan("mesaj"),
        "is a wrapper over the macos",
        chalk.cyan("Messages"),
        "app.",
        "\n",
        "As your system isn't",
        `${chalk.yellow("macOS")}, the installation stops here. Sorry.`,
        "\n",
    ];

    console.log(...message); // eslint-disable-line no-console

    process.exit(1);
}
