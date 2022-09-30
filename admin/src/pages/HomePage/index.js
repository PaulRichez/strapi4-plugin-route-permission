/*
 *
 * HomePage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

import getTrad from "../../utils/getTrad";

import { useIntl } from 'react-intl';
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
const HomePage = () => {
  const { formatMessage, formatDate } = useIntl();
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
      </Layout>
    </Box>
  );
};

export default HomePage;
