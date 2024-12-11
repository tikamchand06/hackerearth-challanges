import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.png";
import dummyData from "./dummyData.json";
import { Layout, Radio, Tooltip, Button, Tabs, Image, Spin, Result, Card } from "antd";
import Icon, { CopyrightCircleOutlined, CloseOutlined, CalendarOutlined, SendOutlined } from "@ant-design/icons";

const App = () => {
  const { Meta } = Card;
  const { TabPane } = Tabs;
  const { Header, Footer, Content } = Layout;
  const [challanges, setChallanges] = useState(null);
  const [showChallanges, setShowChallanges] = useState("all");

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const getChallangesData = async () => {
        const result = await axios.get("https://www.hackerearth.com/chrome-extension/events/");
        setChallanges(result.data.response);
      };
      getChallangesData();
    } else setTimeout(() => setChallanges(dummyData), 2000);
  }, [setChallanges]);

  const HeartSvg = () => (
    <svg width='1em' height='1em' fill='currentColor' viewBox='0 0 1024 1024'>
      <path d='M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z' />
    </svg>
  );

  const radioOptions = [
    { label: "All", value: "all" },
    { label: "Ongoing", value: "ONGOING" },
    { label: "Upcoming", value: "UPCOMING" },
  ];

  const panOptions = [
    { key: "mc", label: "Monthly Challenges" },
    { key: "hc", label: "Hiring Challenges" },
    { key: "cc", label: "College Challenges" },
  ];

  const filterChallanges = (challangeType) => {
    if (!challanges) return null;

    return challanges.filter((challange) => {
      if (showChallanges === "all") return challange.challenge_type === challangeType;
      return challange.challenge_type === challangeType && challange.status === showChallanges;
    });
  };

  const getChallanges = (challangeType) => {
    const filteredChallanges = filterChallanges(challangeType);
    if (!filteredChallanges || filteredChallanges.length === 0)
      return (
        <Result
          status='403'
          className='p-2 pt-1 pb-1'
          title='No Challanges'
          subTitle='No challanges available at the moment. Please try re-checking after some time.'
        />
      );

    return (
      <div className='cards-container'>
        {filteredChallanges.map((challange, key) => (
          <Card
            key={`card_${key}`}
            cover={<Image src={challange.cover_image} preview={false} />}
            actions={[
              <span>
                <CalendarOutlined /> Ends on: {challange.end_date}
              </span>,
              <span>Status: {challange.status}</span>,
              <Button
                href={challange.subscribe}
                target='_blank'
                icon={<SendOutlined />}
                type='primary'
                shape='round'
                className='text-white'
              >
                Subscribe
              </Button>,
            ]}
          >
            <Meta
              description={challange?.description}
              title={
                <Button type='link' href={challange.url} target='_blank' className='p-0'>
                  {challange?.title}
                </Button>
              }
            />
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Layout className='bg-white'>
      <Header className='flex-item'>
        <Image src={logo} preview={false} width={182} />
        <div className='flex-item'>
          <Radio.Group
            optionType='button'
            buttonStyle='solid'
            disabled={!challanges}
            value={showChallanges}
            options={radioOptions}
            onChange={(e) => setShowChallanges(e.target.value)}
          />
          <Tooltip title='Close'>
            <Button variant='filled' color='default' icon={<CloseOutlined />} onClick={() => window.close()} className='ml-1' />
          </Tooltip>
        </div>
      </Header>
      <Content className='p-2 pt-1 bg-white'>
        <Spin tip='Loading...' spinning={!challanges}>
          <Tabs defaultActiveKey='mc'>
            {panOptions.map((p) => (
              <TabPane tab={p.label} key={p.key}>
                {getChallanges(p.label)}
              </TabPane>
            ))}
          </Tabs>
        </Spin>
      </Content>
      <Footer className='flex-item'>
        <span className='flex-item'>
          <CopyrightCircleOutlined />{" "}
          <a href='http://www.tcmhack.in' className='text-white ml-1 mr-1' target='_blank' rel='noopener noreferrer'>
            http://www.tcmhack.in
          </a>{" "}
          {new Date().getFullYear()}
        </span>
        <span className='flex-item'>
          Made with <Icon component={HeartSvg} style={{ color: "#eb2f96" }} className='ml-1 mr-1' /> at Jaipur, Rajasthan (India){" "}
        </span>
      </Footer>
    </Layout>
  );
};

export default App;
