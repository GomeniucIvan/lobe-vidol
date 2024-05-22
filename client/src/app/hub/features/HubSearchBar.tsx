'use client';

import { SearchBar } from '@lobehub/ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import useControlledState from 'use-merge-value';

import { useMarketStore } from '@/store/market';

interface AgentSearchBarProps {
  mobile?: boolean;
}

const HubSearchBar = memo<AgentSearchBarProps>(({ mobile }) => {
  const { t } = useTranslation('hub');
  const [searchKeywords, setSearchKeywords] = useMarketStore((s) => [
    '',
    '',
  ]);

  const [keyword, setKeyword] = useControlledState(searchKeywords, {
    // onChange: setSearchKeywords,
    // value: searchKeywords,
  });

  return (
    <SearchBar
      allowClear
      enableShortKey={!mobile}
      onChange={(e) => {
        setKeyword(e.target.value);
      }}
      placeholder={t('search.placeholder')}
      shortKey={'k'}
      spotlight={!mobile}
      type={mobile ? 'block' : 'ghost'}
      value={keyword}
    />
  );
});

export default HubSearchBar;
