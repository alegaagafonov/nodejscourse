import { MongoClient } from 'mongodb';
import { URL, COLLECTION_NAME, DB_NAME } from "../config.js";

export class MongoDatabaseClient {
    constructor() {
        this.client = new MongoClient(URL);
        this.db = this.client.db(DB_NAME);
        this.collection = this.db.collection(COLLECTION_NAME);
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Successfully connected to mongo database');
        } catch (err) {
            console.log(err);
        }
    }

    async getEntries() {
        try {
            const entries = await this.collection.find({}).toArray();

            console.log(`Entries have been successfully retrieved from '${COLLECTION_NAME}' collection`);

            return entries;
        } catch (err) {
            console.log(err);
        }
    }

    async getEntry(query) {
        try {
            const entry = await this.collection.findOne(query);

            console.log(`Entry with '${JSON.stringify(query)}' fields has been successfully retrieved from '${COLLECTION_NAME}' collection`);

            return entry;
        } catch (err) {
            console.log(err);
        }
    }

    async insertEntry(entry) {
        try {
            const result = await this.collection.insertOne(entry);

            console.log(`Entry '${JSON.stringify(entry)}' has been successfully added to '${COLLECTION_NAME}' collection`);

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    async updateEntry(query, update) {
        try {
            const entry = await this.collection.updateOne(query, { $set: update });

            console.log(`Entry with fields '${JSON.stringify(query)}' has been successfully updated with '${JSON.stringify(update)}' object`);

            return entry;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteEntry(query) {
        try {
            const entry = await this.collection.deleteOne(query);

            console.log(`Entry with fields '${query}' has been successfully deleted from '${COLLECTION_NAME}' collection`);

            return entry;
        } catch (err) {
            console.log(err);
        }
    }
}
