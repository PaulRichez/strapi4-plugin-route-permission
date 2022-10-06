import React from 'react';
import { IconButton } from '@strapi/design-system/IconButton';
import { Tooltip } from '@strapi/design-system/Tooltip';
import { Typography } from '@strapi/design-system/Typography';
import { Th, Thead, Tr } from '@strapi/design-system/Table';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import SortIcon from '../SortIcon';
import { useQueryParams } from "@strapi/helper-plugin";

const TableHead = ({
  headers,
}) => {
  const { formatMessage } = useIntl();
  const [{ query }, setQuery] = useQueryParams();
  const sort = query?.sort || '';
  const [sortBy, sortOrder] = sort.split(':');
  return (
    <Thead>
      <Tr>
        {headers.map(({ name, metadatas: { sortable: isSortable, label } }) => {
          const isSorted = sortBy === name;
          const isUp = sortOrder === 'ASC';

          const sortLabel = formatMessage(
            { id: 'components.TableHeader.sort', defaultMessage: 'Sort on {label}' },
            { label }
          );

          const handleClickSort = (shouldAllowClick = true) => {
            if (isSortable && shouldAllowClick) {
              const nextSortOrder = isSorted && sortOrder === 'ASC' ? 'DESC' : 'ASC';
              const nextSort = `${name}:${nextSortOrder}`;

              setQuery({
                sort: nextSort,
              });
            }
          };

          return (
            <Th
              key={name}
              action={
                isSorted && (
                  <IconButton
                    label={sortLabel}
                    onClick={handleClickSort}
                    icon={isSorted && <SortIcon isUp={isUp} />}
                    noBorder
                  />
                )
              }
            >
              <Tooltip label={isSortable ? sortLabel : label}>
                <Typography
                  textColor="neutral600"
                  as={!isSorted && isSortable ? 'button' : 'span'}
                  label={label}
                  onClick={() => handleClickSort(!isSorted)}
                  variant="sigma"
                >
                  {label}
                </Typography>
              </Tooltip>
            </Th>
          );
        })}
      </Tr>
    </Thead>
  );
};

TableHead.defaultProps = {
  headers: [],
};

TableHead.propTypes = {
  headers: PropTypes.array,
};

export default TableHead;
