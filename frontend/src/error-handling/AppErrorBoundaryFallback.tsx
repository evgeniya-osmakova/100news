import { Container } from '@/styles/base';
import resetApp from '@/utils/reset-app';
import { styled } from '@stitches/react';
import Button from '@/components/Button';

const Wrapper = styled(Container, {
  margin: "auto",
  height: "100vh",
});

function AppErrorBoundaryFallback() {
  return (
    <Wrapper
      direction="vertical"
      align="center"
    >
      <h2>
        Something went wrong. You can:
      </h2>

      <a
        target="_blank"
        rel="noreferrer"
        href="mailto: evgeniya.osmakova@gmail.com"
      >
        {`contact with author by this email - evgeniya.osmakova@gmail.com`}
      </a>

      <h6>or</h6>

      <Button
        text="Press here to reload the page"
        onClick={resetApp}
      />
    </Wrapper>
  );
}

export default AppErrorBoundaryFallback;
