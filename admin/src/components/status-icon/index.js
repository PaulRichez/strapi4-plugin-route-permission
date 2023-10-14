import React, { memo, useState, useEffect } from 'react';

import { useIntl } from 'react-intl';
import getTrad from "../../utils/getTrad";

import { Tooltip } from '@strapi/design-system/Tooltip';
import { Icon } from '@strapi/design-system/Icon';

import Check from '@strapi/icons/Check';
import Cross from '@strapi/icons/Cross';
import EmotionUnhappy from '@strapi/icons/EmotionUnhappy';
const StatusIcon = ({ status }) => {
    const { formatMessage } = useIntl();
    if (status == 1) return (
        <Tooltip description={formatMessage({ id: getTrad('status-icon.tooltip.status.1'), defaultMessage: "Permission enabled" })}>
            <Icon width={`${25 / 16}rem`} height={`${25 / 16}rem`} color="success500" as={Check} />
        </Tooltip>
    )
    if (status == 2) return (
        <Tooltip description={formatMessage({ id: getTrad('status-icon.tooltip.status.2'), defaultMessage: "Permission disabled from admin panel" })}>
            <Icon width={`${25 / 16}rem`} height={`${25 / 16}rem`} color="danger500" as={Cross} />
        </Tooltip>
    )
    return (
        <Tooltip description={formatMessage({ id: getTrad('status-icon.tooltip.status.3'), defaultMessage: "Role doen't exists" })}>
            <Icon width={`${25 / 16}rem`} height={`${25 / 16}rem`} color="warning500" as={EmotionUnhappy} />
        </Tooltip>
    )
}

export default StatusIcon