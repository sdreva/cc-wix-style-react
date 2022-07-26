import React, { FC } from 'react';
import { useAppLoaded, useRequest } from '@wix/yoshi-flow-bm';
import { Page, Layout, Cell, Card } from 'wix-style-react';
import { fetch } from '../api/comments.api';

const Index: FC = () => {
  useAppLoaded({ auto: true });

  const { loading, error, data: comments } = useRequest(fetch());

  const buildComments = () => {
    if (loading) {
      return <div>Loading</div>;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return comments?.map((comment) => <div>{comment.text}</div>);
  };

  return (
    <Page>
      <Page.Header dataHook="app-title" title="Ambassador workshop" />
      <Page.Content>
        <Layout>
          <Cell>
            <Card>
              <Card.Header title="Comments" />
              <Card.Content>{buildComments()}</Card.Content>
            </Card>
          </Cell>
        </Layout>
      </Page.Content>
    </Page>
  );
};

export default Index;
