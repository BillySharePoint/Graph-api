import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import { Logger, LogLevel } from 'msal';

// The auth provider should be a singleton. Best practice is to only have it ever instantiated once.
// Avoid creating an instance inside the component it will be recreated on each render.
// If two providers are created on the same page it will cause authentication errors.
export const authProvider = new MsalAuthProvider(
  {
    auth: {
      authority:
        'https://login.microsoftonline.com/de4c8712-9459-4421-b133-3cf5dd8bf3f4',
      clientId: '7f681c3e-328b-4b71-a022-70d92107db4e',
      postLogoutRedirectUri: 'https://localhost:3000/#',
      redirectUri: 'https://localhost:3000/#',
      validateAuthority: true,

      // After being redirected to the "redirectUri" page, should user
      // be redirected back to the Url where their login originated from?
      navigateToLoginRequestUrl: true,
    },
    // Enable logging of MSAL events for easier troubleshooting.
    // This should be disabled in production builds.
    system: {
      logger: new Logger(
        (logLevel, message, containsPii) => {
          console.log('[MSAL]', message);
        },
        {
          level: LogLevel.Verbose,
          piiLoggingEnabled: false,
        }
      ),
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: true,
    },
  },
  {
    scopes: ['AllSites.Read'],
  },
  {
    loginType: LoginType.Popup,
    // When a token is refreshed it will be done by loading a page in an iframe.
    // Rather than reloading the same page, we can point to an empty html file which will prevent
    // site resources from being loaded twice.
    tokenRefreshUri: window.location.origin + '/auth.html',
  }
);
