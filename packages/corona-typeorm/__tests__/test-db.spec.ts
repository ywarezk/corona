/**
 * We want to test our db tables
 */

import { expect } from 'chai';
import { createConnection, Connection } from 'typeorm';
import { resolve } from 'path';
import { Location } from '../lib/location.entity';
import { User } from '../lib/user.entity';

describe('group of tests', () => {
    let connection: Connection;

    /**
     * create a database connection
     */
    beforeEach(async () => {
        connection = await createConnection({
            type: 'sqlite',
            database: resolve(__dirname, 'db.sqlite'),
            entities: [Location, User],
            synchronize: true,
            dropSchema: true,
        });
    });

    afterEach(async () => {
        await connection.close();
    });

    it('create user', async () => {
        const user = new User();
        user.uid = 'hello world';
        await user.save();

        const myLocation = new Location();
        myLocation.latitude = 32.45;
        myLocation.longitude = 23.98;
        myLocation.time = new Date();
        myLocation.user = user;
        await myLocation.save();

        const users = await User.find();
        expect(users.length).to.equal(1);

        const locations = await Location.find();
        expect(locations.length).to.equal(1);
    });
});
