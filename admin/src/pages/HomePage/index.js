/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { useQuery } from "react-query";

import getTrad from "../../utils/getTrad";
import { useIntl } from 'react-intl';

import { apiRoutesPermission } from "../../utils/api";

import StatusIcon from "../../components/status-icon";
import TableHead from "../../components/TableHead"
import TablePagination from "../../components/TablePagination"

import { Box } from "@strapi/design-system/Box";
import {
  Layout,
  HeaderLayout,
  ContentLayout,
} from "@strapi/design-system/Layout";
import {
  LoadingIndicatorPage,
  useQueryParams,
} from "@strapi/helper-plugin";
import { Table, Tbody, Tr, Td } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";

const HomePage = () => {
  const [{ query: queryParams }, setQuery] = useQueryParams();
  const { formatMessage, formatDate } = useIntl();
  const headers = [
    {
      name: 'permission',
      metadatas: { sortable: true, label: formatMessage({ id: getTrad('page.homePage.table.header.permission'), defaultMessage: "Permission" }) }
    },
    {
      name: 'role',
      metadatas: { sortable: true, label: formatMessage({ id: getTrad('page.homePage.table.header.role'), defaultMessage: "Role" }) }
    },
    {
      name: 'status',
      metadatas: { sortable: true, label: formatMessage({ id: getTrad('page.homePage.table.header.status'), defaultMessage: "Status" }) }
    },
  ]
  const COL_COUNT = headers.length;
  if (!queryParams) {
    setQuery({
      sort: 'permission:ASC',
      pageSize: 10,
      page: 1
    });
  }
  const { data, status } = useQuery(["get-configured-route", queryParams], () => apiRoutesPermission.getConfiguredRoutes(queryParams));
  const isLoading = status !== 'success';
  if (isLoading) return <LoadingIndicatorPage />;
  return (
    <Box background="neutral100">
      <Layout>
        <>
          <HeaderLayout
            title={formatMessage({ id: getTrad('plugin.name'), defaultMessage: 'Routes Permission' })}
            subtitle={`${data.data.pagination.total} ${formatMessage({
              id: getTrad(
                "page.homePage.header.count"
              ),
              defaultMessage: "configured routes"
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
          <TablePagination
            pagination={{ pageCount: data.data.pagination.pageCount || 1 }}
          />
        </ContentLayout>
      </Layout>
    </Box>
  );
};

export default HomePage;
