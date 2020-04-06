/**
 * This service will manage the db and inserting into the db
 * 
 * Created April 5th, 2020
 * @author: ywarezk
 * @version: 1.0.0
 * @copyright: Nerdeez Ltd
 */

import { createConnection, Connection } from 'typeorm/browser';
import { Location } from '@nerdeez/corona-typeorm';

export class DbService {
    private _connection: Promise<Connection>;
    static _instance: DbService | null = null;

    /**
     * this will be used to grab the instance or create
     * a new one if non exist
     */
    static getInstance = () => {
        if (DbService._instance) return DbService._instance;
        DbService._instance = new DbService();
        return DbService._instance
    }

    /**
     * Since we need to create the connection only one time
     * the singleton constructor is a good place to do that
     */
    private constructor() {
        this._connection = createConnection({
            type: 'react-native',
            database: 'location.sqlite',
            logging: true,
            location: 'default',
            entities: [
                Location
            ]
        })
    }

    /**
     * given the location coords, we will add them to the database
     * @param latitude
     * @param longitude
     * @returns the location created
     */
    insertLocation = async (latitude: number, longitude: number): Promise<Location> => {
        await this._connection;
        const location = new Location();
        location.latitude = latitude;
        location.longitude = longitude;
        location.time = new Date();
        await location.save();
        return location;
    }
}