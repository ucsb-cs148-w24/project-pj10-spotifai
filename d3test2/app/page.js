"use client";

import { useState } from "react";

import Blobs from "./charts/bubbles";
import SunBurst from "./charts/sunburst";
import { sunburst_data } from "./data/sunburst";

import Intro from "./charts/intro";
import Explore from "./charts/exploration";
import Explore2 from "./charts/exploration2";
import { MyContextProvider } from "./data_context";
import Evolution from "./charts/evolution";
import WorldEvolution from "./charts/world";
import HelloWorldChart from "./charts/helloworld";
import { useRouter } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { name: "Introduction", id: "intro" },
  { name: "Evolution", id: "evolution" },
  { name: "Market Share", id: "sunburst" },
  { name: "World Evolution", id: "world_evolution" },
  { name: "Extra Fun", id: "hemanth" },
  { name: "Makes Over Timer (TBD)", id: "explore" },
  { name: "Mileage vs CO2 (TBD)", id: "explore2" },
  { name: "Hello World Chart", id: "hello"}
];

function Navigation({ selectedTab = "intro", setselectedTab }) {
  return (
    <div>
      <div>
        <nav
          className="isolate divide-gray-200 grid grid-cols-1 md:grid-cols-2"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <button
              onClick={() => setselectedTab(tab.id)}
              key={tab.id}
              className={classNames(
                tab.id == selectedTab
                  ? "text-gray-900 border-gray-400 bg-gray-50"
                  : "text-gray-500 hover:text-gray-700 border-gray-100",
                "m-2 border-2 rounded-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? "bg-indigo-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

function SelectedGraph({ selectedTab = "sunburst", router }) {
  // get router

  if (selectedTab == "sunburst") {
    return <SunBurst data={sunburst_data} />;
  }
  if (selectedTab == "yours") {
    return (
      <Blobs
        data={[
          { r: 5.148585196204891, group: 0 },
          { r: 12.165799682522458, group: 2 },
          { r: 17.28646310018443, group: 3 },
          { r: 13.106289115828547, group: 4 },
          { r: 10.424400994182266, group: 1 },
          { r: 10.93892343253752, group: 2 },
        ]}
      />
    );
  }
  if (selectedTab == "intro") {
    return <Intro />;
  }
  if (selectedTab == "explore") {
    return <Explore />;
  }
  if (selectedTab === "explore2") {
    return <Explore2 />;
  }
  if (selectedTab === "evolution") {
    return <Evolution />;
  }
  if (selectedTab === "world_evolution") {
    return <WorldEvolution />;
  }
  if (selectedTab === "hello") {
    return <HelloWorldChart/>;
  }
  if (selectedTab == "hemanth") {
    // redirect to another page with next router
    router.push("/hemanth_charts.html");
  }
}

export default function Home() {
  const router = useRouter();

  const [selectedTab, setselectedTab] = useState("intro");
  return (
    <MyContextProvider>
      <div className="w-full md:w-4/5 m-auto space-y-2 py-16 sm:py-24 min-h-screen">
        <div className="flex justify-center text-base font-semibold leading-6 text-gray-900">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Dashboard
          </h1>
        </div>

        <Navigation selectedTab={selectedTab} setselectedTab={setselectedTab} />

        <div className="w-full border-2 p-5 rounded-lg">
          <SelectedGraph selectedTab={selectedTab} router={router} />
        </div>
      </div>
    </MyContextProvider>
  );
}
