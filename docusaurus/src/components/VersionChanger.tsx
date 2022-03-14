import { useHistory } from "react-router-dom";
import React, { useState, useEffect, Fragment, memo } from "react";
import { useAllPluginInstancesData } from "@docusaurus/useGlobalData";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { versions } from "process";

const CONTEXTS = [
  {
    id: "java",
    name: "Java",
  },
  {
    id: "kotlin",
    name: "Kotlin",
  },
  {
    id: "flutter",
    name: "Flutter",
  },
];

const getContext = (id) => CONTEXTS.find((context) => context.id === id);

export const getCurrentSiteInstance = (history) => {
  // const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const splitPath = pathname.split("/").slice(1);
  if (!splitPath.includes("sdk")) {
    return {
      sdkInstance: "default",
      sdkPage: null,
    };
  } else {
    const sdkWordIdx = splitPath.findIndex((value) => value === "sdk");
    const sdkInstance = splitPath[sdkWordIdx + 1];
    const sdkPage = splitPath.slice(sdkWordIdx + 2).join("/");
    console.log(sdkPage);
    const sdkVersion = isNaN(splitPath[sdkWordIdx + 2][0])
      ? "current"
      : splitPath[sdkWordIdx + 2];
    return {
      sdkInstance,
      sdkPage,
      sdkVersion,
    };
  }
};

const pathExists = (path, data) => {
  return data.docs.some((doc) => doc.path === path);
};

function SDKSelector({ sdkSitesMetaData, activeSDK }) {
  const history = useHistory();
  function changeHandler(e) {
    const sdkName = e.target.value;
    const sdkMetadata = sdkSitesMetaData[sdkName];
    const sdkBasePage = sdkMetadata.path + "intro"; //TODO: refactor into smthn better
    history.push(sdkBasePage);
  }
  delete sdkSitesMetaData.default;
  return (
    <div>
      <select onChange={changeHandler}>
        {Object.keys(sdkSitesMetaData).map((sdkId) => (
          <option key={sdkId} value={sdkId} selected={sdkId === activeSDK}>
            {getContext(sdkId).name}
          </option>
        ))}
      </select>
    </div>
  );
}

function ActiveSDKVersionSelector({
  activeSdk,
  activeSdkVersions,
  currentSdkVersion,
  sdkSitesMetaData,
}) {
  const history = useHistory();
  function changeHandler2(e) {
    const sdkVersion = e.target.value;
    console.log({ sdkVersion });
    const sdkMetadata = sdkSitesMetaData[activeSdk];
    console.log({ sdkMetadata });
    const sdkVersionBasePage = sdkMetadata.path + `${sdkVersion}/` + "intro"; //TODO: refactor into smthn better
    console.log({ sdkVersionBasePage });
    history.push(sdkVersionBasePage);
  }
  return (
    <div>
      <select onChange={changeHandler2}>
        {activeSdkVersions.map((versionsInfo, i) => {
          return (
            <option
              key={versionsInfo.name}
              value={versionsInfo.name}
              selected={currentSdkVersion === versionsInfo.name}
            >
              {versionsInfo.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

const ContextSwitcher = ({ className }) => {
  const [context, setContext] = useState(CONTEXTS[0]);
  const data = useAllPluginInstancesData("docusaurus-plugin-content-docs");
  const history = useHistory();

  console.log(data);
  console.log(history.location);

  useEffect(() => {
    const { sdkPage } = getCurrentSiteInstance(history);

    const currContext = getContext(sdkPage);
    if (currContext && currContext.id !== context.id) {
      setContext(currContext);
    }
  }, []);

  const handleChange = (newValue) => {
    setContext(newValue);

    const { sdkInstance, sdkPage } = getCurrentSiteInstance(history);

    const newDoc = newValue.id;

    // let path = `/${newDoc}/${docPath.join("/")}`;
    // // @ts-ignore
    // const lastVersion = data[newDoc].versions.find(
    //   (version) => version.isLast === true
    // );

    // if (pathExists(path, lastVersion)) {
    //   // navigate to same document in the last version
    //   // append hash to path for navigating to anchor tags, if they exist
    //   if (window.location.hash) path += window.location.hash;
    //   history.push(path);
    // } else {
    //   // navigate to the main doc of the last version.
    //   const { mainDocId } = lastVersion;
    //   history.push(`/${newDoc}/${mainDocId}`);
    // }
  };
  const currentPath = history.location.pathname;
  if (currentPath.includes("/sdk/")) {
    const { sdkInstance: sdkName } = getCurrentSiteInstance(history);
    // @ts-ignore
    const versions = data[sdkName].versions;
    console.log(versions);
    return (
      <div style={{ paddingTop: 60 }}>
        <SDKSelector sdkSitesMetaData={data} activeSDK={sdkName} />
        <ActiveSDKVersionSelector
          activeSdk={sdkName}
          activeSdkVersions={versions}
          sdkSitesMetaData={data}
          currentSdkVersion={getCurrentSiteInstance(history).sdkVersion}
        />
      </div>
    );
  } else return <></>;
};

export default ContextSwitcher;
