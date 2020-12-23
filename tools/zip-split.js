const inquirer = require('inquirer');
const zipSplit = require('../tasks/zip-split');
const ui = require('@tryghost/pretty-cli').ui;

const choice = {
    name: 'Zip Split',
    value: 'zipSplit'
};

const options = [
    {
        type: 'input',
        name: 'zipFile',
        message: 'Path to zip file (drag file into this window):',
        filter: function (val) {
            return val.trim();
        }
    },
    {
        type: 'number',
        name: 'maxSize',
        message: 'Maximum zip size (in MB):',
        default: function () {
            return 50;
        }
    }
];

async function run() {
    let opts = {};

    await inquirer.prompt(options).then(async (answers) => {
        Object.assign(opts, answers);

        let timer = Date.now();
        let context = {errors: []};

        try {
            let runner = zipSplit.getTaskRunner(opts);
            await runner.run(context);
            ui.log.ok(`Successfully split zip in ${Date.now() - timer}ms.`);
        } catch (error) {
            ui.log.error('Done with errors', context.errors);
        }
    });
}

module.exports.choice = choice;
module.exports.doit = options;
module.exports.run = run;
