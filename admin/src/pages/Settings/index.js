// admin/src/pages/Settings/index.js
import React, { useEffect, useState } from 'react';

import { apiRoutesPermission } from "../../utils/api";

import getTrad from "../../utils/getTrad";
import { useIntl } from 'react-intl';

import { useNotification } from '@strapi/helper-plugin';

import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { HeaderLayout } from '@strapi/design-system/Layout';
import { ContentLayout } from '@strapi/design-system/Layout';
import { Typography } from '@strapi/design-system/Typography';
import { ToggleInput } from '@strapi/design-system/ToggleInput';
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { Refresh } from "@strapi/icons";

const Settings = () => {
    const { formatMessage, formatDate } = useIntl();
    const [restoreConfigmationVisible, setRestoreConfigmationVisible] =
        useState(false);
    const toggleNotification = useNotification();
    const handleRestoreConfiguration = async () => {
        const res = await apiRoutesPermission.deleteConfiguratedRoutesHistory();
        setRestoreConfigmationVisible(false);
        toggleNotification({
            type: 'success',
            message: formatMessage({ id: getTrad('settings.deletedHistory') })
        });
    };
    const handleRestoreCancel = () => setRestoreConfigmationVisible(false);
    const handleRestoreConfirmation = () => setRestoreConfigmationVisible(true);

    const boxDefaultProps = {
        background: "neutral0",
        hasRadius: true,
        shadow: "filterShadow",
        padding: 6,
    };
    return (
        <>
            <HeaderLayout
                id="title"
                title={formatMessage({ id: getTrad('page.settings.title') })}
                subtitle=""
            ></HeaderLayout>
            <ContentLayout>

                <Box {...boxDefaultProps}>
                    <Stack size={4}>
                        <Stack size={2}>
                            <Typography variant="delta" as="h2">
                                {formatMessage({ id: getTrad("page.settings.section.restore") })}
                            </Typography>
                            <Typography variant="pi" as="h4">
                                {formatMessage({ id: getTrad("page.settings.section.restore.subtitle") })}
                            </Typography>
                        </Stack>
                        <Grid gap={4}>
                            <GridItem col={6}>
                                <Button
                                    variant="danger-light"
                                    startIcon={<Refresh />}
                                    onClick={handleRestoreConfirmation}
                                >
                                    {formatMessage({ id: getTrad("page.settings.actions.restore") })}
                                </Button>

                                <ConfirmationDialog
                                    isVisible={restoreConfigmationVisible}
                                    header={formatMessage({
                                        id: getTrad(
                                            "page.settings.actions.restore.confirmation.header"
                                        )
                                    })}
                                    labelConfirm={formatMessage({
                                        id: getTrad(
                                            "page.settings.actions.restore.confirmation.button.confirm"
                                        )
                                    })}
                                    iconConfirm={<Refresh />}
                                    onConfirm={handleRestoreConfiguration}
                                    onCancel={handleRestoreCancel}
                                >
                                    {formatMessage({
                                        id: getTrad(
                                            "page.settings.actions.restore.confirmation.description"
                                        )
                                    })}
                                </ConfirmationDialog>
                            </GridItem>
                        </Grid>
                    </Stack>
                </Box>
            </ContentLayout>
        </>
    );
};

export default Settings;