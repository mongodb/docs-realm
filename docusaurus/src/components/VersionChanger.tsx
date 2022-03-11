import { useHistory } from "react-router-dom";
import React, { useState, useEffect, Fragment, memo } from "react";
import { useAllPluginInstancesData } from "@docusaurus/useGlobalData";

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

export const getCurrentPageInfo = () => {
  return window.location.pathname;
};

const pathExists = (path, data) => {
  return data.docs.some((doc) => doc.path === path);
};

function SDKSelector({ sdkSitesMetaData, activeSDK }) {
  delete sdkSitesMetaData.default;
  return (
    <select>
      {Object.keys(sdkSitesMetaData).map((sdkId) => (
        <option key={sdkId} value={sdkId}>
          {getContext(sdkId).name}
        </option>
      ))}
    </select>
  );
}

const ContextSwitcher = ({ className }) => {
  const [context, setContext] = useState(CONTEXTS[0]);
  const data = useAllPluginInstancesData("docusaurus-plugin-content-docs");
  const history = useHistory();

  console.log(data);
  console.log(history.location);

  useEffect(() => {
    const [doc] = getCurrentPageInfo();

    const currContext = getContext(doc);
    if (currContext && currContext.id !== context.id) {
      setContext(currContext);
    }
  }, []);

  const handleChange = (newValue) => {
    setContext(newValue);

    const [, ...docPath] = getCurrentPageInfo();

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
    const sdkName = currentPath.split("/").find((segment) => {
      CONTEXTS.map(({ id }) => id).includes(segment);
    });
    return (
      <>
        <SDKSelector sdkSitesMetaData={data} activeSDK={sdkName} />
      </>
    );
  } else return <></>;
};

export default ContextSwitcher;
