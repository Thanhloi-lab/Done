import react, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { allTaskOfUser } from "../../apis/TaskApi";
import  '../Home/Cards.css'

const SummaryTaskChart = () => {
  const [data, setData] = useState([]);
  const [dataGroup, setDataGroup] = useState([]);
  const [options, setOptions] = useState(null);
  const [optionGroups, setOptionGroups] = useState(null);

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user"));
    allTaskOfUser(user.idUser, user.token).then((rawData) => {
      console.log(rawData);
      const map = new Map();
      const mapGroup = new Map();

      rawData.forEach((element) => {
        if (map.has(element.statusName))
          map.set(element.statusName, map.get(element.statusName) + 1);
        else map.set(element.statusName, 1);

        const group = JSON.stringify({
          nameGroup: element.nameGroup,
          idGroup: element.idGroup,
        });
        if (mapGroup.has(group)) mapGroup.set(group, mapGroup.get(group) + 1);
        else mapGroup.set(group, 1);
      });

      var arrayGroup = Array.from(mapGroup, ([name, value]) => [
        JSON.parse(name).nameGroup,
        value,
      ]);

      var array = Array.from(map, ([name, value]) => [name, value]);
      setData([["Task", "Status"]].concat(array));
      setDataGroup([["Group", "Task"]].concat(arrayGroup));
    });

    setOptions({ title: "Tổng quan trạng thái" });
    setOptionGroups({ title: "Tổng quan trạng Task" });

    
  }, []);
  return (
    <ul className='cards__items'>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"600px"}
      />
      <Chart
        chartType="PieChart"
        data={dataGroup}
        options={optionGroups}
        width={"100%"}
        height={"600px"}
      />
    </ul>
  );
};

export default SummaryTaskChart;
