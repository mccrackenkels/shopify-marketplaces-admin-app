import React from 'react';
import {
  FeatureListCard,
  OverviewPage,
  ProductStatusSection,
} from '@shopify/channels-ui';
import {useAppBridge} from '@shopify/app-bridge-react';
import {AppLink, ChannelMenu} from '@shopify/app-bridge/actions';

const Overview = ({
  domain,
  availableProductCount,
  publicationId,
  appHandle,
}) => {
  const app = useAppBridge();
  const overviewLink = AppLink.create(app, {
    label: 'Overview',
    destination: '/',
  });
  const settingsLink = AppLink.create(app, {
    label: 'Settings',
    destination: '/settings',
  });
  ChannelMenu.create(app, {
    items: [overviewLink, settingsLink],
    active: overviewLink,
  });

  return (
    <OverviewPage title="Limitless channel overview">
      <OverviewPage.Section title="Product status on Limitless">
        <ProductStatusSection
          manageAction={{
            content: 'Manage availability',
            external: true,
            url: `https://${domain}/admin/bulk?resource_name=Product&edit=publications.${publicationId}.published_at`,
          }}
          summary={`${availableProductCount} products available to Limitless`}
          productStatuses={[
            {
              badge: {
                children: 'Published',
                status: 'success',
              },
              label: {
                content: `${availableProductCount} products`,
                external: true,
                url: `https://${domain}/admin/products?selectedView=all&published_status=${appHandle}%3Avisible`,
              },
            },
          ]}
        />
      </OverviewPage.Section>
      <OverviewPage.Section title="Manage your Limitless features">
        <FeatureListCard
          features={[
            {
              title: 'Limitless Marketplace',
              description:
                'Customers can discover your brand and purchase products directly on the Limitless Marketplace.',
              badge: {children: 'Active', status: 'success'},
            },
          ]}
        />
      </OverviewPage.Section>
    </OverviewPage>
  );
};

export default Overview;
