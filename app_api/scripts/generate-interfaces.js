const MongooseTsgen = require('mongoose-tsgen');
const path = require('path');
const mongoose = require('mongoose');

// Connect to the database
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;
mongoose.connect(dbURI);

console.log("Resolved tsconfig.json path:", path.resolve(__dirname, "../../app_admin/tsconfig.json"));

async function run() {
    const tsgen = new MongooseTsgen();
    await tsgen.generateDefinitions({
        flags: {
            "dry-run": false,
            "no-format": false,
            "no-mongoose": false,
            "no-populate-overload": false,
            "dates-as-strings": false,
            debug: false,
            output: "./app_admin/src/app/interfaces",
            project: "./app_admin/tsconfig.json"  // Use a relative path
        },
        args: {
            model_path: "./app_api/models/**/*.js" // Adjust the path to your models
        }
    });
    console.log('TypeScript interfaces generated successfully.');
    mongoose.disconnect();
}

run().catch(err => {
    console.error('Error generating TypeScript interfaces:', err);
    mongoose.disconnect();
});