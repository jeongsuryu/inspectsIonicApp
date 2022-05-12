import { getPlatforms  } from '@ionic/react';

export default function getPlatform() {
    const platform = getPlatforms();

    if ( platform[1] === 'ios') {
        return 'ios';
    } else if (platform[0] === 'android') {
        return 'android';
    }
}