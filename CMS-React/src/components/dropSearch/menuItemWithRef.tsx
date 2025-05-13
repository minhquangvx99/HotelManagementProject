import React, { forwardRef } from 'react';
import { Menu } from 'antd';

const WrapperMenuItem = forwardRef<HTMLDivElement, any>(({ children, ...props }, ref) => (
  <div ref={ref}>
    <Menu.Item {...props}>{children}</Menu.Item>
  </div>
));

export default WrapperMenuItem;
