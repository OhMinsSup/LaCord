import { createClient } from '@google/maps';
import { GOOGLE_MAP_API_KEY } from '../config/config';

const googleMapsClient = createClient({
    key: GOOGLE_MAP_API_KEY,
});

function getElevation (coordinates: Object[]) {
    return new Promise((resolve, reject) => {
        googleMapsClient.elevation({
            locations: coordinates
        }, (e , res) => {
            if (e) return reject(e)
            resolve (res.json.results);
        })
    })
}

export {
    getElevation
};
