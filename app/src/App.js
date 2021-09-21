import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import { NftProvider } from "use-nft";
import { getDefaultProvider } from "ethers";
import drizzleOptions from "./drizzleOptions";
import MainPage from "./comps/MainPage";
import "./App.css";

const drizzle = new Drizzle(drizzleOptions);
const ethersConfig = {
  provider: getDefaultProvider("homestead")
}

const App = () => {
  return (
    <NftProvider fetcher={["ethers", ethersConfig]}>
      <DrizzleContext.Provider drizzle={drizzle}>
        <DrizzleContext.Consumer>
          {drizzleContext => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            if (!initialized) {
              return "Loading..."
            }

            return (
              <MainPage drizzle={drizzle} drizzleState={drizzleState} />
            )
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    </NftProvider>
  );
}

export default App;
