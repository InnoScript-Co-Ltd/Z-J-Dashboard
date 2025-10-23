
import { Card } from "primereact/card"
import { HeaderBar } from "../../../components/HeaderBar"
import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"
import { Dropdown } from "primereact/dropdown"
import { ScrollPanel } from 'primereact/scrollpanel';
import { Message } from 'primereact/message';
import { useState } from "react"

export const Dashboard = () => {

    const [selectedSalePerformance, setSalePerformance] = useState(null);

    const navigate = useNavigate();

     const  salesPerformance = [
        { name: 'Today', code: 'Today' },
        { name: '7 Days', code: '7 Days' },
        { name: 'Month', code: 'month' },
    ];

    const recentInvoiceFooter = (
        <>
            <Button 
                className="w-full"
                size="small"
                label="View All Invoices" 
            />
        </>
    );

    const messageContent = (
        <div className="flex align-items-center">
            <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" width="32" />
            <div className="ml-2">Always bet on Prime.</div>
        </div>
    );


    return (
        <>
            <HeaderBar />

            <div className="w-full p-3">
                <Button
                    size="small"
                    icon="pi pi-arrow-left" 
                    outlined
                    onClick={() => navigate(-1)}
                />
            </div>

            <div className="grid grid-nogutter">
                <div className="col-8 p-3">
                    <Card 
                        title="Sales Overview"
                        subTitle="Today's sales performance"
                    >
                        <div className="flex align-items-end justify-content-end">
                            <Dropdown 
                                className="w-full md:w-14rem" 
                                placeholder="Sales Performance" 
                                optionLabel="name"
                                value={selectedSalePerformance} 
                                options={salesPerformance} 
                                onChange={(e) => setSalePerformance(e.value)}
                            />

                        </div>

                        <div className="grid mt-3">
                            <div className="col-6">
                                <Card className="p-3 text-center bg-blue-900 border-blue-500">
                                    <i className="pi pi-shopping-cart text-4xl mb-2"></i>
                                    <h1 className="text-4xl font-bold"> $ 15,300 </h1>
                                    <p className="m-0"> Total Sales </p>
                                </Card>
                            </div>

                            <div className="col-6">
                                <Card className="p-3 text-center bg-blue-900 border-blue-500">
                                    <i className="pi pi-shopping-cart text-4xl mb-2"></i>
                                    <h1 className="text-4xl font-bold"> $ 15,300 </h1>
                                    <p className="m-0"> Total Sales </p>
                                </Card>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="col-4 p-3">
                    <Card 
                        title="Recent Invoices"
                        subTitle="Latest 10 invoices"
                        footer={recentInvoiceFooter}
                    >
                        <div className="grid mt-1">
                            <ScrollPanel style={{width: '100%', height: '400px'}}>
                            <div className="col-12 mb-1">
                                <Message
                                    style={{
                                        border: 'solid #696cff',
                                        borderWidth: '0 0 0 6px',
                                        color: '#696cff'
                                    }}
                                    className="border-primary w-full justify-content-start"
                                    severity="info"
                                    content={messageContent}
                                />
                            </div>

                            <div className="col-12 mb-1">
                                <Message
                                    style={{
                                        border: 'solid #696cff',
                                        borderWidth: '0 0 0 6px',
                                        color: '#696cff'
                                    }}
                                    className="border-primary w-full justify-content-start"
                                    severity="info"
                                    content={messageContent}
                                />
                            </div>

                            <div className="col-12 mb-1">
                                <Message
                                    style={{
                                        border: 'solid #696cff',
                                        borderWidth: '0 0 0 6px',
                                        color: '#696cff'
                                    }}
                                    className="border-primary w-full justify-content-start"
                                    severity="info"
                                    content={messageContent}
                                />
                            </div>
                            </ScrollPanel>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}