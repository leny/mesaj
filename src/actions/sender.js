/* leny/mesaj
 *
 * /src/actions/sender.js - Message-sending actions
 *
 * coded by leny
 * started at 30/12/2018
 */

import jxa from "run-jxa";

export const send = async (service, target, content) => {
    await jxa(
        (transport, contact, message) => {
            /* eslint-disable new-cap */
            const app = Application("Messages");

            app.send(message, {to: app.services[transport].buddies[contact]});
            /* eslint-enable new-cap */
        },
        [service, target, content],
    );
};
