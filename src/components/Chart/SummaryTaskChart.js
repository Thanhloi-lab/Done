import react, {useState,useEffect} from 'react';
import {Chart} from 'react-google-charts';
import {allTaskOfUser} from '../../apis/TaskApi';

const SummaryTaskChart = () => {

    const [data,setData] = useState([]);
    const [options, setOptions] = useState(null);
    useEffect (() => {
            var user = JSON.parse(localStorage.getItem('user'));
            allTaskOfUser(user.idUser, user.token).then((rawData) => 
            {
                const map = new Map();
                rawData.forEach(element => {
                    if(map.has(element.statusName))
                        map.set(element.statusName, map.get(element.statusName) + 1);
                    else
                        map.set(element.statusName,1);
                });
                console.log(map);
                var array = Array.from(map,([name, value])=> ([name,value]));
                setData([["Task", "Hours per Day"]].concat(array));
                
            });
        	
            setOptions({ title: "My Daily Activities"});
    },[]);
    return (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      )
}

export default SummaryTaskChart;