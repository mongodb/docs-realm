import { useHistory } from "react-router-dom";
import React, { useState, useEffect, Fragment, memo } from "react";
import { useAllPluginInstancesData } from "@docusaurus/useGlobalData";
import Select, { StylesConfig } from "react-select";

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

const colorStyles: StylesConfig = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? "#f8aaca" : undefined,
      color: isSelected ? "white" : "#f15192",
    };
  },
};

const getContext = (id) => CONTEXTS.find((context) => context.id === id);

export const getCurrentSiteInstance = (history) => {
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
  function changeHandler({ value: sdkName }) {
    const sdkMetadata = sdkSitesMetaData[sdkName];
    const sdkBasePage = sdkMetadata.path + "intro"; //TODO: refactor into smthn better
    history.push(sdkBasePage);
  }
  delete sdkSitesMetaData.default;
  const options = Object.keys(sdkSitesMetaData).map((sdkId) => ({
    value: sdkId,
    label: getContext(sdkId).name,
  }));
  return (
    <div style={{ padding: 5 }}>
      <Select
        options={options}
        onChange={changeHandler}
        styles={colorStyles}
        defaultValue={options.find((option) => option.value === activeSDK)}
      />
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
  function changeHandler({ value: sdkVersion }) {
    const sdkMetadata = sdkSitesMetaData[activeSdk];
    const sdkVersionBasePage =
      sdkVersion === "current"
        ? sdkMetadata.path + "intro"
        : sdkMetadata.path + sdkVersion + "/intro"; //TODO: refactor into smthn better
    history.push(sdkVersionBasePage);
  }
  const options = activeSdkVersions.map((version) => ({
    value: version.name,
    label: version.label,
  }));
  return (
    <div style={{ padding: 5 }}>
      <Select
        options={options}
        onChange={changeHandler}
        styles={colorStyles}
        defaultValue={options.find(
          (option) => option.value === currentSdkVersion
        )}
      />
    </div>
  );
}

const ContextSwitcher = ({ className }) => {
  const [context, setContext] = useState(CONTEXTS[0]);
  const [versions, setVersions] = useState(null);
  const data = useAllPluginInstancesData("docusaurus-plugin-content-docs");
  const history = useHistory();
  // TODO: refactor to make worth with this hook
  // const activeDoc = useActiveDocContext(
  //   getCurrentSiteInstance(history).sdkInstance
  // );
  // console.log({ activeDoc });

  useEffect(() => {
    const { sdkPage } = getCurrentSiteInstance(history);

    const currContext = getContext(sdkPage);
    if (currContext && currContext.id !== context.id) {
      setContext(currContext);
    }
    const { sdkInstance: sdkName } = getCurrentSiteInstance(history);
    setVersions(data[sdkName]?.versions);
  }, []);

  const currentPath = history.location.pathname;
  if (currentPath.includes("/sdk/")) {
    const { sdkInstance: sdkName } = getCurrentSiteInstance(history);
    const wrapperStyles = { paddingTop: 45, height: 135 };
    if (!versions) {
      return <div style={wrapperStyles}></div>;
    }
    return (
      <div style={wrapperStyles}>
        <div style={{ position: "relative", zIndex: 100, top: 40 }}>
          <SDKSelector sdkSitesMetaData={data} activeSDK={sdkName} />
          <ActiveSDKVersionSelector
            activeSdk={sdkName}
            activeSdkVersions={versions}
            sdkSitesMetaData={data}
            currentSdkVersion={getCurrentSiteInstance(history).sdkVersion}
          />
        </div>
      </div>
    );
  } else return null;
};

export default ContextSwitcher;
