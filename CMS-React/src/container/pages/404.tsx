import { useState, useEffect, FC } from 'react';
import { Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import { Main } from 'container/Style';
import { Heading } from 'components/heading/Heading';
import { Button } from 'components/buttons/Buttons';
import { ErrorWrapper } from './Style';

interface INotFound {}

const NotFound: FC<INotFound> = () => {
  const [state, setState] = useState({
    isLoading: true,
  });

  useEffect(() => {
    setTimeout(() => {
      setState({ isLoading: false });
    }, 1500);
  }, []);

  return (
    <Main>
      {state.isLoading ? (
        <div className="spin">
          <Spin />
        </div>
      ) : (
        <ErrorWrapper>
          <img src={require(`../../static/img/pages/404.svg`).default} alt="404" />
          <Heading className="error-text" as="h3">
            404
          </Heading>
          <p>Sorry! the page you are looking for does not exist.</p>
          <NavLink to="/admin">
            <Button size="middle" mergetype="primary" to="/admin">
              Return Home
            </Button>
          </NavLink>
        </ErrorWrapper>
      )}
    </Main>
  );
};

export default NotFound;
