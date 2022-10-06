/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { useQuery } from "react-query";
import pluginId from '../../pluginId';
import { isEmpty } from "lodash";
import getTrad from "../../utils/getTrad";
import { useIntl } from 'react-intl';

import StatusIcon from "../../components/status-icon";
import TableHead from "../../components/TableHead"
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
  const [{ query }, setQuery] = useQueryParams();
  const sort = query?.sort || '';
  const { formatMessage, formatDate } = useIntl();
  const headers = [
    {
      name: 'permission',
      metadatas: { sortable: true, label: formatMessage({ id: getTrad('page.homePage.table.header.permission') }) }
    },
    {
      name: 'role',
      metadatas: { sortable: true, label: formatMessage({ id: getTrad('page.homePage.table.header.role') }) }
    },
    {
      name: 'status',
      metadatas: { sortable: true, label: formatMessage({ id: getTrad('page.homePage.table.header.status') }) }
    },
  ]
  const COL_COUNT = headers.length;
  const [{ query: queryParams }] = useQueryParams();
  const { data, status } = useQuery(["get-configured-route", queryParams], () => apiRoutesPermission.getConfiguredRoutes(queryParams));
  const isLoading = status !== 'success';
  if (isLoading) return <LoadingIndicatorPage />;
  return (
    <Box background="neutral100">
      <Layout>
        <>
          <HeaderLayout
            title={formatMessage({ id: getTrad('plugin.name') })}
            subtitle={`${data.data.meta.total} ${formatMessage({
              id: getTrad(
                "page.homePage.header.count"
              )
            })}`}
            as="h2"
          />
        </> 
        <ContentLayout>
          <Table colCount={COL_COUNT} rowCount={10}>
            <TableHead headers={headers} />
            <Tbody>
              {data.data.result.map((row, index) =>
                <Tr key={index}>
                  <Td>
                    <Typography textColor="neutral800">{row.permission}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{row.role}</Typography>
                  </Td>
                  <Td>
                    <StatusIcon
                      status={row.status}
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
