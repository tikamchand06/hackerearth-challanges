import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Segment, Image, Tab, Card, Header, Button, Icon } from 'semantic-ui-react';
import logo from './logo.png';
import dummyData from './dummyData.json';

const App = () => {
  const DATA_URL = 'https://www.hackerearth.com/chrome-extension/events/';
  const MONTHLY_CHALLANGES = 'Monthly Challenges';
  const HIRING_CHALLANGES = 'Hiring Challenges';
  const COLLEGE_CHALLANGES = 'College Challenges';
  const [challanges, setChallanges] = useState(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const getData = async () => {
        const result = await axios.get(DATA_URL);
        setChallanges(result.data.response);
      };
      getData();
    } else setChallanges(dummyData);
  }, []);

  const filterChallanges = challangeType => challanges && challanges.filter(challange => challange.challenge_type === challangeType);

  const getChallanges = challangeType => {
    const filteredChallanges = filterChallanges(challangeType);
    if (!filteredChallanges || filteredChallanges.length === 0)
      return (
        <Container fluid className="m-0" textAlign="center">
          <Header as="h2" icon textAlign="center">
            <Icon name="info circle" color="blue" />
            <Header.Content content="No challanges available!" />
          </Header>
          <Image centered size="large" src="https://react.semantic-ui.com/images/wireframe/centered-paragraph.png" />
        </Container>
      );

    return (
      <Card.Group>
        {filteredChallanges.map((challange, key) => (
          <Card
            key={`card_${key}`}
            image={challange.cover_image}
            header={<Header as="a" href={challange.url} target="_blank" content={challange.title} />}
            meta={challange.status}
            description={challange.description}
            extra={
              <div className="flex-item">
                <strong>
                  <Icon name="calendar alternate" /> {challange.date} {challange.time}
                </strong>
                <Button content="Subscribe" href={challange.subscribe} target="_blank" icon="external alternate" primary />
              </div>
            }
            fluid
          />
        ))}
      </Card.Group>
    );
  };

  const panes = [
    { menuItem: MONTHLY_CHALLANGES, render: () => getChallanges(MONTHLY_CHALLANGES) },
    { menuItem: HIRING_CHALLANGES, render: () => getChallanges(HIRING_CHALLANGES) },
    { menuItem: COLLEGE_CHALLANGES, render: () => getChallanges(COLLEGE_CHALLANGES) }
  ];

  return (
    <Container fluid className="m-0">
      <Segment className="mb-2px" content={<Image src={logo} size="small" />} />
      <Segment loading={!challanges} className="body" content={<Tab menu={{ secondary: true, pointing: true }} panes={panes} />} />
      <Segment className="mt-2px footer flex-item">
        <span>
          <a href="http://www.tcmhack.in" className="text-white" target="_blank" rel="noopener noreferrer">
            TCMHACK
          </a>{' '}
          {new Date().getFullYear()}{' '}
        </span>
        <span>
          Made with <Icon name="heart" color="pink" /> at Jaipur, Rajasthan (India){' '}
        </span>
      </Segment>
    </Container>
  );
};

export default App;
