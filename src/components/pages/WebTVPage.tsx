import React from 'react';
import WebTVLayout from '@/components/WebTVLayout';
import { ActivePage } from '@/types';

interface WebTVPageProps {
  setActivePage?: (page: ActivePage) => void;
}

const WebTVPage = ({ setActivePage }: WebTVPageProps) => {
  return (
    <WebTVLayout setActivePage={setActivePage} />
  );
};

export default WebTVPage;

