import { useState, useEffect } from 'react';

/**
 * THIS IS A HELPER HOOK THAT RETURNS A LOCATION OBJECT
 */

const useGetCoords = ()=>{
    const [locationPermissionState, setLocationPermissionState] = useState(false);
    const [locationObject, setLocationObject] = useState({
        latitude: '',
        longitude: ''
    });

    useEffect(()=>{
        if(locationPermissionState) {
            return;
        }else {    
            navigator.geolocation.getCurrentPosition((pos)=>{
                if(pos.coords !== '' || pos.coords !== undefined || pos.latitude !== null) {
                    setLocationPermissionState(true);
                    setLocationObject({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    });
                }else {
                    setLocationPermissionState(false);
                }
            });
        }

    }, [locationPermissionState]);

    return {...locationObject, permission: locationPermissionState};

};

export default useGetCoords;