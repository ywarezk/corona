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
import { DbService } from './services/db.service';

const App = () => {
  const [position, setPosition] = useState<GeoPosition | null>(null);

  useEffect(() => {
    Geolocation.requestAuthorization();
    Geolocation.setRNConfiguration({skipPermissionRequests: false, authorizationLevel: 'always'});
    const watchId = Geolocation.watchPosition(
      (position: GeoPosition) => {
        setPosition(position);
        
        DbService.getInstance().insertLocation(position.coords.latitude, position.coords.longitude).then(() => {
          console.log('success');
        }, (err: Error) => {
          console.log(`error: ${err.message}`);
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
