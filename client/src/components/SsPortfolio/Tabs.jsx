import React, { useState } from "react";

export function Tabs({ children }) {
  function findActiveTab(a) {
    return a.reduce((accumulator, currentValue, i) => {
      if (currentValue.props.active) {
        return i;
      }

      return accumulator;
    }, 0);
  }

  function tabValidator(tab) {
    return tab.type.displayName === "Tab" ? true : false;
  }

  const [activeTab, setActiveTab] = useState(findActiveTab(children));
  return (
    <>
      <div className="flex gap-5 justify-start bg-primary px-5 overflow-x-scroll w-full scrollbar">
        {children.map((item, i) => {
          return (
            <div key={`tap-${i}`}>
              {tabValidator(item) && (
                <Tab
                  // key={`tap-${i}`}
                  currentTab={i}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                >
                  {item.props.label}
                </Tab>
              )}
            </div>
          );
        })}
      </div>
      {children.map((item, i) => {
        return (
          <div
            key={`content-${i}`}
            className={`${i === activeTab ? "visible" : "hidden"}`}
          >
            {item.props.children}
          </div>
        );
      })}
    </>
  );
}

export function Tab({ children, activeTab, currentTab, setActiveTab }) {
  return (
    <>
      <div
        className={`px-5 py-3 rounded cursor-pointer w-40 text-center
      ${
        activeTab === currentTab
          ? "bg-primary text-tertiary border-b-2 border-tertiary"
          : "bg-primary text-white"
      }`}
        onClick={() => setActiveTab(currentTab)}
      >
        {children}
      </div>
    </>
  );
}

Tab.displayName = "Tab";
