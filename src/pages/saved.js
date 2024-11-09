import { Card, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SavedPage = () => {
    const navigate = useNavigate()
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getAllDatas()
    }, []);

    const getAllDatas = async () => {
        try {
            const response = await fetch('http://localhost:3000/excel/customers')
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setCustomers(data.customer);
            console.log('the data::::', data)
        } catch (err) {
            console.log('Error fetching data:', err);
        }
    }

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
        },
        {
            title: "Mandat",
            key: "siren",
            render: (_, item) => (
                <a onClick={() => navigate(`/mandat/${item.id}`, {
                    state: {
                        item
                    }
                })} >Mandat</a>
            )
        }
    ];

    return (
        <Card title="Clients de la BD" style={{ margin: 50 }} extra={<a onClick={() => navigate("/")}>Retour</a>}>
            <Table
                // cursor='pointer'
                dataSource={customers}
                columns={tableColumns}
                rowKey="siren"
            //  onRow={(orderItem) => ({
            //      onClick: () => navigate(`order/${orderItem.id}`),
            //  })}
            />
        </Card>
    )
}