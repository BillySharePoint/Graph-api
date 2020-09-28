import React, { useState, useEffect } from 'react';
import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { basicReduxStore } from './basicReduxStore';
import axios from 'axios';

// Import the authentication provider which holds the default settings
import { authProvider } from './authProvider';
import SampleAppButtonLaunch from './SampleAppButtonLaunch';
import Axios from 'axios';

const Insiderapp = (props) => {
  const [SampleStype, setSampleStype] = useState({});
  // const [SampleBox, setSampleBox] = {};

  const handleClick = (sampleType) => {
    setSampleStype({ sampleType });
    localStorage.setItem('sampleType', sampleType);
  };

  const handleACToken = async () => {
    const token = await authProvider.getAccessToken();
    console.log('NICE##', token);

    // https://graph.microsoft.com/v1.0/sites/cie493742.sharepoint.com:/sites/Contoso/Operations/Manufacturing?$select=id
    let farmUrl = 'm365x044405.sharepoint.com';
    let siteUrl = 'sites/BILLY';

    const request = await axios({
      method: 'GET',
      url: `https://graph.microsoft.com/v1.0/sites/${farmUrl}:/${siteUrl}?$select=id`,
      headers: {
        Accept: 'application/json',
        'content-Type': 'application/json',
        Authorization: `Bearer ${token.accessToken}`,
      },
    });
    console.log('Done', request);
    return request;
  };

  useEffect(() => {
    // setSampleBox(
    //   <div className="SampleBox">
    //     <h2 className="SampleHeader">Button Login</h2>
    //     <p>
    //       This example will launch a popup dialog to allow for authentication
    //       with Azure Active Directory
    //     </p>
    //     <SampleAppButtonLaunch />
    //   </div>
    // );
  }, [SampleStype]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to the react-aad-msal sample</h1>
      </header>

      <AzureAD provider={authProvider} reduxStore={basicReduxStore}>
        {({ accountInfo, authenticationState, error, login }) => {
          return (
            <React.Fragment>
              {authenticationState === AuthenticationState.Unauthenticated && (
                <div>
                  <button className="Button" onClick={() => login()}>
                    Login
                  </button>{' '}
                </div>
              )}

              {authenticationState === AuthenticationState.InProgress && (
                <div>Logging in</div>
              )}

              {authenticationState === AuthenticationState.InProgress && (
                <div>Logging in</div>
              )}
              {authenticationState === AuthenticationState.Authenticated && (
                <div>
                  <button className="Button" onClick={() => handleACToken()}>
                    AC
                  </button>{' '}
                </div>
              )}

              <div className="SampleContainer">
                <div className="SampleBox">
                  <h2 className="SampleHeader">Authenticated Values</h2>
                  <p>
                    When logged in, this box will show your tokens and user info
                  </p>
                  {accountInfo && (
                    <div style={{ wordWrap: 'break-word' }}>
                      <p>
                        <span style={{ fontWeight: 'bold' }}>ID Token:</span>{' '}
                        {accountInfo.jwtIdToken}
                      </p>
                      <p>
                        <span style={{ fontWeight: 'bold' }}>Username:</span>{' '}
                        {accountInfo.account.userName}
                      </p>
                      <p>
                        <span style={{ fontWeight: 'bold' }}>
                          Access Token:
                        </span>{' '}
                        {accountInfo.jwtAccessToken}
                      </p>
                      <p>
                        <span style={{ fontWeight: 'bold' }}>Name:</span>{' '}
                        {accountInfo.account.name}
                      </p>
                    </div>
                  )}
                </div>
                <div className="SampleBox">
                  <h2 className="SampleHeader">Errors</h2>
                  <p>
                    If authentication fails, this box will have the errors that
                    occurred
                  </p>
                  {error && (
                    <div style={{ wordWrap: 'break-word' }}>
                      <p>
                        <span style={{ fontWeight: 'bold' }}>errorCode:</span>{' '}
                        {error.errorCode}
                      </p>
                      <p>
                        <span style={{ fontWeight: 'bold' }}>
                          errorMessage:
                        </span>{' '}
                        {error.errorMessage}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </AzureAD>
    </div>
  );
};

export default Insiderapp;
