/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { isEmpty } from "lodash";
import getTrad from "../../utils/getTrad";

import { useIntl } from 'react-intl';

import StatusIcon from "../../components/status-icon";
import { Box } from "@strapi/design-system/Box";
import {
  Layout,
  HeaderLayout,
  ActionLayout,
  ContentLayout,
} from "@strapi/design-system/Layout";
import {
  EmptyStateLayout,
  SearchURLQuery,
  LoadingIndicatorPage,
  useTracking,
  useNotification,
  useRBAC,
  useFocusWhenNavigate,
  useQueryParams,
} from "@strapi/helper-plugin";
import { Table, Thead, Tbody, Tr, Th, Td } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { apiRoutesPermission } from "../../utils/api";

const HomePage = () => {
  const { formatMessage, formatDate } = useIntl();
  const COL_COUNT = 3;
  const [routesConfigured, setRoutesConfigured] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    apiRoutesPermission.getConfiguredRoutes().then(res => {
      setRoutesConfigured(res.data);
      setIsLoading(false);
    });
  }, [setRoutesConfigured]);

  if (isLoading) return <LoadingIndicatorPage />;
  return (
    <Box background="neutral100">
      <Layout>
        <>
          <HeaderLayout
            title={formatMessage({ id: getTrad('plugin.name') })}
            subtitle={``}
            as="h2"
          />
        </>
        <ContentLayout>
          <Table colCount={COL_COUNT} rowCount={10}>
            <Thead>
              <Tr>
                <Th>
                  <Typography variant="sigma">
                    {formatMessage({ id: getTrad('page.homePage.table.header.permission') })}
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    {formatMessage({ id: getTrad('page.homePage.table.header.role') })}
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    {formatMessage({ id: getTrad('page.homePage.table.header.status') })}
                  </Typography>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {routesConfigured?.result.map((data, index) =>
                <Tr key={index}>
                  <Td>
                    <Typography textColor="neutral800">{data.permission}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{data.role}</Typography>
                  </Td>
                  <Td>
                    <StatusIcon
                      status={data.status}
                    />
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </ContentLayout>
      </Layout>
    </Box>
  );
};

export default HomePage;
