import UilBook from '@iconscout/react-unicons/dist/icons/uil-book';
import UilDownloadAlt from '@iconscout/react-unicons/dist/icons/uil-download-alt';
import UilFile from '@iconscout/react-unicons/dist/icons/uil-file';
import UilFileAlt from '@iconscout/react-unicons/dist/icons/uil-file-alt';
import UilTimes from '@iconscout/react-unicons/dist/icons/uil-times';
import UilPrint from '@iconscout/react-unicons/dist/icons/uil-print';
import { NavLink } from 'react-router-dom';
import { FC } from 'react';
import { Popover } from 'components/popup/Popup';
import { Button } from '../Buttons';

interface IExportButtonPageHeader {}

export const ExportButtonPageHeader: FC<IExportButtonPageHeader> = () => {
  const content = (
    <>
      <NavLink to="#">
        <UilPrint />
        <span>Printer</span>
      </NavLink>
      <NavLink to="#">
        <UilBook />
        <span>PDF</span>
      </NavLink>
      <NavLink to="#">
        <UilFileAlt />
        <span>Google Sheets</span>
      </NavLink>
      <NavLink to="#">
        <UilTimes />
        <span>Excel (XLSX)</span>
      </NavLink>
      <NavLink to="#">
        <UilFile />
        <span>CSV</span>
      </NavLink>
    </>
  );
  return (
    <Popover placement="bottomLeft" content={content} trigger="hover">
      <Button size="small" className="ant-btn-white" mergetype="white" style={{ backgroundColor: 'inherit' }}>
        <UilDownloadAlt />
        Export
      </Button>
    </Popover>
  );
};
