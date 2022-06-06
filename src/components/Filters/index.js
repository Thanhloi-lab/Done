import { Col, Row, Input, Typography, Radio, Select, Tag } from 'antd';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import filtersSlice from './FilterSlice'

const { Search } = Input;

export default function Filters() {
    const dispatch=useDispatch();

    const [input, setInput] = useState('');
    const [status, setStatus] = useState('All');
    const [priority, setPriority] = useState([]);

    
    const handleTextChange = (e)=>{
        setInput(e.target.value);
        dispatch(filtersSlice.actions.filtersTextChange(e.target.value));
    }

    const handleStatusChange = (e)=>{
        setStatus(e.target.value)
        dispatch(filtersSlice.actions.statusFiltersChange(e.target.value));
    }

    const handlePriorityChange = (value)=>{
        // console.log(e)
        setPriority(value);
        dispatch(filtersSlice.actions.priorityFiltersChange(value));
    }

    return (
        <Row justify='center'>
        <Col span={24}>
            <Typography.Paragraph
            style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
            >
            Search
            </Typography.Paragraph>
            <Search placeholder='input search text' onChange={handleTextChange} value={input}/>
        </Col>
        <Col sm={24}>
            <Typography.Paragraph
            style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
            >
            Filter By Status
            </Typography.Paragraph>
            <Radio.Group onChange={handleStatusChange} value={status}>
            <Radio value='All'>All</Radio>
            <Radio value='Completed'>Completed</Radio>
            <Radio value='Todo'>To do</Radio>
            </Radio.Group>
        </Col>
        <Col sm={24}>
            <Typography.Paragraph
            style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
            >
            Filter By Priority
            </Typography.Paragraph>
            <Select
            mode='multiple'
            allowClear
            placeholder='Please select'
            style={{ width: '100%' }}
            value={priority}
            onChange={handlePriorityChange}
            >
            <Select.Option value='High' label='High'>
                <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
                <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
                <Tag color='gray'>Low</Tag>
            </Select.Option>
            </Select>
        </Col>
        </Row>
    );
}
