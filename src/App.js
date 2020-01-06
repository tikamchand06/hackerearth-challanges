import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Segment, Image, Tab, Card, Header, Button, Icon, Form, Radio } from 'semantic-ui-react';
import logo from './logo.png';
import dummyData from './dummyData.json';

const App = () => {
  const DATA_URL = 'https://www.hackerearth.com/chrome-extension/events/';
  const MONTHLY_CHALLANGES = 'Monthly Challenges';
  const HIRING_CHALLANGES = 'Hiring Challenges';
  const COLLEGE_CHALLANGES = 'College Challenges';
  const [challanges, setChallanges] = useState(null);
  const [showChallanges, setShowChallanges] = useState('all');

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const getData = async () => {
        const result = await axios.get(DATA_URL);
        setChallanges(result.data.response);
      };
      getData();
    } else setChallanges(dummyData);
  }, []);

  const filterChallanges = challangeType =>
    challanges &&
    challanges.filter(challange => {
      if (showChallanges === 'all') return challange.challenge_type === challangeType;
      return challange.challenge_type === challangeType && challange.status === showChallanges;
    });

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
                  <Icon name="calendar alternate" />
                  Ends on: {challange.date}
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
      <Segment className="mb-2px flex-item">
        <Image src={logo} size="small" />
        <Form>
          <Form.Field inline>
            <Radio
              label="All"
              name="radioGroup"
              value="all"
              checked={showChallanges === 'all'}
              onChange={() => setShowChallanges('all')}
              className="mr-1"
            />
            <Radio
              label="Ongoing"
              name="radioGroup"
              value="ONGOING"
              checked={showChallanges === 'ONGOING'}
              onChange={() => setShowChallanges('ONGOING')}
              className="mr-1"
            />
            <Radio
              label="Upcoming"
              name="radioGroup"
              value="UPCOMING"
              checked={showChallanges === 'UPCOMING'}
              onChange={() => setShowChallanges('UPCOMING')}
              className="mr-1"
            />

            <Icon name="shutdown" onClick={() => window.close()} link />
          </Form.Field>
        </Form>
      </Segment>
      <Segment loading={!challanges} className="body" content={<Tab menu={{ secondary: true, pointing: true }} panes={panes} />} />
      <Segment className="mt-2px footer flex-item">
        <span>
          <Icon name="copyright outline" />{' '}
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
