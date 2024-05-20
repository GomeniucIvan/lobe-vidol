import { DancePanel, MarketPanel } from '@/panels';
import { useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';
import {useTranslation} from "react-i18next";

export default () => {
  const [panel] = useConfigStore((s) => [s.panel]);
  const { t } = useTranslation('navigation');

  const apps = [
    {
      component: <DancePanel />,
      key: 'dance',
      label: t('dance'),
    },
    {
      component: <MarketPanel />,
      key: 'market',
      label: t('market'),
    },
  ];

  return (
    <>
      {apps.map((app) => {
        const open = panel[app.key as PanelKey].open;
        const component = app.component;
        return (
          <div key={app.key} style={{ display: open ? 'flex' : 'none' }}>
            {component}
          </div>
        );
      })}
    </>
  );
};
