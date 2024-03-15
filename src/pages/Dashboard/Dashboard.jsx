/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./style.css";
import SearchBar from "../../components/Search Bar/SearchBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  Card,
  DonutChart,
  Title,
  Metric,
  Text,
  Flex,
  BadgeDelta,
  Grid,
  BarChart,
} from "@tremor/react";

function Dashboard() {
  const [value, setValue] = useState(null);
  const chartdata3 = [
    {
      date: "Jan 23",
      2022: 45,
      2023: 78,
    },
    {
      date: "Feb 23",
      2022: 52,
      2023: 71,
    },
    {
      date: "Mar 23",
      2022: 48,
      2023: 80,
    },
    {
      date: "Apr 23",
      2022: 61,
      2023: 65,
    },
    {
      date: "May 23",
      2022: 55,
      2023: 58,
    },
    {
      date: "Jun 23",
      2022: 67,
      2023: 62,
    },
    {
      date: "Jul 23",
      2022: 60,
      2023: 54,
    },
    {
      date: "Aug 23",
      2022: 72,
      2023: 49,
    },
    {
      date: "Sep 23",
      2022: 65,
      2023: 52,
    },
    {
      date: "Oct 23",
      2022: 68,
      2023: null,
    },
    {
      date: "Nov 23",
      2022: 74,
      2023: null,
    },
    {
      date: "Dec 23",
      2022: 71,
      2023: null,
    },
  ];
  const cities = [
    {
      name: "New York",
      sales: 9800,
    },
    {
      name: "London",
      sales: 4567,
    },
    {
      name: "Hong Kong",
      sales: 3908,
    },
    {
      name: "San Francisco",
      sales: 2400,
    },
    {
      name: "Singapore",
      sales: 1908,
    },
    {
      name: "Zurich",
      sales: 1398,
    },
  ];
  const colors = {
    increase: "emerald",
    moderateIncrease: "emerald",
    unchanged: "orange",
    moderateDecrease: "rose",
    decrease: "rose",
  };

  const categories = [
    {
      title: "Sales",
      metric: "$ 12,699",
      metricPrev: "$ 9,456",
      delta: "34.3%",
      deltaType: "moderateIncrease",
    },
    {
      title: "Profit",
      metric: "$ 40,598",
      metricPrev: "$ 45,564",
      delta: "10.9%",
      deltaType: "moderateDecrease",
    },
    {
      title: "Customers",
      metric: "1,072",
      metricPrev: "856",
      delta: "25.3%",
      deltaType: "moderateIncrease",
    },
  ];
  return (
    <div className="inner-container">
      <SearchBar />
      <div className="badgetext">
        {/* <Grid numItemsSm={2} numItemsLg={4} className="gap-4"> */}
        <div className="grid lg:grid-cols-4  sm:grid-cols-1 gap-6">
          {categories.map((item) => (
            <Card key={item.title} className="m-4 mt-10 w-70">
              <Text>{item.title}</Text>
              <Flex
                justifyContent="start"
                alignItems="baseline"
                className="truncate space-x-3"
              >
                <Metric>{item.metric}</Metric>

                <Text className="truncate">from {item.metricPrev}</Text>
              </Flex>
              <Flex justifyContent="start" className="space-x-2 mt-4">
                <BadgeDelta deltaType={item.deltaType} />
                <Flex justifyContent="start" className="space-x-1 truncate">
                  <Text color={colors[item.deltaType]}>{item.delta}</Text>
                  <Text className="truncate">to previous month</Text>
                </Flex>
              </Flex>
            </Card>
          ))}
          <div className="out-cont   row-span-2 h-80 p-4 mt-10 mr-4  tremor-Card-root relative text-left ring-1 rounded-tremor-default p-6 bg-tremor-background ring-tremor-ring shadow-tremor-card dark:bg-dark-tremor-background dark:ring-dark-tremor-ring dark:shadow-dark-tremor-card border-tremor-brand dark:border-dark-tremor-brand        ">
            <Title className="text-black">Sales</Title>
            <div className="charts flex  flex-col items-center justify-center">
              <DonutChart
                className="mt-4"
                data={cities}
                category="sales"
                index="name"
                colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
              />
            </div>
          </div>

          <Card className=" bar-cont col-span-3">
            <Title>Closed Pull Requests</Title>
            <BarChart
              className="mt-6"
              data={chartdata3}
              index="date"
              categories={["2022", "2023"]}
              colors={["neutral", "indigo"]}
              yAxisWidth={20}
              onValueChange={(v) => setValue(v)}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
