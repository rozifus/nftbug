
import React from "react";

export const withBasicProvider = Provider => WrappedComponent => props => (
  <Provider>
    <WrappedComponent {...props} />
  </Provider>
);

export const withBasicProviders = (...providers) => WrappedComponent => props =>
  providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, <WrappedComponent {...props} />);

export const withProviders = (...providers) => WrappedComponent => props =>
  providers.reduceRight((acc, prov) => {
    let Provider = prov;
    if (Array.isArray(prov)) {
      Provider = prov[0];
      return <Provider {...prov[1]}>{acc}</Provider>;
    }

    return <Provider>{acc}</Provider>;
  }, <WrappedComponent {...props} />);