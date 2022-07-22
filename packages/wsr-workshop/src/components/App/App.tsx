import React, { useState } from 'react';
import {
  Page,
  Breadcrumbs,
  Layout,
  Cell,
  Card,
  Button,
  Box,
  FormField,
  Input,
  Heading,
  Text,
  AddItem,
  Dropdown,
  IconButton,
} from 'wix-style-react';
import { DeleteSmall } from 'wix-ui-icons-common';
import { DropdownLayoutValueOption } from 'wix-style-react/dist/types/DropdownLayout';

interface Info {
  first_name: string;
  last_name: string;
  favorite_color: DropdownLayoutValueOption['value'];
}

const breadcrumbs = [
  {
    id: 1,
    value: 'Root Page',
  },
  {
    id: 2,
    value: 'WSR Form',
  },
];

const dropdown = [
  { id: 0, value: 'Red' },
  { id: 1, value: 'Blue' },
  { id: 2, value: 'Green' },
  { id: 4, value: 'Yellow' },
  { id: 5, value: 'Pink' },
];

const App = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [favoriteColorOption, setFavoriteColorOption] =
    useState<DropdownLayoutValueOption | null>(null);
  const [data, setData] = useState<Info | null>(null);

  const onClear = () => {
    setFirstName('');
    setLastName('');
    setFavoriteColorOption(null);
  };

  const onSubmit = () => {
    setData({
      first_name: firstName,
      last_name: lastName,
      favorite_color: favoriteColorOption?.value,
    });
  };

  const isClearButtonDisabled = !(
    firstName ||
    lastName ||
    favoriteColorOption?.value
  );

  const isSubmitButtonDisabled = !(firstName && lastName);

  return (
    <Page>
      <Page.Header
        title="WSR Form"
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        actionsBar={
          <Box gap="SP2">
            <Button
              dataHook="clear-button"
              priority="secondary"
              disabled={isClearButtonDisabled}
              onClick={onClear}
            >
              Clear
            </Button>
            <Button
              dataHook="submit-button"
              disabled={isSubmitButtonDisabled}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Box>
        }
      />
      <Page.Content>
        <Layout>
          <Cell span={8}>
            <Card>
              <Card.Header title="General Info" />
              <Card.Divider></Card.Divider>
              <Card.Content>
                <Layout>
                  <Cell>
                    <Layout>
                      <Cell span={6}>
                        <FormField required label="First name">
                          <Input
                            dataHook="first-name-input"
                            value={firstName}
                            onChange={(event) =>
                              setFirstName(event.target.value)
                            }
                          />
                        </FormField>
                      </Cell>
                      <Cell span={6}>
                        <FormField required label="Last name">
                          <Input
                            dataHook="last-name-input"
                            value={lastName}
                            onChange={(event) =>
                              setLastName(event.target.value)
                            }
                          />
                        </FormField>
                      </Cell>
                    </Layout>
                  </Cell>
                  <Cell>
                    <Layout>
                      <Cell>
                        <Heading size="tiny">ADDITIONAL INFO</Heading>
                      </Cell>
                      <Cell>
                        <FormField label="Favorite color">
                          <Box gap="SP2" verticalAlign="middle">
                            <Box width="100%" direction="vertical">
                              <Dropdown
                                placeholder="Choose color"
                                dataHook="favorite-color-dropdown"
                                options={dropdown}
                                selectedId={favoriteColorOption?.id}
                                onSelect={(option) =>
                                  setFavoriteColorOption(option)
                                }
                              />
                            </Box>
                            <IconButton
                              disabled
                              priority="secondary"
                              size="small"
                            >
                              <DeleteSmall />
                            </IconButton>
                          </Box>
                        </FormField>
                      </Cell>
                    </Layout>
                  </Cell>
                  <Cell>
                    <AddItem disabled>Add New List Item</AddItem>
                  </Cell>
                </Layout>
              </Card.Content>
            </Card>
          </Cell>
          <Cell span={4}>
            <Layout>
              <Cell>
                <Card>
                  <Card.Header
                    title="Role details"
                    suffix={
                      <Button disabled priority="secondary">
                        Edit
                      </Button>
                    }
                  />
                  <Card.Divider></Card.Divider>
                  <Card.Content>
                    <Layout>
                      <Cell>
                        <Heading size="tiny">OFFICIAL TITLE</Heading>
                        <Text>Keyboard annihilator</Text>
                      </Cell>
                      <Cell>
                        <Heading size="tiny">EXPERIENCE</Heading>
                        <Text>It’s over nine thousand</Text>
                      </Cell>
                    </Layout>
                  </Card.Content>
                </Card>
              </Cell>
              {!!data && (
                <Cell>
                  <Card>
                    <Card.Header title="Saved data" />
                    <Card.Divider></Card.Divider>
                    <Card.Content>
                      <Layout>
                        <Cell>
                          <Heading size="tiny">FIRST NAME</Heading>
                          <Text dataHook="first-name-text">
                            {data.first_name}
                          </Text>
                        </Cell>
                        <Cell>
                          <Heading size="tiny">LAST NAME</Heading>
                          <Text dataHook="last-name-text">
                            {data.last_name}
                          </Text>
                        </Cell>
                        {!!data.favorite_color && (
                          <Cell>
                            <Heading size="tiny">FAVORITE COLOR</Heading>
                            <Text dataHook="favorite-color-text">
                              {data.favorite_color}
                            </Text>
                          </Cell>
                        )}
                      </Layout>
                    </Card.Content>
                  </Card>
                </Cell>
              )}
            </Layout>
          </Cell>
        </Layout>
      </Page.Content>
    </Page>
  );
};

export default App;
