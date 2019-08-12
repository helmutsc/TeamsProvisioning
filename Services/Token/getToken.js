var adal = require('adal-node');
var settings = require('../Settings/settings');

// getToken() - Return promise of auth token for app
// permission (client credentials flow)
module.exports = function getToken(context) {

  return new Promise((resolve, reject) => {

    var txthlp = "";
    // Get the ADAL client
    const authContext = new adal.AuthenticationContext(
      settings().AUTH_URL + settings().TENANT);
    
    txthlp=settings().AUTH_URL;
    context.log(`AUTH_URL ${txthlp}`);
    txthlp=settings().TENANT;
    context.log(`TENANT ${txthlp}`);
    txthlp=settings().CLIENT_SECRET;
    context.log(`CLIENT_SECRET ${txthlp}`);
    
    authContext.acquireTokenWithClientCredentials(
      settings().GRAPH_URL, settings().CLIENT_ID, settings().CLIENT_SECRET, 
      (err, tokenRes) => {
        if (err) {
          reject(err); 
        } else {
          resolve(tokenRes.accessToken);
        }
    });
  });
}
