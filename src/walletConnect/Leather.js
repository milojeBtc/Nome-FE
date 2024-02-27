import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { StacksTestnet, StacksMainnet } from '@stacks/network';

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

var resolve = function(cardinalAddress, ordinalAddress) { 
  // use addresses
};

if (!userSession.isUserSignedIn()) {
    showConnect({
        userSession,
        network: StacksMainnet,
        appDetails: {
            name: 'App Name',
            icon: window.location.origin + '/app-icon.png',
        },
        onFinish: () => {
            resolve(userSession.loadUserData().profile.btcAddress.p2wpkh.mainnet,
              userSession.loadUserData().profile.btcAddress.p2tr.mainnet);
        },
        onCancel: () => {
            // handle if user closed connection prompt
        },
    });
} else {
    cardinalAddress = userSession.loadUserData().profile.btcAddress.p2wpkh.mainnet;
    ordinalAddress = userSession.loadUserData().profile.btcAddress.p2tr.mainnet;
}