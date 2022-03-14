// PROTOTYPE: this component was implemented for prototype purposes.
// it should not be added in it's current form to any production site.
// refer to conversation on https://github.com/mongodb/docs-realm/pull/1743
// for more information about changes to make to it.
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, Fragment, memo } from "react";
import { useAllPluginInstancesData } from "@docusaurus/useGlobalData";
import Select, { StylesConfig } from "react-select";

type Context = {
  id: string;
  name: string;
};

// TODO: try to refactor  Contexts to be generated dynamically with the hook
// useAllPluginInstancesData("docusaurus-plugin-content-docs")
const CONTEXTS: Context[] = [
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

// TODO: refactor styling to properly use the Docusaurus theme config
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

// TODO: refactor to make SDK location selection worth with this hook
// const activeDoc = useActiveDocContext(
//   getCurrentSiteInstance(history).sdkInstance
// );
// console.log({ activeDoc });
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
  }
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
};

const pathExists = (path, data) => {
  return data.docs.some((doc) => doc.path === path);
};

function SdkSelector({ sdkSitesMetaData, activeSDK }) {
  const history = useHistory();
  function changeHandler({ value: sdkName }) {
    const sdkMetadata = sdkSitesMetaData[sdkName];
    const sdkBasePage = sdkMetadata.path + "intro"; //TODO: refactor into smthn better
    history.push(sdkBasePage);
  }
  // not using `default` b.c this is the base site w intro, tutorials, etc.
  // but not SDK content
  const { default: _default, ...sdkSitesMetaDataCopy } = sdkSitesMetaData;
  const options = Object.keys(sdkSitesMetaDataCopy).map((sdkId) => ({
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

function ActiveSdkVersionSelector({
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

  useEffect(() => {
    const { sdkPage } = getCurrentSiteInstance(history);

    const currContext = getContext(sdkPage);
    if (currContext && currContext.id !== context.id) {
      setContext(currContext);
    }
    const { sdkInstance: sdkName } = getCurrentSiteInstance(history);
    setVersions(data[sdkName]?.versions);
  }, [history]);

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
          <SdkSelector sdkSitesMetaData={data} activeSDK={sdkName} />
          <ActiveSdkVersionSelector
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
