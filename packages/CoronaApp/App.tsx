/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
} from 'react-native';
import Geolocation, { GeoPosition, GeoError } from 'react-native-geolocation-service';
import {SQLiteDatabase, ResultSet, openDatabase} from 'react-native-sqlite-storage';

const App = () => {
  const [position, setPosition] = useState<GeoPosition | null>(null);
  const [db, setDb] = useState<SQLiteDatabase | null>(null);

  useEffect(() => {
    // const temp = openDatabase;
    // debugger;
    const tempDb = openDatabase({name: 'location.db', location: 'default'}, () => {
      setDb(tempDb);
    }, (err) => {
      console.log(`database error: ${err.message}`);
    });
    

    return () => {
      if (db) {
        db.close()
      }
    }
  }, []);

  useEffect(() => {
    Geolocation.requestAuthorization();
    Geolocation.setRNConfiguration({skipPermissionRequests: false, authorizationLevel: 'always'});
    const watchId = Geolocation.watchPosition(
      (position: GeoPosition) => {
        setPosition(position);
        db?.executeSql(`CREATE TABLE IF NOT EXISTS "location" (
          "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	        "latitude"	REAL NOT NULL,
	        "longitude"	REAL NOT NULL,
	        "time"	TEXT NOT NULL
        )`, [], () => {
          db.executeSql(`
            INSERT INTO "location"
            ("latitude", "longitude", "time")
            VALUES (${position.coords.latitude}, ${position.coords.longitude}, '${(new Date().toISOString())}');
          `, [], () => {
            console.log("inserted location!");
          }, (transaction, error) => {
            console.log(`Error1: ${error.message}`);
          });
        }, (transaction, error) => {
          console.log(`Error2: ${error.message}`);
        })
      },
      (error: GeoError) => {
        console.log(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, useSignificantChanges: true, distanceFilter: 3 }
    )

    return () => {
      Geolocation.clearWatch(watchId);
    }
  }, [db]);

  return (
    <View style={ {height: '100%', backgroundColor: 'red', display: 'flex', justifyContent: 'center'} }>
      <View style={ {justifyContent: 'center', backgroundColor: 'blue'} }>
        <Text>
          Hello world
        </Text>
        {
          position && <Text>{position.coords.latitude} {position.coords.longitude}</Text>
        }
      </View>
      
    </View>
  );
};



export default App;
