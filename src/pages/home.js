import { Card, Table } from "antd";
import { useEffect, useState } from "react";
import * as flatted from 'flatted';
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate()
    const [excelData, setExcelData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchExcelData()
    }, [])

    const saveData = async (excelData) => {
        const updatedData = excelData.map(item => ({
            ...item,
            siren: item.siren.toString()  // Convert siren to string
        }));

        try {
            const response = await fetch('http://localhost:3000/excel/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData), // Send data as JSON
            });

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            const result = await response.json();
            if (result) {
                navigate('saved')
            }
            console.log(result); // You can log the response from the backend
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    // Function to fetch Excel data from the NestJS backend
    const fetchExcelData = async () => {
        setLoading(true);
        setError(null); // Reset error state

        try {
            const response = await fetch('http://localhost:3000/excel'); // URL of your NestJS backend

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            const [, ...shifted] = data;
            console.log('{ data }', shifted)
            setExcelData(shifted);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const tableColumns = [
        {
            title: "Société",
            dataIndex: "company",
            key: "company",
            // render: (text) => <a>{text}</a>,
        },
        {
            title: "email",
            dataIndex: "email",
            key: "email",
            // render: (text) => <a>{text}</a>,
        },
        {
            title: "Prénom",
            dataIndex: "firstName",
            key: "firstName",
            // render: (text) => <a>{text}</a>,
        },
        {
            title: "Nom",
            dataIndex: "lastName",
            key: "lastName",
            // render: (text) => <a>{text}</a>,
        },
        {
            title: "Rib",
            dataIndex: "rib",
            key: "rib",
            // render: (text) => <a>{text}</a>,
        },
        {
            title: "Siren",
            dataIndex: "siren",
            key: "siren",
            // render: (SIREN) => SIREN
        }
    ];

    return (
        <Card
            title="Clients extrait de Excel"
            style={{ margin: 50 }}
            extra={
                <div>
                    <a onClick={() => saveData(excelData)}>Sauvegarder cette liste</a>
                    <br />
                    <a onClick={() => navigate("saved")}>Afficher la BD</a>
                </div>
            }>
            <Table
                // cursor='pointer'
                dataSource={excelData}
                columns={tableColumns}
                rowKey="siren"
            // onRow={(orderItem) => ({
            //     onClick: () => navigate(`order/${orderItem.id}`),
            // })}
            />
        </Card>
    )
}